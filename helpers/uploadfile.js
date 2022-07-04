const util = require("util");
const gc = require("../config");
const bucket = gc.storage.bucket("amz-pics"); // should be your bucket name

const { format } = util;

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    // const { originalname, buffer } = file;
    const originalName = file.name;
    const buffer = file.data;

    const blob = bucket.file(originalName);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", (err) => {
        reject(`Unable to upload image, something went wrong: ${err}`);
      })
      .end(buffer);
  });

module.exports = uploadImage;
