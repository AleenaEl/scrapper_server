/* eslint-disable require-jsdoc */
import {createRequire} from 'module';
const required = createRequire(import.meta.url);
const fs = required('fs');
required('dotenv').config();

const region = 'eu-west-2';
const acessKeyId='AKIA5SAY4QRBZENFI45R';
const secretAcessKey='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';


const AWS = required('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: acessKeyId,
  secretAccessKey: secretAcessKey,
  region: region,
});

function upload(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: 'kcart-prime',
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}

function download(key) {
  const prams = {
    Key: key,
    Bucket: 'kcart-prime',
  };
  return s3.getObject(prams).createReadStream();
}

export {upload, download};
