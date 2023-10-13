import {
  CfnOutput,
  Duration,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    const challengeId = "arin";
    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      `${id}cloudfront-OAI`,
      {
        comment: `OriginAccessIdentity for api-dash`,
      }
    );

    // Content bucket
    const siteBucket = new s3.Bucket(this, `${id}DashBucket`, {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // Grant access to cloudfront
    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );
    new CfnOutput(this, "Bucket", { value: siteBucket.bucketName });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, `${challengeId}DashDistribution`, {
      defaultRootObject: "index.html",
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(siteBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
      },
    });

    new CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });

    new CfnOutput(this, "DistributionDomain", {
      value: distribution.distributionDomainName,
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, `${challengeId}DeployWithInvalidation`, {
      sources: [s3deploy.Source.asset("../app/build")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }

}
