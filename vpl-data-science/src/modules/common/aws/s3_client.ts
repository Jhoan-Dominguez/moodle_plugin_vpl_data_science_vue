import {
    S3Client,
    GetObjectCommand,
    ListObjectsCommand,
    type ListObjectsCommandOutput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const getConfigClient = (region?: string, profile?: string) => {
    if (region != null && profile != null) {
        const config = {
            region: import.meta.env.VITE_REGION,
            credentials: {
                accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
                secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
            },
        };
        return config;
    } else {
        const config = {
            region: import.meta.env.VITE_REGION,
            credentials: {
                accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
                secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
            },
        };

        return config;
    }
};

export const S3GetObject = async (bucket_name?: string, bucket_key?: string) => {
    const config = getConfigClient();
    const s3_client = new S3Client(config);

    const response = await s3_client.send(
        new GetObjectCommand({
            Bucket: bucket_name,
            Key: bucket_key,
        }),
    );
    const response_string = response.Body ? await response.Body.transformToString('utf-8') : '';

    return response_string;
};

export const s3GetPresignedUrl = async (bucket_name?: string, bucket_key?: string) => {
    const config = getConfigClient();
    const s3_client = new S3Client(config);

    const presigned_url = await getSignedUrl(
        s3_client,
        new GetObjectCommand({
            Bucket: bucket_name,
            Key: bucket_key,
        }),
        {
            expiresIn: 60,
        },
    );

    return presigned_url;
};

export const s3GetListObjects = async (bucket_name?: string, bucket_key?: string) => {
    const config = getConfigClient();
    const s3_client = new S3Client(config);

    const response: ListObjectsCommandOutput = await s3_client.send(
        new ListObjectsCommand({
            Bucket: bucket_name,
            Prefix: bucket_key,
        }),
    );

    const list_objects = response.Contents?.filter(({ Size }) => Size && Size > 0);
    const map_result = list_objects?.map(({ Key, Size }, index) => {
        let filename = Key?.split('/') ?? '';
        filename = filename[filename.length - 1] ?? '';

        return {
            size: Size,
            bucket_key: Key,
            index: index,
            buttonId: 'btn-' + filename,
            divContainerId: 'div-container-' + filename,
            divEditorId: 'div-code-' + filename,
            filenameCode: filename,
        };
    });

    return map_result;
};
