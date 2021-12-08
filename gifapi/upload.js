const fs = require('fs');
const AWS = require('aws-sdk');
const bucket = "ictarchitectuur"
const clean = require('./cleanDirectory.js')

const s3 = new AWS.S3({
    accessKeyId: "ASIAVRXZQG5ZOPQBJWID",
    secretAccessKey: "lw+pqbGauTTOHpYfbdGfu8L1PhFXM5fOSpcqttSW",
    sessionToken: "FwoGZXIvYXdzEPP//////////wEaDEGwAwtT5T6dGy5ZFyLNARpuyVl7UfhznjgJz0nj/4HBvxlA/0a+TGNeX3kx2caLhiTjE9/MKejTH6A2ETqd+eEcQgal6Cg3j4rMy1CN0KQnGRnyUnqCbrT4VWOr9Mq4Zcea1g3THcExANy0JepPh5o/YRVe0SCDLLB9MlhFGCIZ9f1o4mIBbcdE0rXqYWXNulpiL0NMnnOPNDfuevYqgPleulVmi+CZjxW7mqR8F8DcRF7KWb/xh8KxFPvjk77wv2M6QcuVfTyy9aCpYKpl9chVLs6Nx5/Z4/7f6DIogvnBjQYyLR8GRRCjoqks4J/s0eONLBkqEJYxlKI61vTEunh6QtrfGXGTb1exDADTdmX8VA==",
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
