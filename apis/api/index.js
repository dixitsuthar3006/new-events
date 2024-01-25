const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

const db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  port: 3306,
  database: "events",
  user: "root",
  password: "",
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.post("/api/login", (req, res) => {
  const user = req.body;

  db.getConnection((err, connection) => {
    if (err) return res.send({ status: "error", data: "Something went wrong" });

    console.log(`Select * from users where email='${user.email}' AND password='${user.password}' AND user_type='${user.userType}'`);
    connection.query(
      `Select * from users where email='${user.email}' AND password='${user.password}' AND user_type='${user.userType}'`,
      (err, data) => {
        console.log();
        if (err)
          return res.send({ status: "error", message: "Something went wrong" });

        if (data.length === 0) {
          return res.send({ status: "error", message: "Invalid Credentials" });
        }
        const userData = data[0];

        if (userData.status === "enabled") {
          return res.send({ status: "success", data: userData });
        } else {
          return res.send({ status: "error", message: "user disabled" });
        }
      }
    );
  });
});

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
