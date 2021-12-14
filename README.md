#README

GifApi contains the main backend code - npm start to open endpoints for calls via postman.

UploadLambdaFunction contains the lambda function for uploading and converting to gifs - this is live on lambda.

CleanUpLambdaFunction contains the lambda function for cleaning up RDS records and gifs in s3 older than 24 hours.


to get credentials make a directory .aws in C:/User/ in this directory create a credentials.txt 
and fill this with the lab aws CLI.