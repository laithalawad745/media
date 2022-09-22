if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const {promisify} = require('util') 
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const mysql  = require('mysql2')
const db = require('./config/dbConection');

const session = require('express-session')

const initializePassport = require('./passport-config');
let x = promisify(db)

async function getData (){
  var lala
  try{

    lala = await x('SELECT * FROM `users`')

  }
  catch(err){
    console.log(err)
    return 
  }
  console.log(lala);
}
getData();

// initializePassport(
//   passport, 
//   email => result.find(user => user.email === email),
//   id => result.find(user => user.id === id)
// )



app.set("view-engine", "ejs");
app.use(express.urlencoded({extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get("/", (req, res) => {
  res.render("index.ejs", { name: "ahmed" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});


app.post('/login', passport.authenticate('local' , {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}))

app.post('/register', async (req, res) =>{

    try {
        const hashedPassword = await (bcrypt.hash(req.body.password, 10)) 
            const sqlInsert =
    "INSERT INTO `users`(`id`, `username`, `email` ,`password`) VALUES (?,?,?,?)";
  db.query(
    sqlInsert,
    [null ,req.body.name ,req.body.email,hashedPassword ], 
    (err) => {
      if (err) console.log(err) ;
      else{
        users = result
        console.log(users)

        res.redirect('/login')
      }
    }
  );
    }catch{
        res.redirect('/register')
    }


    const sqlInsert =
    "INSERT INTO `users`(`ID`, `username`, `password` ,`email`) VALUES (?,?,?,?)";
  db.query(
    sqlInsert,
    [null ,req.body.name ,req.body.password,req.body.email ],
    (err, result) => {
      if (err) console.log(err) ;
      else{
        console.log("record added");
        res.redirect('/login')
      }
    }
  );



})
  

app.listen(2000, (req, res) => {
  console.log("server started on port 2000");
});
