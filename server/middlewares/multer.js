import multer from 'multer'
const multerUpload = multer({
    limits:{
    fileSize: 1024 * 1024 * 5,
    },
})
const singleAvatar = multerUpload.single('avatar');
const attachmentMulter = multerUpload.array('files',5);

export {singleAvatar,attachmentMulter}