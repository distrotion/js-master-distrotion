const express = require("express");
const router = express.Router();
var mssql = require('./../../function/mssql');
var mongodb = require('./../../function/mongodb');
var httpreq = require('./../../function/axios');


router.get('/testflow', async (req, res) => {
  // console.log(mssql.qurey())
  console.log(req.body);
  var output = await mssql.qurey(`SELECT * From [test].[dbo].[Table01]`);
    res.json(output);
})

router.post('/login',async (req,res) => {
  //-------------------------------------
  console.log(req.body);
  //-------------------------------------
  input = req.body;  //<--------------------------
  output = {}
  if(input.user == "arsa"){
      if(input.password == '1234'){
          output.Status =  'ok';
          output.Roleid =  5;
          output.Name =  'Arsa';
      }else{
          output.Status =  'nok';
      }
      
  }else{
          output.Status =  'nok';
  }
  
  // msg.payload = output; //<--------------------------
  //-------------------------------------
    res.json(output);
});

router.post('/logindb',async (req,res) => {
  //-------------------------------------
  console.log(req.body);
  input = req.body; 
  output = {}
  //-------------------------------------
  var db = await mssql.qurey(`SELECT * From [test].[dbo].[Table01] where [user]='${input.user}'`);
  if(db === `er`){
    output.Status =  'nok';
    res.json(output);
  }
  
  console.log(db.recordset);

  if(db.recordset.length > 0){
    if(input.user === db.recordset[0].user){
      if(input.password === db.recordset[0].password){
        output.Status =  'ok';
        output.Roleid =  db.recordset[0].Roleid;
        output.Name =  db.recordset[0].user;
      }else{
        output.Status =  'nok'; 
      } 
    }else{
        output.Status =  'nok';
    }
  }else{
    output.Status =  'nok';
  }
  console.log(output);
  res.json(output);
});


 
 router.get('/mongotest', async (req, res) => {
   
   // var output = await mongodb.insertMany("test","doc01",[{"data":2,"test":"haha"}]);
   // var output = await mongodb.find("test","doc01",{"data":2});
   var upd = await mongodb.update("test","doc01",{ "data":2 }, { $set: { b: 777 } });
   var output = await mongodb.find("test","doc01",{"data":2});
   res.json(output)
 })
 
router.get('/testreq', async (req, res) => {

    data = {"test":"haha"}
    var output = await httpreq.post('http://127.0.0.1:7510/testpost',data)
    // var output = await httpreq.get('http://127.0.0.1:7510/testpost')
    res.send(output)
})


function test(x){
 
  x++

  return x
}

router.get('/fntest', async (req, res) => {
  out = test(1)
  console.log(out)
  console.log(out2)
  res.send(`${out}`)
})

router.get('/fntest2', async (req, res) => {
  out = test(2)
  console.log(out)
  res.send(`${out}`)
})

module.exports = router;

//`SELECT * From [test].[dbo].[Table01]`



