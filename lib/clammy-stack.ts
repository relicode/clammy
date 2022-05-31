import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';

// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs.NodejsFunctionProps.html
const propsss: NodejsFunctionProps = {
  runtime: Runtime.NODEJS_16_X,
  // entry: join(__dirname, 'lambdas', 'my-lambda.ts'),
  bundling: {
    externalModules: [
      'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
      // 'cool-module', // 'cool-module' is already available in a Layer
    ],
  },
}

const props: NodejsFunctionProps = {
  
    memorySize: 1024,
    timeout: cdk.Duration.seconds(5),
    runtime: Runtime.NODEJS_16_X,
    handler: 'main',
    entry: join(__dirname, 'lambdas', 'my-lambda.ts'),
    // entry: join(__dirname, '/../src/my-lambda/index.ts'),
  
}

// lib/clammy-stack.myNodeLambda.mjs lib/lambdas/my-lambda.ts

export class ClammyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myFunction = new NodejsFunction(this, 'my-function', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: Runtime.NODEJS_16_X,
      // handler: 'main',
      entry: join(__dirname, 'lambdas', 'my-lambda.ts'),
    });

    // const myLambda = new NodejsFunction(this, '/lambdas/my-lambda', props)

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ClammyQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}