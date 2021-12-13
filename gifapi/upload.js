const fs = require('fs');
const AWS = require('aws-sdk');
const bucket = "ictarchitectuur"
const clean = require('./cleanDirectory.js')

const s3 = new AWS.S3();
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
