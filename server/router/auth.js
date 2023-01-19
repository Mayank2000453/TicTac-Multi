const express = require("express")
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const StreamChat = require('stream-chat').StreamChat;
const uuidv4 = require("react-uuid");


dotenv.config({path: "../config.env"});
const apikey = "4myq2nvk2uu5";
const secret = "rzs85c43uud33t7asdnnzhtpv9sw4zz84d5cdu6w4knk5p6cn8g8tkbhfegzwe7x";

const serverClient = StreamChat.getInstance(apikey,secret);

router.post("/register", async (req,res)=>{
    try{
        const {name,username,email,password} = req.body;
        const userId = uuidv4();
        const hashPassword = await bcrypt.hash(password,10);
        const token = serverClient.createToken(userId);
        res.json({token,userId,name,username,email,hashPassword});
    }catch (error){
res.json(error);
    }
});

router.post("/login", async (req,res)=>{
    try{
        const {username, password} = req.body
        const {users} = await serverClient.queryUsers({username: username})
        if(users.length === 0 ) return res.json({message: "User not found"});

        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(password, users[0].hashPassword)
        
        if(passwordMatch){
         res.json({
            token: users[0].token,
            name: users[0].name,
            email: users[0].email,
            username,
            userId: users[0].userId
        });
        }

    }catch (error) {
    res.json(error);
    } 
});


router.get("/",(req,res)=>{
    res.send("Hello")
});



module.exports=router;