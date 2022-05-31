import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { join } from 'path'

export class ClammyStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs.NodejsFunctionProps.html
    // eslint-disable-next-line no-unused-vars
    const myFunction = new NodejsFunction(this, 'my-function', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: Runtime.NODEJS_16_X,
      // handler: 'main',
      entry: join(__dirname, 'lambdas', 'my-lambda.ts'),
    })

    // const myLambda = new NodejsFunction(this, '/lambdas/my-lambda', props)

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ClammyQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
