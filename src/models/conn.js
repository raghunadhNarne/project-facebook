const mongoose=require("mongoose")

const url = process.env.ATLAS_CONNECTION_URL;

mongoose.Promise=global.Promise
mongoose.connect(url)

var db=mongoose.connection
db.on('error',console.error.bind(console,'DB Error:'))

module.exports={mongoose}