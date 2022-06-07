const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const saltRounds = 10
//Encrypt the password

userSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password,saltRounds)
    next()
})

module.exports = mongoose.model("user",userSchema)