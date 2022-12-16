/* eslint-disable no-console */

"use strict";

const fs = require("fs");
const tus = require("tus-js-client");

const path = `${__dirname}/avatar.png`;
const file = fs.createReadStream(path);

const options = {
  endpoint: "http://localhost:4040/",
  metadata: {
    filename: `${new Date().getTime()}-avatar.png`,
    filetype: "image/png",
    userId: "COBA",
  },
  onError(error) {
    console.error("An error occurred:");
    console.error(error);
    process.exitCode = 1;
  },
  onProgress(bytesUploaded, bytesTotal) {
    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
    console.log(bytesUploaded, bytesTotal, `${percentage}%`);
  },
  onSuccess() {
    console.log("Upload finished:", upload.url);
  },
};

const upload = new tus.Upload(file, options);
upload.start();
