const adRoute = require('express').Router()
const { justAddNewAdd,justGetAllAds } = require('../controllers/adController')
const { upload } = require('../multer/multerConfig')

adRoute.post('/addnewad',upload.single("image"),justAddNewAdd)
adRoute.get('/getallads',justGetAllAds)
module.exports = adRoute