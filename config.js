const Cloud = require("@google-cloud/storage");
// const path = require("path");
// const serviceKey = path.join(__dirname, "./keys.json");
const serviceKey = "./amzServiceKey.json";
const GOOGLE_CLOUD_KEYFILE = "../amazonaff-349303-ccea88bd6cff";
const GOOGLE_CLOUD_PROJECT_ID = "amazonaff-349303";

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: GOOGLE_CLOUD_PROJECT_ID,
});

module.exports = { storage };
