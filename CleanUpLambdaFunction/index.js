const mysql = require('mysql');
const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const con = mysql.createConnection({
    host: "rdsgif.cdaqwx2yziup.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "bighentaiboobz",
    multipleStatements: true
});

exports.handler = async(event, context) => {
        const deleteParams = {
            Bucket: 'ictarchitectuur',
            Delete: { Objects: [] }
        };

        await con.connect(function(err) {
        if (err) throw err;
         con.query(`use gif_dev;
                   select  CONCAT("gifs/", SUB,"/", fileName) as gifPath from GifApi
                   where hour(timediff( CURRENT_TIMESTAMP, timedate )) > 24;
                   SET SQL_SAFE_UPDATES = 0;
                   delete from GifApi
                   where hour(timediff( CURRENT_TIMESTAMP, timedate )) > 24;
                   SET SQL_SAFE_UPDATES = 1;`,
            async function (err, result) {
                con.destroy()
                if (err) throw err;
                if (result[1].length !== 0 ) {
                    result[1].forEach(({gifPath}) => {
                    let Key = gifPath
                    deleteParams.Delete.Objects.push({Key});
                });
                    const res = await s3.deleteObjects(deleteParams).promise();
                    console.log(res)
                }
                else {
                    console.log('no files to be cleaned')
                }
         });
    });
}
    