export enum role {
    user="user",
    admin="Admin"
}
export enum gender {
    male="male",
    female="female"
}
export enum provider {
    system="system",
    google="google"
} 
export enum privacy {
    private="private",
    public="public"
} 

export const multerEnum = {
    image: ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"],
    video: ["video/mp4", "video/mpeg", "video/quicktime", "video/x-ms-wmv"],
    audio: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/webm"],
    pdf: ["application/pdf"],
}
export enum StoreEnum {
    memory = "memory",
    disk = "disk"
}
export enum AllowEnum {
    allow = "allow",
    deny = "deny"
}
export enum AvailabilityEnum {
    public = "public",
    friends = "friends",
    onlyMe = "onlyMe"
}
