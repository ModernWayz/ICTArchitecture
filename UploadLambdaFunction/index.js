console.log('Loading function');

const aws = require('aws-sdk');
const mysql = require('mysql');
const convertapi = require('convertapi')('n2QH0QA4agOZTghF');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });
//4 lines of code to get one datetime, yes
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + ' ' + time;

const request = require('request')

//obfuscate "sensitive" data
const con = mysql.createConnection({
    host: "rdsgif.cdaqwx2yziup.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "bighentaiboobz",
    multipleStatements: true
});
const getGif = (result, bucket , sub) => {
    return new Promise(function (resolve, reject) {
        request({
            uri: result.files[0].url,
            encoding: null
        }, async function (error, response, body) {
            console.log("storing gif in bucket")
            if (error) {
                console.log(error)
                reject(error)
            } else {
                s3.putObject({
                    Body: body,
                    Key: `gifs/${sub}/${result.files[0].fileName}`,
                    Bucket: bucket
                }, function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data)
                    }
                })
            }

        })
    })
}

const storeMetaData = (result, sub) => {
    return new Promise(function(resolve, reject) {
        con.connect(function(err) {
            if (err) throw err;
            con.query(`use gif_dev; INSERT INTO GifApi (TIMEDATE, SUB, fileName) VALUES ("${dateTime}", "${sub}", "${result.files[0].fileName}");`,
                function (err, result, fields) {
                    con.destroy();
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }

            });
        });
    })
}



exports.handler = async(event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const urlArray = [];
    const bucket = "ictarchitectuur"
    //const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const sub = event.detail.sub
    const listParams = {
        Bucket: bucket,
        Prefix: sub
    };
    //list objects in bucket/sub/directory
    const listedObjects = await s3.listObjectsV2(listParams).promise();
    //get presigned urls for all images to convert
    if (listedObjects.Contents.length !== 0 ) {
        console.log("getting images from bucket")
        for (const {Key} of listedObjects.Contents) {
            const url = await s3.getSignedUrl('getObject', {
                Bucket: bucket,
                Key: Key,
                Expires: 86400,
            })
            urlArray.push(url)
        } //convert PNGS to GIF
        try {
            console.log("converting images to gif")
            const result = await convertapi.convert('gif', {
                Files: urlArray,
            }, 'png');
            console.log("downloading gif")

            //get gif and download from the url
            const res = await getGif(result, bucket, sub)
             await storeMetaData(result, sub)
            console.log(res)
            console.log("done uploading")
        }
        catch (err) {
            console.log(err)
        }
    }
    else console.log("listedObjects of directory was 0")
};