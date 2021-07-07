const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required : true,
    trim:true,
    min: 2,
    max: 20
  },
  email:{
    type: String,
    required: true,
    trim:true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    min: 6,
    max: 64
  },
  avater:{
    type: String
  }

},
  { timestamps: true }
)


module.exports = mongoose.model('user', UserSchema )