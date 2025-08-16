import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/imagesItems')
    },
    filename: function (req, file, cb) {
        const fn = Date.now() + '-' + file.originalname;
        cb(null, fn)
    }
})

export const upload = multer({ storage: storage })