const AWS = require('aws-sdk');
const bucket = "ictarchitectuur"

const s3 = new AWS.S3();

exports.downloadGifs = async (sub) => {
    const urlArray = {};
    const listParams = {
        Bucket: bucket,
        Prefix: `gifs/${sub}/`
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    for (const {Key} of listedObjects.Contents) {
        urlArray[Key.split('/')[2]] = await s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: Key,
            Expires: 3000
        });
    }
    return urlArray;
}