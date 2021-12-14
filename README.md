#README

GifApi contains the main backend code - npm start to open endpoints for calls via postman.

UploadLambdaFunction contains the lambda function for uploading and converting to gifs - this is live on lambda.

CleanUpLambdaFunction contains the lambda function for cleaning up RDS records and gifs in s3 older than 24 hours.
