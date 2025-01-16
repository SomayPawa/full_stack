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
        res.status(200).send("hello babu baccha ye aapka hai register page");
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {home,register};
