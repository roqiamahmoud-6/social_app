export var role;
(function (role) {
    role["user"] = "user";
    role["admin"] = "Admin";
})(role || (role = {}));
export var gender;
(function (gender) {
    gender["male"] = "male";
    gender["female"] = "female";
})(gender || (gender = {}));
export var provider;
(function (provider) {
    provider["system"] = "system";
    provider["google"] = "google";
})(provider || (provider = {}));
export var privacy;
(function (privacy) {
    privacy["private"] = "private";
    privacy["public"] = "public";
})(privacy || (privacy = {}));
export const multerEnum = {
    image: ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"],
    video: ["video/mp4", "video/mpeg", "video/quicktime", "video/x-ms-wmv"],
    audio: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/webm"],
    pdf: ["application/pdf"],
};
export var StoreEnum;
(function (StoreEnum) {
    StoreEnum["memory"] = "memory";
    StoreEnum["disk"] = "disk";
})(StoreEnum || (StoreEnum = {}));
export var AllowEnum;
(function (AllowEnum) {
    AllowEnum["allow"] = "allow";
    AllowEnum["deny"] = "deny";
})(AllowEnum || (AllowEnum = {}));
export var AvailabilityEnum;
(function (AvailabilityEnum) {
    AvailabilityEnum["public"] = "public";
    AvailabilityEnum["friends"] = "friends";
    AvailabilityEnum["onlyMe"] = "onlyMe";
})(AvailabilityEnum || (AvailabilityEnum = {}));
//# sourceMappingURL=enum.js.map