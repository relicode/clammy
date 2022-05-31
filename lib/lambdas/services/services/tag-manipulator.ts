import S3, {
  GetObjectTaggingCommand,
  PutObjectTaggingCommand,
  S3Client,
  Tagging
} from '@aws-sdk/client-s3'

const s3 = new S3Client({})
const clamScanStatusTagKey = 'ClamScanStatus' as const

export type ClamScanStatus = 'CLEAN' | 'INFECTED'

type Bucket = NonNullable<S3.GetObjectCommandInput['Bucket']>
type Key = NonNullable<S3.GetObjectCommandInput['Key']>
type ItemParams = [arg_0: Bucket, arg_1: Key]
type ItemParamsWTag = [...ItemParams, NonNullable<Tagging['TagSet']>]
type ClamScanStatusTag = S3.Tag & {
  Key: typeof clamScanStatusTagKey
  Value: ClamScanStatus
}

const paramsToObject = (...[Bucket, Key]: ItemParams) => ({ Bucket, Key })
const getTags = (...[key, bucket]: ItemParams) => s3.send(new GetObjectTaggingCommand(paramsToObject(key, bucket)))
const setTags = (...[key, bucket, tagSet]: ItemParamsWTag) => s3.send(new PutObjectTaggingCommand({
  ...paramsToObject(key, bucket),
  Tagging: { TagSet: tagSet },
}))

export const getClamScanStatus = async (...[bucket, key]: ItemParams) => {
  const tagSet = (await getTags(bucket, key)).TagSet
  const tag = tagSet?.find((t) => t.Key === clamScanStatusTagKey)
  return tag ? (tag as ClamScanStatusTag).Value : undefined
}

export const setClamScanStatus = (...[key, bucket, status]: [...ItemParams, ClamScanStatus]) => setTags(
  key,
  bucket, [{
    Key: clamScanStatusTagKey,
    Value: status,
  }]
)

export default function initialize (bucket: Bucket) {
  return {
    getClamScanStatus: (key: Key) => getClamScanStatus(bucket, key),
    setClamScanStatus: (key: Key, status: ClamScanStatus) => setClamScanStatus(bucket, key, status),
  }
}

/*
;(async () => {
  const tagger = initialize('anssin-valiaikainen-temppibucketti-delme-please')
  const statusBefore = await tagger.getClamScanStatus('nethack.man')
  await tagger.setClamScanStatus('nethack.man', statusBefore === 'CLEAN' ? 'INFECTED' : 'CLEAN')
  const statusAfter = await tagger.getClamScanStatus('nethack.man')
  console.log({
    statusBefore,
    statusAfter,
  })
})()
*/
