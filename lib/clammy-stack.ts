import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { join } from 'path'

const { NODEJS_16_X } = cdk.aws_lambda.Runtime

export class ClammyStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs.NodejsFunctionProps.html
    // eslint-disable-next-line no-unused-vars
    const s3Handler = new NodejsFunction(this, 's3Handler', {
      memorySize: 128 * 8,
      timeout: cdk.Duration.seconds(30),
      runtime: NODEJS_16_X,
      entry: join(__dirname, 'lambdas', 's3-scanner.ts'),
      bundling: {
        dockerImage: cdk.DockerImage.fromBuild(join(__dirname, '..')),
      },
    })
  }
}
