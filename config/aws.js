import aws from 'aws-sdk';

require('dotenv').config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export default aws;
