# Serverless web bot

Serverless web bot template for using selenium on AWS Lambda

### Test locally
You will need to use [aws-sam-cli](https://aws.amazon.com/serverless/sam/)

Test the function run locally using: 
```
sam build
sam local invoke
```

### Deploy to AWS
Deploy to aws using:
```
sam build
sam deploy --guided
```
Follow the prompts. It will ask you if it can create an ECR repository for the functions, select `Y`.
It will generate a new `samconfig.toml` file for you. You should commit this file to Git for future automated deployments

The deployment actions will deploy this repo to your aws account using aws-sam-cli

#### Automated deployment

There is a Github action setup to test and deploy the application. 
For Github to deploy this application to your AWS account it needs credentials with the necessary IAM role. 
The following are Github Secrets you should define for this repository:
```
`AWS_ACCESS_KEY_ID` : IAM access key ID.

`AWS_SECRET_ACCESS_KEY` : IAM access key

`AWS_REGION` : Deployment region
```
The IAM user should have the following policies defined:
```
IAMFullAccess
AmazonEC2ContainerRegistryFullAccess
AmazonS3FullAccess
AmazonAPIGatewayAdministrator
AWSCloudFormationFullAccess
AWSLambda_FullAccess
```

### Development

Install dependencies
```
npm ci
```

running tests
```
npm test
```
