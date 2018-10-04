const config = require("config");
var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: config.get("AWS.accessKeyId"),
  secretAccessKey: config.get("AWS.secretAccessKey")
});
// AWS.config.region = config.get("AWS.REGION");
var s3 = new AWS.S3({ signatureVersion: "v4" });

module.exports = { AWS, s3 };
