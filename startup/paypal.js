const config = require("config");

var paypal = require("paypal-rest-sdk");
// const payments = paypal.v1.payments;

paypal.configure({
  mode: config.get("PAYPAL.mode"), //sandbox or live
  client_id: config.get("PAYPAL.clientId"),
  client_secret: config.get("PAYPAL.secretKey")
});

// let env;
// if (process.env.NODE_ENV === "production") {
//   // Live Account details
//   env = new paypal.core.LiveEnvironment(
//     config.get("PAYPAL.clientId"),
//     config.get("PAYPAL.secretKey")
//   );
// } else {
//   env = new paypal.core.SandboxEnvironment(
//     config.get("PAYPAL.clientId"),
//     config.get("PAYPAL.secretKey")
//   );
// }

// let client = new paypal.core.PayPalHttpClient(env);
// let request = new payments.PaymentCreateRequest();

// { client, request }

module.exports = paypal;
