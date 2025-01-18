const User = require("../models/user-model");
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

        await User.create({username,email,phone,password});

        res.status(201).json({message:"user registered successfully"});
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {home,register};
