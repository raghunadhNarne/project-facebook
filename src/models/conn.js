const mongoose=require("mongoose")
const url="mongodb://localhost:27017/Facebook"


mongoose.Promise=global.Promise
mongoose.connect(url)

var db=mongoose.connection
db.on('error',console.error.bind(console,'DB Error:'))

module.exports={mongoose}
