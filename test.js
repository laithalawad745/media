var express = require('express');  
const port =  process.env.PORT || 3000
var app = express();  
mysql  = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'media'
  });
app.use (express.json())

app.use(express.urlencoded());

app.use(express.static('public'))


app.get('/form',(req,res)=>{  
res.sendFile(__dirname +'/public/index.html')

});  

app.post('/formPost',(req,res)=>{
    
    let x = (req.body)

    const sqlInsert =
    "INSERT INTO `test`(`ID`, `Name`, `Price`) VALUES (?,?,?)";
  db.query(
    sqlInsert,
    [null,x.service ,x.price ],
    (err, result) => {
      if (err) console.log(err) ;

      console.log("record added");
    }
  );
    res.sendStatus(200)

})


  
//   // // simple query
//   db.query(
//      ' SELECT * FROM `services` ',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       // fields contains extra meta data about results, if available
//     }
//   );
  
  // // with placeholder
  // // connection.query(
  // // 'SELECT * FROM `admins`' ,
  // //   ['Page', 45],
  // //   function(err, results) {
  // //     console.log(results);
  // //   }
  // // );
  
  

  
  
  
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})