const express = require("express");
const {home, register,login} = require("../controllers/auth-controller");
const router = express.Router();

// router.get("/",(req,res)=>{
//     // res.status(200).send("welcome to router somay");
//     home
// });
router.route("/").get(home);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;