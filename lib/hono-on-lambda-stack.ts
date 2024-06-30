import * as cdk from 'aws-cdk-lib'
import {Construct} from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

type EnvironentName = 'dev' | 'staging' | 'prod'

export class magnusStack extends cdk.Stack {
    constructor(scope: Construct, id: string, envName: EnvironentName, props?: cdk.StackProps) {
        super(scope, id + '-' + envName, props)
    }
}

export class HonoOnLambdaStack extends magnusStack {
    constructor(scope: Construct, id: string, envName: EnvironentName, props?: cdk.StackProps) {
        super(scope, id, envName, props)

        const fn = new NodejsFunction(this, 'lambda', {
            entry: 'lambda/index.ts',
            handler: 'handler',
            runtime: lambda.Runtime.NODEJS_20_X,
        })
        fn.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
        })
        new apigw.LambdaRestApi(this, 'api', {
            handler: fn,
        })
    }
}