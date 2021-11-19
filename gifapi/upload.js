const fs = require('fs');
const AWS = require('aws-sdk');
const EXPIRE_SECONDS_ONE_YEAR = 31556926;

const s3 = new AWS.S3({
    accessKeyId: "ASIAVRXZQG5ZCV2XIWEF",
    secretAccessKey: "cTUI7M20Evt5Blo54jQXSVCTLjqzbtIlgTI6fpk3",
    sessionToken: "FwoGZXIvYXdzECwaDA3foTSdUyAzDEIKJiLNAaWw5XR8HpSa16JbOGeEMmBfZqM0beB6z6vUgsK6hq+l9ugar9Kt4m8WybC1moDRDhbLn0WmBSb/1GXFiIAiP4jZb/rIn1SBeIXWb+7rMUW2m0jJ68bZT2uqZdxgpzLTX3Ho/m1bJwvpxPQwYPXr+yhq8OqieG+VpBEXhqIeQ9rHp6qTLqLJMCUv6wBfZK4xHxcjsJ+DhUp1qLiFlJX0jouaJFAAaB0j5Ktx5ZwmArS8U6CwOsFX/yJvXU0AI2ZS4j+U3/VieP2lcbDcrxco+YLejAYyLZ6373MvuCs6kGDJv15IwhRhVAprotb8NmFzTniS6Y17tmtyyOgex0aMEJWUug=="
});

let url = ""

exports.uploadFile = async (fileName, key) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: "ictarchitectuur",
        Key: key, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    await s3.upload(params, (err, data) => {
        if (err) {
            throw err;
        }
        url = data.Location
    });
    // Retrieve presigned url
    await s3.getSignedUrl('getObject', {
        Bucket: "ictarchitectuur",
        Key: key,
        Expires: EXPIRE_SECONDS_ONE_YEAR
    }, (err, data) =>  {
        if(err) {
            throw err;
        }
        return data;
    })

};
