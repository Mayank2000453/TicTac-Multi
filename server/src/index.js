const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());

app.use(express.json());

app.use(require("../router/auth"));

app.listen(3001,()=>{
    console.log("server running");
})