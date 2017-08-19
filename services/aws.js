import aws from 'aws-sdk';
import keys from '../config/keys';

aws.config.update({
  accessKeyId: keys.AWS_ACCESS_KEY,
  secretAccessKey: keys.AWS_SECRET_KEY,
});

export default aws;
