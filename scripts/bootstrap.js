require("dotenv").config();
const fs = require("fs");
const path = require("path");

const devcert = require("devcert");

const hostname = process.env.HOSTNAME;

function createFolderIfNotExists(path) {
  fs.mkdirSync(path, { recursive: true });
}

async function generateDevCert() {
  try {
    const { key, cert } = await devcert.certificateFor(hostname);

    fs.writeFileSync(path.resolve(__dirname, "../certs/tls.key"), key);
    fs.writeFileSync(path.resolve(__dirname, "../certs/tls.crt"), cert);

    console.log(`Created certificate for ${hostname}`);
  } catch (error) {
    console.error(error);
  }
}

createFolderIfNotExists("certs");
generateDevCert();