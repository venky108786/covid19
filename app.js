const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const dbpath = path.join(__dirname, "covid19IndiaPortal.db.db");
let dp = null;

const initializationDbAndServer = async () => {
  try {
    dp = open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
  }
};

initializationDbAndServer();

app.post('/login/',(request,response)=>{
    const{username,password}=request.body
    const identifyUser=`select * from user where user_name=${username};`
    const dbUser=await db.get(identifyUser)
    if(dbUser===undefined){
        response.status(400)
        response.send('Invalid user')
    }
})
