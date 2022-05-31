import type { S3Event, Handler } from 'aws-lambda'

export const handler: Handler<S3Event> = async (ev, ctx) => {
  const { env } = process

  const records = ev.Records

  const stuff = {
    ev,
    ctx,
    env,
    records,
  }

  return stuff
}

export default handler
