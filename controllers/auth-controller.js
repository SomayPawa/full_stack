const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const home = async(req,res) => {
    try{
        res.status(200).send("hello babu baccha ye aapka hai home page");
    }
    catch(error){
        console.log(error);
    }
};
const register = async(req,res)=>{
    try{
        console.log(req.body);
        // res.status(200).send("hello babu baccha ye aapka hai register page");
        const {username,email,phone,password} = req.body;
        
        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(400).json({msg : "email already exists"});
        }
        // hash the password

        // const saltRound = 10; // ye kitna complex kerna hai 

        // const hash_password = await bcrypt.hash(password,saltRound);// or 10 bhi direct likh sakte the

        const userCreated = await User.create({username,email,phone,password});

        res.status(201).json({message:"user registered successfully" ,token : await userCreated.generateToken() ,userId : userCreated._id.toString()});
    }
    catch(error){
        console.log(error);
    }
}

// login page logic

const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        // aab email check kerna hai it is valid or not
        const userExist = await User.findOne({email});
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({message:"invalid credentials"});
        }
        
        const user = await bcrypt.compare(password,userExist.password);
        if(user){
            res.status(200).json({message:"login successfully" ,token : await userExist.generateToken() ,userId : userExist._id.toString()});
        }
        else{
            res.status(401).json({message:"invalid email or password"});
        }
    }
    catch(error){
        res.status(300).json("internal server error");
    }
}

module.exports = {home,register,login};
