const express = require('express');
app = express();


app.get('/', (req,res) =>{
  res.status(200).send("Welcome to my application!");
})
app.get('/users',(req,res) =>{
  res.status(200).send("welcome to users page!");
})
app.listen(4080, function (){
  console.log('server is listening of port 4080');
} 
)