var braintree = require("braintree");
const config = require("config");

var gateway = braintree.connect({
  environment: braintree.Environment[config.get("BRAINTREE.environment")],
  merchantId: config.get("BRAINTREE.merchantId"),
  publicKey: config.get("BRAINTREE.publicKey"),
  privateKey: config.get("BRAINTREE.privateKey")
});

module.exports = gateway;
