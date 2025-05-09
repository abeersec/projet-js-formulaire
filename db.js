require("dotenv").config();
const mongoose = require('mongoose');

const  MONGODB_URI  = process.env.MONGODB_URI;
const connectToDB = async() => {
 try {
   await mongoose.connect(process.env.MONGODB_URI);
     useNewUrlParser: true;
     useUnifiedToplogy: true;
 
    console.log("DB connected");
} catch(error){
    console.log(error);
}
}