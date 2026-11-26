import { DeleteObjectCommand, GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../../config/env.servie.js";
import { StoreEnum } from "../utilis/enum.js";
import {randomUUID}  from "crypto"
import { createReadStream } from "fs";
import { Upload } from "@aws-sdk/lib-storage";
import { promise, string } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export class s3service{
    private readonly client:S3Client
    constructor(){
        this.client=new S3Client({
            region:AWS_REGION,
            credentials:{
                accessKeyId:AWS_ACCESS_KEY_ID,
                secretAccessKey:AWS_SECRET_ACCESS_KEY
            }
        })
        
    }
    async uploadFile({
        ACL=ObjectCannedACL.private,
        path="general",
        file,
        storeType
    }:{
        ACL?:ObjectCannedACL,
        path?:string,
        file:Express.Multer.File,
        storeType?:StoreEnum.memory| undefined
    }){
        const command = new PutObjectCommand({
            Bucket:AWS_BUCKET_NAME,
            ACL,
            Key:`social_app/${path} /__ ${randomUUID()}__${file.originalname}`,
            Body:storeType===StoreEnum.memory?file.buffer:createReadStream(file.path),
            ContentType:file.mimetype
        })
        await this.client.send(command)
        return command.input.Key
    }
    async uploadLargeFile({
        ACL=ObjectCannedACL.private,
        path="general",
        file,
        storeType
    }:{
        ACL?:ObjectCannedACL,
        path?:string,
        file:Express.Multer.File,
        storeType?:StoreEnum.memory| undefined
    }){
        const command =new Upload({
            client :this.client,
            params:{
                 Bucket:AWS_BUCKET_NAME,
                 ACL,
                 Key:`social_app/${path} /__ ${randomUUID()}__${file.originalname}`,
                 Body:storeType===StoreEnum.memory?file.buffer:createReadStream(file.path),
                 ContentType:file.mimetype
                }
        })
        const result= await command.done()
        return result.Key
    }
    async uploadFiles({
        ACL=ObjectCannedACL.private,
        path="general",
        files,
        storeType,
        islarge=false
    }:{
        ACL?:ObjectCannedACL,
        path?:string,
        files:Express.Multer.File[],
        storeType?:StoreEnum.memory| undefined,
        islarge?:boolean
    }){
        let keys
        if(islarge){
            keys=await Promise.all(files.map((file)=>{
                return this.uploadLargeFile({file,path,storeType,ACL})
            }))
        }else{
            keys=await Promise.all(files.map((file)=>{
                return this.uploadFile({file,path,storeType,ACL})
            }))
            
        }return keys
    }
    
    async getFile(Key:string){
       const command= new GetObjectCommand({
        Key,
        Bucket:AWS_BUCKET_NAME
       })
       return await this.client.send(command)
    }
    async create_upload_Signed_Url({
        path,
        ContentType,
        filename
    }:{
        path:string,
        ContentType:string,
        filename:string
    }){
        const key=`social_app/${path}/${randomUUID()}__${filename}`
        const command=new PutObjectCommand({
            Bucket:AWS_BUCKET_NAME,
            Key:key,
            ContentType
        })
        const url= await getSignedUrl(this.client,command,{expiresIn:60})
        return{url,key}
    }
    async get_Signed_Url({
       key,
       expiresIn=60,
       download
        }:{
        key:string,
        expiresIn?:number,
        download?:boolean
    }){
      const command= new GetObjectCommand({
        Key:key,
        Bucket:AWS_BUCKET_NAME,
        ...(download && {
            ResponseContentDisposition: "attachment"
        })
      })
      
      const url=await getSignedUrl(this.client,command,{expiresIn})
      return url
    }


    async deleteFile({
    key
    }: {
    key: string
    }) {
    const command = new DeleteObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key
    });

    const result = await this.client.send(command);
    return result
}


    async deleteFiles({
    path = "general",
    keys
    }: {
    path?: string,
    keys: string[]
    }) {
    const result = await Promise.all(
        keys.map((key) => {
            return this.client.send(
                new DeleteObjectCommand({
                    Bucket: AWS_BUCKET_NAME,
                    Key: `social_app/${path}/${key}`
                })
            )
        })
    )

    return result
}
    
    
}
