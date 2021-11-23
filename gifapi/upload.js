const fs = require('fs');
const AWS = require('aws-sdk');
const EXPIRE_SECONDS_ONE_YEAR = 31556926;

const s3 = new AWS.S3({
    accessKeyId: "ASIAVRXZQG5ZKGTFWKMH",
    secretAccessKey: "Mc3/DQiD6Wz6OgOIG/TbekPta60GW6Gncik+YlD4",
    sessionToken: "FwoGZXIvYXdzEIv//////////wEaDBboqLinehZyxtY+LCLNATi7POYiGQKxI6azht0acyQGH3eRe9GUejC9sMB2iXBzV/y/D2I5joayuOLWF/d83kQHNq4F75UZJFsudAQl+aj2iFxIytjjmrUDGqrCUdi893r1kUw9Bbu3eztXkYTppny6+t7+B7VEuj9+oaTQrgtnmfe+O7WVeByYSNTuA9u/NlazhTELTavApfcqHILGFSdgGYjN4EbPW+z93p1eldH1c2OcFSS/JxGv4fZ0K+/cw6MfzWdktgDvYd95pkW0fwizX42l7l87LF7N8GUo7PfyjAYyLb0IMFaOA+mke1YHtEwpqiYo1b13ZIO26dNUfZyva91+HTYtA02LhCnxZnVsFA=="
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
        return true;
    })

};
