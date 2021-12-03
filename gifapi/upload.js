const fs = require('fs');
const AWS = require('aws-sdk');
const bucket = "ictarchitectuur"
const clean = require('./cleanDirectory.js')

const s3 = new AWS.S3({
    accessKeyId: "ASIAVRXZQG5ZNQ6YWUGD",
    secretAccessKey: "KueqzUo+pW9jby0ii5AGyEmKY4DqkfF7WVbQ4USs",
    sessionToken: "FwoGZXIvYXdzEH4aDBG/4E7s645voVnigSLNAcf7nm/6lnYlrPzh7GiOROobGrOxvhic50NvZh5abPKv9Hpe9Im8DNJmSGBRl8JCk3bXhKPdiQPQr58rWoOkwyqzqI4ooPuLd9NMFNKYgm/azBJ5F9bJnGcNqLta68+QLFm4lnj11RdNIvTFrOLeoypgopflOuApbyTuMtD2LeuWTzpNQcx/On6g5eZpgx4ehgKi8Kl9D042Uor1cObMBa3msjQd/x3exSjO5dDFkohXYiFuTM8DVm+voirqNCz4Fb7uDCqQ11+wcZSouTUospeojQYyLbiPFFtN0+CTkK5XlWahFKSDm07tKlOWbCLIAxcJW+7yDDXdIyyveKrhIlCMbA=="});

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
