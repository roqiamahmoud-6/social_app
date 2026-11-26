import { DeleteObjectCommand, GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../../config/env.servie.js";
import { StoreEnum } from "../utilis/enum.js";
import { randomUUID } from "crypto";
import { createReadStream } from "fs";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export class s3service {
    client;
    constructor() {
        this.client = new S3Client({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY
            }
        });
    }
    async uploadFile({ ACL = ObjectCannedACL.private, path = "general", file, storeType }) {
        const command = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            ACL,
            Key: `social_app/${path} /__ ${randomUUID()}__${file.originalname}`,
            Body: storeType === StoreEnum.memory ? file.buffer : createReadStream(file.path),
            ContentType: file.mimetype
        });
        await this.client.send(command);
        return command.input.Key;
    }
    async uploadLargeFile({ ACL = ObjectCannedACL.private, path = "general", file, storeType }) {
        const command = new Upload({
            client: this.client,
            params: {
                Bucket: AWS_BUCKET_NAME,
                ACL,
                Key: `social_app/${path} /__ ${randomUUID()}__${file.originalname}`,
                Body: storeType === StoreEnum.memory ? file.buffer : createReadStream(file.path),
                ContentType: file.mimetype
            }
        });
        const result = await command.done();
        return result.Key;
    }
    async uploadFiles({ ACL = ObjectCannedACL.private, path = "general", files, storeType, islarge = false }) {
        let keys;
        if (islarge) {
            keys = await Promise.all(files.map((file) => {
                return this.uploadLargeFile({ file, path, storeType, ACL });
            }));
        }
        else {
            keys = await Promise.all(files.map((file) => {
                return this.uploadFile({ file, path, storeType, ACL });
            }));
        }
        return keys;
    }
    async getFile(Key) {
        const command = new GetObjectCommand({
            Key,
            Bucket: AWS_BUCKET_NAME
        });
        return await this.client.send(command);
    }
    async create_upload_Signed_Url({ path, ContentType, filename }) {
        const key = `social_app/${path}/${randomUUID()}__${filename}`;
        const command = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: key,
            ContentType
        });
        const url = await getSignedUrl(this.client, command, { expiresIn: 60 });
        return { url, key };
    }
    async get_Signed_Url({ key, expiresIn = 60, download }) {
        const command = new GetObjectCommand({
            Key: key,
            Bucket: AWS_BUCKET_NAME,
            ...(download && {
                ResponseContentDisposition: "attachment"
            })
        });
        const url = await getSignedUrl(this.client, command, { expiresIn });
        return url;
    }
    async deleteFile({ key }) {
        const command = new DeleteObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: key
        });
        const result = await this.client.send(command);
        return result;
    }
    async deleteFiles({ path = "general", keys }) {
        const result = await Promise.all(keys.map((key) => {
            return this.client.send(new DeleteObjectCommand({
                Bucket: AWS_BUCKET_NAME,
                Key: `social_app/${path}/${key}`
            }));
        }));
        return result;
    }
}
//# sourceMappingURL=s3.service.js.map