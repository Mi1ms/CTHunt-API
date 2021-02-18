import aws from 'aws-sdk';
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_ASSETS_FOLDER,
    AWS_ASSETS_BUCKET,
    AWS_REGION,
} from './params';

async function uploadToAwsBucket({
    file,
    name,
    type,
    domain,
    ACL = 'public',
}: {
    file: Buffer;
    name: string;
    type: string;
    domain: string;
    ACL?: string;
}): Promise<aws.S3.ManagedUpload.SendData> {
    const s3 = new aws.S3({
        region: AWS_REGION,
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });

    // eslint-disable-next-line
    const params = {
        Bucket: `${AWS_ASSETS_BUCKET}/${AWS_ASSETS_FOLDER}/${domain}`,
        Key: name,
        ContentType: type,
        Body: file,
        ACL: ACL,
    };

    return s3.upload(params).promise();
}

export { uploadToAwsBucket };
