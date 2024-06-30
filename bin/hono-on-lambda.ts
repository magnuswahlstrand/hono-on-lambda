#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {HonoOnLambdaStack} from '../lib/hono-on-lambda-stack';

const app = new cdk.App();
new HonoOnLambdaStack(app,
    'HonoOnLambdaStack',
    'dev',
    {
        env: {account: '975049894820', region: 'eu-west-1'},
    }
);