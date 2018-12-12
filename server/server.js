const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');



// import user
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles')

// DB config
const db = require('./config/key').mongoURI;
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const port = process.env.PORT || 3000;
// 请求跨域允许
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});




// user router
app.use('/api/users',users);
app.use('/api/profiles',profiles);

// connect mongodb
mongoose.connect(db).then(() => console.log("mongoDB connected")).catch(err => console.log(err));

// passport initialize
app.use(passport.initialize());
require('./config/passport')(passport);


//test
app.get('/login',(req,res)=>{
    fs.readFile('./index.html','utf8',(err,data) => {
        if(err) throw err;
        res.send(data);
    })
})




app.listen(port,()=>{
    console.log(`Server is ready on port ${port}`);
})