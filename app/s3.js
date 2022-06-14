/* eslint-disable require-jsdoc */
import {createRequire} from 'module';
const required = createRequire(import.meta.url);
const fs = required('fs');
required('dotenv').config();

const region = '';
const acessKeyId='';
const secretAcessKey='';


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
