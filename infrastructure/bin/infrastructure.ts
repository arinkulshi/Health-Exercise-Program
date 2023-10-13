#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();
new InfrastructureStack(app, 'arinDashboardInfrastructureStack', {
  env: { account: app.node.tryGetContext('accountId'), region: 'us-east-1' },
});
app.synth();