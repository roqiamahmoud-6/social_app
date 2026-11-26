import multer from "multer";
import AppError from "../utilis/globalErrorHandling.js";
import { multerEnum, StoreEnum } from "../utilis/enum.js";
import { tmpdir } from "node:os";
const multerCloud = ({ customTypes = multerEnum.image, storeType = StoreEnum.memory }) => {
    const storage = StoreEnum.memory ? multer.memoryStorage() : multer.diskStorage({
        destination: tmpdir,
        filename: (req, file, cb) => {
            cb(null, Date.now() + "__" + Math.random() + "__" + file.originalname);
        }
    });
    function fileFilter(req, file, cb) {
        if (customTypes?.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new AppError("InValid file"));
        }
    }
    const upload = multer({ storage, fileFilter });
    return upload;
};
//# sourceMappingURL=multer.cloud.js.map