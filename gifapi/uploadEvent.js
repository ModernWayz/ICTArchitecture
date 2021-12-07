const AWS = require('aws-sdk');
const EventBridge = new AWS.EventBridge({
    accessKeyId: "ASIAVRXZQG5ZBHUC3MEH",
    secretAccessKey: "2VwLS8uR4NeyQEV2M+Okvv0nmoKaS7YXhqQpGMs2",
    sessionToken: "FwoGZXIvYXdzEMb//////////wEaDM/gkAZ59pumU5L2TSLNAYGag3Cllby09j50nVPeC5h/5VyLT7OGNgyrsbA9rSgSHjyHt0nog9xdxwFSdgc/1kgxXSBpHSQf9DB05DTiQZMY2vEoLlVLZV6A6HTO0r1e2ixQJphUg3kV/kfIXsyfbKdiglZH498pzFL1bBlG54eQNlgdXWuAc8aKxfUFE1lkS+GIJwGWF4WfofFRvyEIWetD028Q8BYJizjT0rh7pMJfQyCtubmuL3HUGVOiXekNhLdgoivG4SY8F55ITdtHrgxAWNfXCFQQKRC7DdYo7Y64jQYyLW6XrqbvSnq6ycGuDM158QP4cN8LXSYr3lFcpWR59xNjKl4XJav1PMJaGvOSFA==",
    region: 'us-east-1' })

// When successfully inserting image
const params = {
    Entries: [{
        Detail: JSON.stringify({"sub": sub}),
        DetailType: "new_file",
        Source: "web-server",
    }]
};

exports.EB = (sub) => {
    EventBridge.putEvents(params, (err, data) => {
        if (err){
            console.log(err);
        }
        console.log(data);
    });
};