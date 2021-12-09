const AWS = require('aws-sdk');
const EventBridge = new AWS.EventBridge({
    accessKeyId: "ASIAVRXZQG5ZHUZHXWRC",
    secretAccessKey: "yQROE//gEOv7BeTPGsQZJOxQPjEJsWmQFFaCu6Mc",
    sessionToken: "FwoGZXIvYXdzEA8aDJWTohwrRD/NSzl5NyLNAdwlmilHDOKm4qCQB62lhDf70v104p0lGe0BkB7VJpECru3Vl92qEv7OFoDE5uIKvuaR3Fx4pYIPppx6aWPTmNqBZ+pK2gGRK4CXkYzYoeEVw98EQlvTtz5YQ1r5xe4uMHtGDdkpxWg6gF/IIBW2WnAZRUjlRaZdElr0mpUj3aMGGktds5YSdGgPdeFtD2kxOzVqH6jmedKpkX0bsfyfLci7sZ1dcDgvF52u5tqbvS9lBvNyuM7ZPJC/d135ld8wPr8U7Ryt5d/ucrVwKnIopI3IjQYyLekR+sRfQiAqDxqG4PsGuteHVMZtHir61yigk+LNrFo/GNE+J+KpLegFSGihMQ==",
    region: 'us-east-1' })

// When successfully inserting image
exports.EB = (sub) => {
    const params = {
        Entries: [{
            Detail: JSON.stringify({"sub": sub}),
            DetailType: "new_file",
            Source: "web-server",
        }]
    };

    EventBridge.putEvents(params, (err, data) => {
        if (err){
            console.log(err);
        }
        return data
    });
};