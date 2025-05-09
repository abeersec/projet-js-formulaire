const mongoose = require('mongoose');
const userSchema = mongoose.Schema( 
    {
   email:{
  type: String,
  required: [true,"L'email est requis !"],
  trim : true,
  unique : [true,"L'email doit être unique !"],
  minLength : [5,"L'email doit comporter au moins 5 caractères !"],
  lowercase: true },
    password:{
    type: String,
    required: [true,"Le mot de passe est requis !"],
    trim : true,
    select : false,
    minLength : [6,"Le mot de passe doit comporter au moins 6 caractères !"] },
    verified:{
        type: Boolean,
        default: false },
    verificationCode:{
        type: String,
        select: false },  
    verificationCodeValidation:{
        type: Number,
        select: false },
       forgotPasswordCode:{
        type: String,
        select: false },
       forgotPasswordCodeValidation:{
        type: Number,
        select: false },
   },{
    timestamps: true,
   }
);
module.exports = mongoose.model("User", userSchema); 
