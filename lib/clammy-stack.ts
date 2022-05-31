import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';

export class ClammyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myLambda = new lambda.Function(this, 'myLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'my-lambda.handler',
      code: lambda.Code.fromAsset(join(__dirname, 'lambdas')),
    })

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ClammyQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}