const AWS = require('aws-sdk');
const EventBridge = new AWS.EventBridge({
    accessKeyId: "ASIAVRXZQG5ZOPQBJWID",
    secretAccessKey: "lw+pqbGauTTOHpYfbdGfu8L1PhFXM5fOSpcqttSW",
    sessionToken: "FwoGZXIvYXdzEPP//////////wEaDEGwAwtT5T6dGy5ZFyLNARpuyVl7UfhznjgJz0nj/4HBvxlA/0a+TGNeX3kx2caLhiTjE9/MKejTH6A2ETqd+eEcQgal6Cg3j4rMy1CN0KQnGRnyUnqCbrT4VWOr9Mq4Zcea1g3THcExANy0JepPh5o/YRVe0SCDLLB9MlhFGCIZ9f1o4mIBbcdE0rXqYWXNulpiL0NMnnOPNDfuevYqgPleulVmi+CZjxW7mqR8F8DcRF7KWb/xh8KxFPvjk77wv2M6QcuVfTyy9aCpYKpl9chVLs6Nx5/Z4/7f6DIogvnBjQYyLR8GRRCjoqks4J/s0eONLBkqEJYxlKI61vTEunh6QtrfGXGTb1exDADTdmX8VA==",
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