const { S3Client } = require('@aws-sdk/client-s3')
var multer  = require('multer');
const multerS3 = require('multer-s3')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/multer/images")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});

// const s3 = new S3Client({
//     region:process.env.AWS_REGION,
//     credentials:{
//         accessKeyId:process.env.AWS_ACCESS_KEY,
//         secretAccessKey:process.env.AWS_ACCESS_SECRET
//     }
// }
// )

// var upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: process.env.AWS_BUCKET_NAME ,
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString()+file.originalname)
//       }
//     })
//   })

var upload = multer({storage: storage,limits: { fileSize: '5mb' }});

module.exports = {upload};