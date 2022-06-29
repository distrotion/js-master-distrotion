const express = require("express");
const router = express.Router();
var mssql = require('./../../function/mssql');
var mongodb = require('./../../function/mongodb');
var httpreq = require('./../../function/axios');
var axios = require('axios');


router.get('/testflow', async (req, res) => {
  // console.log(mssql.qurey())
  console.log(req.body);
  var output = await mssql.qurey(`SELECT * From [test].[dbo].[Table01]`);
  res.json(output);
})

router.post('/login', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  //-------------------------------------
  input = req.body;  //<--------------------------
  output = {}
  if (input.user == "arsa") {
    if (input.password == '1234') {
      output.Status = 'ok';
      output.Roleid = 5;
      output.Name = 'Arsa';
    } else {
      output.Status = 'nok';
    }

  } else {
    output.Status = 'nok';
  }

  // msg.payload = output; //<--------------------------
  //-------------------------------------
  res.json(output);
});

router.post('/logindb', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  input = req.body;
  output = {}
  //-------------------------------------
  var db = await mssql.qurey(`SELECT * From [test].[dbo].[Table01] where [user]='${input.user}'`);
  if (db === `er`) {
    output.Status = 'nok';
    res.json(output);
  }

  console.log(db.recordset);

  if (db.recordset.length > 0) {
    if (input.user === db.recordset[0].user) {
      if (input.password === db.recordset[0].password) {
        output.Status = 'ok';
        output.Roleid = db.recordset[0].Roleid;
        output.Name = db.recordset[0].user;
      } else {
        output.Status = 'nok';
      }
    } else {
      output.Status = 'nok';
    }
  } else {
    output.Status = 'nok';
  }
  console.log(output);
  return res.json(output);
});



router.get('/mongotest', async (req, res) => {

  // var output = await mongodb.insertMany("test","doc01",[{"data":2,"test":"haha"}]);
  // var output = await mongodb.find("test","doc01",{"data":2});
  var upd = await mongodb.update("test", "doc01", { "data": 2 }, { $set: { b: 777 } });
  var output = await mongodb.find("test", "doc01", { "data": 2 });
  return res.json(output)
})

router.get('/testreq', async (req, res) => {

  data = { "test": "haha" }
  var output = await httpreq.post('http://127.0.0.1:7510/testpost', data)
  // var output = await httpreq.get('http://127.0.0.1:7510/testpost')
  return res.send(output)
})


function test(x) {

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

router.get('/posthttptest', async (req, res) => {
  output = '';
   request.post(
        'http://172.101.1.19/API_QcReport/ZBAPI_getZPPIN013_OUT',
        { json: input },
         function  (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body2);
                // if (body2 === 'OK') {
                     output = body;
                // }
            }
        }
    );
  return res.send(`${output}`)
});


router.get('/postaxiostest', async (req, res) => {
  output = '';
  try {
    let resp = await axios.post('http://172.101.1.19/API_QcReport/ZBAPI_getZPPIN013_OUT', {
      "IMP_PRCTR":"24000",
      "IMP_WERKS":"2100",
      "LAST_DATE":"01-01-2022",
      "LAST_TIME":"15:30:10"
    });
    // return resp.data;
    console.log(resp.data);
    if (resp.status == 200) {

      var ret = resp.data.replace(`\"`, '"');
      output = ret;
    }
    // console.log(resp.data)
  } catch (err) {
    throw getError(err);
  }
  return res.send(`${output}`)
})

module.exports = router;

//`SELECT * From [test].[dbo].[Table01]`



