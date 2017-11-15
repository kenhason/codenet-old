var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    fid: {type:String, default:''},
    username: {type: String, default: ''},
    password: {type: String, default: ''},
    balance: {type: Number, default:0}
})

module.exports = mongoose.model('UserSchema', UserSchema)