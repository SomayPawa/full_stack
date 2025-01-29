const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
});

// ? secure the password via bcrypt

userSchema.pre('save',async function(){
    // console.log(this); // iska matlab hai ki ye useSchema ko print ker dega aab muje password hash kerna hai
    const user = this;
    if(!user.isModified('password')){
        next(); // ye middle ware hai
    }
    try{
        const saltRound = await bcrypt.genSalt(10); // ye kitna complex kerna hai 
        const hash_password = await bcrypt.hash(user.password,saltRound);// or 10 bhi direct likh sakte the
        user.password = hash_password;
    }
    catch(error){
        next(error);
    }

});


// json web token
// jwt we can store only for client side (cookies and local storage) they are issued by th erver during the authentication process and then stored on the client side

userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId : this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SEC_KEY,{
            expiresIn:"30d",
        }
        );
    }
    catch(error){
        console.error(error);
    }
}   

// define the model or the collection name

const User = new mongoose.model("User",userSchema);// first letter capital and without s 

module.exports = User;

