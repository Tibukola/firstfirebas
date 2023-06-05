const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    username:{
        type: String,
        required:true,
        toLowerCase:true,
    },
    password:{
        type: String,
        required:true
    },
    uid:{
        type:Number,
        required:true,
    },
    email:{
        type: String,
        required:true,
        lowerCase: true,
    },
    dob:{
      type: Date,
      required:true,  
    },
},{
    timestamps:true,
}
);