require('dotenv').config(); // aab main dotenv use ker sakta hu
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const  connectDb   = require("./utils/db");


// now use middle ware because kyoki data main req ker raha hu json wala par vo print nhi ho rha hai that's why
app.use(express.json()); // aab main aapne application main json use ker sakta hu(use for parsing json data in the request body)

app.use("/somay",router);
// using app i am creating a server as well as manage a middle ware as well
// in app having so many method like get,put,update,delete and so on
// app.get("/",(req,res)=>{ // arrow function handling the request (req) and constructing the response (res)
//     res.status(200).send("welcome to mern stack code")
// }); // define first root and second call back function

// app.get("/register",(req,res)=>{ // arrow function handling the request (req) and constructing the response (res)
//     res.status(200).send("welcome to register page")
// });

// app.get("/home",(req,res)=>{ // arrow function handling the request (req) and constructing the response (res)
//     res.status(200).send("welcome to home")
// });

// res.send("hello world|"); // send the "hello world" message as the response when the route is accessed


const PORT = 5000;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at PORT number : ${PORT}`);
    });
});

