import { ObjectCannedACL } from "@aws-sdk/client-s3";
import { StoreEnum } from "../utilis/enum.js";
export declare class s3service {
    private readonly client;
    constructor();
    uploadFile({ ACL, path, file, storeType }: {
        ACL?: ObjectCannedACL;
        path?: string;
        file: Express.Multer.File;
        storeType?: StoreEnum.memory | undefined;
    }): Promise<string | undefined>;
    uploadLargeFile({ ACL, path, file, storeType }: {
        ACL?: ObjectCannedACL;
        path?: string;
        file: Express.Multer.File;
        storeType?: StoreEnum.memory | undefined;
    }): Promise<string | undefined>;
    uploadFiles({ ACL, path, files, storeType, islarge }: {
        ACL?: ObjectCannedACL;
        path?: string;
        files: Express.Multer.File[];
        storeType?: StoreEnum.memory | undefined;
        islarge?: boolean;
    }): Promise<(string | undefined)[]>;
    getFile(Key: string): Promise<import("@aws-sdk/client-s3").GetObjectCommandOutput>;
    create_upload_Signed_Url({ path, ContentType, filename }: {
        path: string;
        ContentType: string;
        filename: string;
    }): Promise<{
        url: string;
        key: string;
    }>;
    get_Signed_Url({ key, expiresIn, download }: {
        key: string;
        expiresIn?: number;
        download?: boolean;
    }): Promise<string>;
    deleteFile({ key }: {
        key: string;
    }): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
    deleteFiles({ path, keys }: {
        path?: string;
        keys: string[];
    }): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput[]>;
}
//# sourceMappingURL=s3.service.d.ts.map