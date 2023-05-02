// const express = require("express");
// const router = express.Router();
// var mongodb = require('../../function/mongodb');
// var mssql = require('../../function/mssql');
// var request = require('request');

// let masterDB = "master_FN";
// let PATTERN = "PATTERN";
// //
// let GRAPH_TABLE = "GRAPH_TABLE";
// let TYPE = "TYPE";
// let UNIT = "UNIT";
// let ITEMs = "ITEMs";
// let MACHINE = "MACHINE";
// let METHOD = "METHOD";
// let INSTRUMENTS = "INSTRUMENTS";
// let RESULTFORMAT = "RESULTFORMAT";
// let SPECIFICATION = "SPECIFICATION";
// let TOLERANCE = "TOLERANCE";
// let GRAPHTYPE = "GRAPHTYPE";
// let CALCULATE = "CALCULATE";
// let LOAD = "LOAD";
// let CORETYPE = "CORETYPE";
// let FREQUENCY = "FREQUENCY";
// let PATTERN_01 = "PATTERN_01";


// router.get('/FINALMASTER', async (req, res) => {
//   return res.json("READY");
// });

// router.post('/INSPECTION_FINAL_GET_STEP1', async (req, res) => {
//   //-------------------------------------
//   console.log("--INSPECTION_FINAL_GET_STEP1--");
//   input = req.body;
//   output2 = [];
//   //-------------------------------------

//   let find2 = await mongodb.find(masterDB, ITEMs, { "activeid": "active_id" });
//   if (find2.length > 0) {
//     for (i = 0; i < find2.length; i++) {
//       output2.push({ "ITEMs": find2[i]['ITEMs'], "RESULTFORMAT": find2[i]['RESULTFORMAT'], "TYPE": find2[i]['TYPE'], "GRAPHTYPE": find2[i]['GRAPHTYPE'], "INTERSECTION": find2[i]['INTERSECTION'], "masterID": find2[i]['masterID'] })
//     }
//   }
//   // console.log("------------");
//   // console.log(find2);
//   // console.log("------------");


//   return res.json({ "ITEMs": output2 });
// });

// router.get('/FINALMASTER', async (req, res) => {
//   return res.json("READY");
// });


// router.post('/LOGIN', async (req, res) => {
//   //-------------------------------------
//   console.log("--GET_MATCPLIST--");
//   input = req.body;
//   output = []
//   //-------------------------------------
//   console.log(input);


//   let find2 = await mongodb.find("SAPdata", "GASGW", {});
//   if (find2.length > 0) {
//     output = find2[0][`data`];
//   }

//   let findP = await mongodb.find(PATTERN, PATTERN_01, {});

//   for (let i = 0; i < output.length; i++) {

//     for (let j = 0; j < findP.length; j++) {
//       if (findP[j]['CP'] === output[i]['CP']) {
//         // console.log(output[i]['CP']);
//         output[i]['STATUS'] = 'Prepare';
//         break;
//       }else{
     
//       }

//     }


//   }


//   return res.json(output);
// });




// module.exports = router;
