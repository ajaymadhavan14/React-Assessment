const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{type: String, required: true, trim:true},
    
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
 
  password: {
    type: String,
    trim:true,
    required: true,
    minlength: [6],
  },
  image:{
    type: String,
  },
  
 
},
{
  timestamps:true,
}
);


const usermodel = mongoose.model("user",userSchema )
module.exports = usermodel