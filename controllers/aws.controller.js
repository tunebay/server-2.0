import aws from '../config/aws';

export const sign = (req, res) => {
  const s3 = new aws.S3({
    endpoint: 's3-eu-west-2.amazonaws.com',
    signatureVersion: 'v4',
    region: 'eu-west-2'
  });

  const params = {
    Bucket: 'tunebay-upload',
    Key: req.query.filename,
    Expires: 60,
    ContentType: req.query.filetype,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', params, (err, data) => {
    if (err) {
      console.log('WHHHHHYYYY', err);
      return err;
    }
    return res.status(200).json({ signedURL: data });
  });
};
