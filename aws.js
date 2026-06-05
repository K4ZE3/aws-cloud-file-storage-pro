const AWS = require("aws-sdk");
const config = require("./config");

AWS.config.update({
    region: config.REGION
});

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = {
    s3,
    dynamoDB
};
