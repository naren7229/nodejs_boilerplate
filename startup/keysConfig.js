const fs = require("fs");

const authPrivateKey = fs.readFileSync(
  "./keys/Authorization/private.key",
  "utf8"
);
const authPublicKey = fs.readFileSync(
  "./keys/Authorization/public.key",
  "utf8"
);
const patientPrivateKey = fs.readFileSync("./keys/Patient/private.key", "utf8");
const patientPublicKey = fs.readFileSync("./keys/Patient/public.key", "utf8");
const emailVerifyPrivateKey = fs.readFileSync(
  "./keys/EmailVerification/private.key",
  "utf8"
);
const emailVerifyPublicKey = fs.readFileSync(
  "./keys/EmailVerification/public.key",
  "utf8"
);

if (!authPrivateKey && !authPublicKey) {
  throw new Error(
    "FATAL ERROR: Authorization Private Key and Public key is not found."
  );
}

if (!patientPrivateKey && !patientPublicKey) {
  throw new Error(
    "FATAL ERROR: patient Private Key and Public key is not found."
  );
}

if (!emailVerifyPrivateKey && !emailVerifyPublicKey) {
  throw new Error(
    "FATAL ERROR: email Verify Private Key and Public key is not found."
  );
}

module.exports = {
  authPrivateKey,
  authPublicKey,
  patientPrivateKey,
  patientPublicKey,
  emailVerifyPrivateKey,
  emailVerifyPublicKey
};
