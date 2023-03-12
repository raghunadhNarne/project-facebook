const mongoose = require('./conn.js').mongoose

var adSchema = {
    company:{type:String},
    adImage:{type:String},
    adVideo:{type:String},
    link:{type:String}
}

const adModel = mongoose.model("ads",adSchema);

module.exports = {adModel};