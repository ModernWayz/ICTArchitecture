const fs = require('fs');
const AWS = require('aws-sdk');
const bucket = "ictarchitectuur"
const clean = require('./cleanDirectory.js')

const s3 = new AWS.S3({
    accessKeyId: "ASIAVRXZQG5ZBHUC3MEH",
    secretAccessKey: "2VwLS8uR4NeyQEV2M+Okvv0nmoKaS7YXhqQpGMs2",
    sessionToken: "FwoGZXIvYXdzEMb//////////wEaDM/gkAZ59pumU5L2TSLNAYGag3Cllby09j50nVPeC5h/5VyLT7OGNgyrsbA9rSgSHjyHt0nog9xdxwFSdgc/1kgxXSBpHSQf9DB05DTiQZMY2vEoLlVLZV6A6HTO0r1e2ixQJphUg3kV/kfIXsyfbKdiglZH498pzFL1bBlG54eQNlgdXWuAc8aKxfUFE1lkS+GIJwGWF4WfofFRvyEIWetD028Q8BYJizjT0rh7pMJfQyCtubmuL3HUGVOiXekNhLdgoivG4SY8F55ITdtHrgxAWNfXCFQQKRC7DdYo7Y64jQYyLW6XrqbvSnq6ycGuDM158QP4cN8LXSYr3lFcpWR59xNjKl4XJav1PMJaGvOSFA=="});
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
