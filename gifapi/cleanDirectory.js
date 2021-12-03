async function emptyS3Directory(bucket, sub, s3) {
    const listParams = {
        Bucket: bucket,
        Prefix: `${sub}/`
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: bucket,
        Delete: { Objects: [] }
    };

    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });

    await s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await emptyS3Directory(bucket, sub, s3);
}

module.exports = {
    emptyS3Directory
};