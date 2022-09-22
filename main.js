const { render } = require('ejs');
const express = require ('express')
const app = express();
const mysql = require('mysql2');
const db = require('./config/dbConnection');
const {promisify} = require('util'); 
const { resolve } = require('path');
const bcrypt = require('bcrypt');
const e = require('express');
let query= promisify(db)




app.set("view-engine", "ejs");
app.use(express.urlencoded({extended: false }))

function hi (){

}


app.get('/css/style.css',(req,res)=>{
  res.sendFile(__dirname +'/views/css/style.css')
})


app.get('/login', (req,res)=>{
res.render('login.ejs',{msg : ''})
})

app.get('/register', (req,res)=>{
  res.render('register.ejs', {msg : ''})
  
  
})

 
app.post('/login' ,async(req,res)=>{
  try{
  ret = await query("SELECT * FROM `users` WHERE email = ? or name = ?",[req.body.username.toLowerCase(), req.body.username.toLowerCase()])
  if(ret.length){
    if(await bcrypt.compare(req.body.password,ret[0].password))
      res.render('index.ejs', {user : ret[0].name})
      else {
        res.render('login.ejs', {msg : 'password incorrect'})
      }
  }
  else {
    res.render('login.ejs',{msg : 'Username / Email Not Found'})
  }
}catch(err){console.log(err)}
})

//! This is an alert
//? this is definition
//Todo this is to do
app.post('/register' ,async(req,res)=>{
  try {
    // getting data from database if theres any email or username are same in database
  ret = await query("SELECT * FROM `users` WHERE email = ? or name = ?",[req.body.email, req.body.name])
  // rendering user if he put username used/email
    if(ret.length){
      res.render('register.ejs', {msg:'sorry try another (email/name)'}) 
    }

  else{
    // Check if pass = repass
    if(req.body.password != req.body.rePassword){
      res.render('register.ejs' , {msg: 'Password dose not rematch '})
    }else{
      // if there is no err then data will be push into users temp
      const hashedPassword = await (bcrypt.hash(req.body.password, 10)) 
    query(
      'insert into `users`(`id`,`name`,`email`,`password`) values (?,?,?,?) ',
      [null,req.body.name.toLowerCase(),req.body.email.toLowerCase(),hashedPassword]
    )
    res.render('login.ejs',{msg : 'success'})
    }
  }
  }catch(err){
    console.log(err)
  }
})



app.listen(2000, (req, res) => {
  console.log("server started on port 2000");
});



 

