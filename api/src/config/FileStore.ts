import multer from 'multer'

const
    upload = multer({dest: 'uploads/'});


const fileSizeOnMB = 40


const fileUploadingConfig = {
    limits: {
        fileSize: fileSizeOnMB*1024*1024 //25mb
    },
    storage: multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            let ext = require('path').extname(file.originalname);
            ext = ext.length > 1 ? ext : "." + require('mime').extension(file.mimetype);
            require('crypto').pseudoRandomBytes(16, function (err: Error, raw: Buffer) {
                cb(null, (err ? undefined : raw.toString('hex')) + ext);
            });
        }
    })
}


const fileUploadingRules = [
    {name: 'image', maxCount: 1},
    {name: 'gallery', maxCount: 10},
    {name: 'audio', maxCount: 2},
    {name: 'video', maxCount: 1}
]


export {
    fileUploadingConfig,
    fileUploadingRules
}
