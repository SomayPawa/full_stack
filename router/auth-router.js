const express = require("express");
const {home, register} = require("../controllers/auth-controller");
const router = express.Router();

// router.get("/",(req,res)=>{
//     // res.status(200).send("welcome to router somay");
//     home
// });
router.route("/").get(home);
router.route("/register").get(register);

module.exports = router;