const config = require("config");
const fs = require("fs");

const handlebars = require("handlebars");
const handlebarsLayouts = require("handlebars-layouts");

handlebarsLayouts.register(handlebars);

var { AWS } = require("../startup/aws");
AWS.config.update({ region: "us-east-1" });

const sendEmail = res => {
  return new Promise((resolve, reject) => {
    var template = handlebars.compile(
      fs.readFileSync(`email_templates/${res.fileName}.html`, "utf8")
    );

    // Render template
    var output = template(res);

    // Create sendEmail params
    var params = {
      Destination: {
        ToAddresses: [res.email]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: output
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: res.subject
        }
      },
      Source: config.get("MAIL.FROM"),
      ReplyToAddresses: [config.get("MAIL.REPLYTO")]
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function(data) {
        // console.log(data.MessageId);
        return resolve(data.MessageId);
      })
      .catch(function(err) {
        // console.error(err, err.stack);
        return reject(err);
      });
  });
};

module.exports = {
  sendEmail
};
