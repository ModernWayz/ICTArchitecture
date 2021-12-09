const fs = require('fs');
const AWS = require('aws-sdk');
const bucket = "ictarchitectuur"
const clean = require('./cleanDirectory.js')

const s3 = new AWS.S3({
    accessKeyId: "ASIAVRXZQG5ZHUZHXWRC",
    secretAccessKey: "yQROE//gEOv7BeTPGsQZJOxQPjEJsWmQFFaCu6Mc",
    sessionToken: "FwoGZXIvYXdzEA8aDJWTohwrRD/NSzl5NyLNAdwlmilHDOKm4qCQB62lhDf70v104p0lGe0BkB7VJpECru3Vl92qEv7OFoDE5uIKvuaR3Fx4pYIPppx6aWPTmNqBZ+pK2gGRK4CXkYzYoeEVw98EQlvTtz5YQ1r5xe4uMHtGDdkpxWg6gF/IIBW2WnAZRUjlRaZdElr0mpUj3aMGGktds5YSdGgPdeFtD2kxOzVqH6jmedKpkX0bsfyfLci7sZ1dcDgvF52u5tqbvS9lBvNyuM7ZPJC/d135ld8wPr8U7Ryt5d/ucrVwKnIopI3IjQYyLekR+sRfQiAqDxqG4PsGuteHVMZtHir61yigk+LNrFo/GNE+J+KpLegFSGihMQ==",
});
// Uploading files to the bucket
exports.uploadFile = async (fileName, key, sub) => {
    // recursive function to empty image directory of user
    await clean.emptyS3Directory(bucket, sub, s3)
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: bucket,
        Key: `${sub}/${key}`, // File name you want to save as in S3
        Body: fileContent
    };

    await s3.upload(params, (err, data) => {
        if (err) {
            throw err;
        }
    });
    // Retrieve presigned url
    return true
};
