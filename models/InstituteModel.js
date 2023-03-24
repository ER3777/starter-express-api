const mongoose = require('mongoose')

const instituteTemplate = new mongoose.Schema({
    institutename:{
        type:String,
        required:true
    },
    acdemicyear:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('institute',instituteTemplate)