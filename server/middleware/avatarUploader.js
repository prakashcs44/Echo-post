const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload_folder = path.join(__dirname, "../uploads/user_avatars");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
      if (!fs.existsSync(upload_folder)) {
        fs.mkdirSync(upload_folder, { recursive: true });
      }
         cb(null,upload_folder);
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+"-"+file.originalname.trim().replace(/\s+/g, "_"));
    }
})


const avatarUploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/png"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
})

module.exports = avatarUploader;