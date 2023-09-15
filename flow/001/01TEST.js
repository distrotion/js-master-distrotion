const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');


router.get('/TEST', async (req, res) => {
  // console.log(mssql.qurey())
  res.json("TEST");
})

router.post('/TEST', async (req, res) => {
 //-------------------------------------
 console.log("--TEST--");
 console.log(req.body);
 let input = req.body;
 //-------------------------------------


  //-------------------------------------
  res.json(input);
});



module.exports = router;
