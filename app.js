const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const dbpath = path.join(__dirname, "covid19IndiaPortal.db");
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

app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const identifyUser = `select * from user where username='${username}';`;
  const dbUser = await db.get(identifyUser);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const password = `select * from user where username='${username}';`;
    const dbUser = await db.get(password);
    const compaire = await bcrypt.compare(password, dbUser.password);
    if (compaire === true) {
      const payload = { username: username };
      const jwttoken = jwt.sign(payload, "my_secret");
      response.send({ jwttoken });
    } else {
      response.status(400);
      response.send("Invalid Password");
    }
  }
});
