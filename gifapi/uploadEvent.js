const AWS = require('aws-sdk');
const EventBridge = new AWS.EventBridge({region: 'us-east-1' })

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