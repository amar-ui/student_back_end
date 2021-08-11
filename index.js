var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',                       //databaseconnection
  password: '',
  database: 'student',
  port: 3306
});
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});


app.get('/test', (req, res) => {
  console.log('hii');
  res.sendStatus(200);
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//registercomponent
app.post('/register', bodyParser.json(), (req, res) => {
  console.log(req.body)
  var postData = req.body;
  let sql = 'INSERT INTO user_details (`email`, `username`, `password`) values("' + postData.email + '","' + postData.username + '","' + postData.password + '")'
  con.query(sql, (err, results) => {
    console.log(results)
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": " registered succesfully" }));
  });
});

//login check
app.post('/login', bodyParser.json(), (req, res) => {
  var postData = req.body;
  let sql = 'select username from user_details where email ="' + postData.email + '" && password="' + postData.password + '" ';
  con.query(sql, (err, results) => {
    console.log(results[0])
    if (results !== undefined) {
      res.send(JSON.stringify({ "status": 200, "body":results[0],"response": "login succesfully" }));
    }
    else {
      res.send(JSON.stringify({ "status": 400, "response": "login faild" }));
    }

    if (err) throw err;

  });

})