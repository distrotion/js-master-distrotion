const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');

let masterDB_FN = "master_FN";
let masterDB_IC = "master_IC";
let PATTERN = "PATTERN";
//
let GRAPH_TABLE = "GRAPH_TABLE";
let TYPE = "TYPE";
let UNIT = "UNIT";
let ITEMs = "ITEMs";
let MACHINE = "MACHINE";
let METHOD = "METHOD";
let INSTRUMENTS = "INSTRUMENTS";
let RESULTFORMAT = "RESULTFORMAT";
let SPECIFICATION = "SPECIFICATION";
let TOLERANCE = "TOLERANCE";
let GRAPHTYPE = "GRAPHTYPE";
let CALCULATE = "CALCULATE";
let LOAD = "LOAD";
let CORETYPE = "CORETYPE";
let FREQUENCY = "FREQUENCY";
let PATTERN_01 = "PATTERN_01";





// router.post('/GET_MATCP_DATA', async (req, res) => {
//   //-------------------------------------
//   console.log("--GET_MATCP_DATA--");
//   input = req.body;
//   output = []
//   //-------------------------------------
//   console.log(input);

//   return res.json(output);
// });

router.post('/GET_MATCP_DATA', async (req, res) => {
  //-------------------------------------
  console.log("--GET_MATCP_DATA--");
  input = req.body;
  output = []
  //-------------------------------------
  console.log(input);

  let findTYPE_FN = await mongodb.find(masterDB_FN, TYPE, {});
  let findITEMs_FN = await mongodb.find(masterDB_FN, ITEMs, {});
  let findCALCULATE_FN = await mongodb.find(masterDB_FN, CALCULATE, {});
  let findMACHINE_FN = await mongodb.find(masterDB_FN, MACHINE, {});
  let findUNIT_FN = await mongodb.find(masterDB_FN, UNIT, {});
  let findSPECIFICATION_FN = await mongodb.find(masterDB_FN, SPECIFICATION, {});


  let findTYPE_IC = await mongodb.find(masterDB_IC, TYPE, {});
  let findITEMs_IC = await mongodb.find(masterDB_IC, ITEMs, {});
  let findCALCULATE_IC = await mongodb.find(masterDB_IC, CALCULATE, {});
  let findMACHINE_IC = await mongodb.find(masterDB_IC, MACHINE, {});
  let findUNIT_IC = await mongodb.find(masterDB_IC, UNIT, {});
  let findSPECIFICATION_IC = await mongodb.find(masterDB_IC, SPECIFICATION, {});




  if (input['MATCP'] != undefined) {
    let find2 = await mongodb.find(PATTERN, PATTERN_01, { "CP": `${input['MATCP']}` });
    // console.log(find2);
    if (find2.length > 0) {
      output = find2;
    } else {
      output = [{
        "CP": input['MATCP'],
      }]
    }

  }
  output[0][`findTYPE_FN`] = findTYPE_FN;
  output[0][`findITEMs_FN`] = findITEMs_FN;
  output[0][`findCALCULATE_FN`] = findCALCULATE_FN;
  output[0][`findMACHINE_FN`] = findMACHINE_FN;
  output[0][`findUNIT_FN`] = findUNIT_FN;
  output[0][`findSPECIFICATION_FN`] = findSPECIFICATION_FN;


  output[0][`findTYPE_IC`] = findTYPE_IC;
  output[0][`findITEMs_IC`] = findITEMs_IC;
  output[0][`findCALCULATE_IC`] = findCALCULATE_IC;
  output[0][`findMACHINE_IC`] = findMACHINE_IC;
  output[0][`findUNIT_IC`] = findUNIT_IC;
  output[0][`findSPECIFICATION_IC`] = findSPECIFICATION_IC;

  return res.json(output);
});

router.post('/GET_MATCP_SETDATA', async (req, res) => {
  //-------------------------------------
  console.log("--GET_MATCP_SETDATA--");
  let input = req.body;
  let output = {}
  //-------------------------------------
  console.log(input);
  if (input['CPorder'] != undefined) {
    let PATTERNfindDATA = await mongodb.find(PATTERN, PATTERN_01, { "CP": `${input['CPorder']}` });
    // console.log(find2);
    // output = find2;



    if (PATTERNfindDATA.length === 0) {

      out = input.CPorder;

      input[`FINAL`] = [{
        'SEQ': 1,
        'TYPE': input.MASTERdatalist.TYPE,
        'ITEMs': input.editedItem_FN.ITEMs,
        'RESULTFORMAT': input.MASTERdatalist.RESULTFORMAT,
        'GRAPHTYPE': input.MASTERdatalist.GRAPHTYPE,
        'INTERSECTION': input.MASTERdatalist.INTERSECTION,
        'DOCUMENT': input.editedItem_FN.DOCUMENT,
        'SCMARK': input.editedItem_FN.SCMARK,
        'METHOD': input.editedItem_FN.METHOD,
        'INSTRUMENTS': input.editedItem_FN.INSTRUMENTS,
        'SPECIFICATION': input.editedItem_FN.SPECIFICATION,
        'SPECIFICATIONve': input.editedItem_FN.SPECIFICATIONve,
        'UNIT': input.editedItem_FN.UNIT,
        'POINTPCS': input.editedItem_FN.POINTPCS,
        'POINT': input.editedItem_FN.POINT,
        'PCS': input.editedItem_FN.PCS,
        'FREQUENCY': input.editedItem_FN.FREQUENCY,
        'MODE': input.editedItem_FN.MODE,
        'REMARK': input.editedItem_FN.REMARK,
        'LOAD': input.editedItem_FN.LOAD,
        'CONVERSE': input.editedItem_FN.CONVERSE,
        'GRAPH_TABLE_FN': input.editedItem_FN.GRAPH_TABLE_FN
      }]
    } else {
      //
    }


  }

  return res.json(output);
});



router.post('/PIC_UPLOAD', async (req, res) => {
  //-------------------------------------
  console.log("--PIC_UPLOAD--");
  let input = req.body;
  let output = {}
  //-------------------------------------
  // console.log(input);
  if (input['CPorder'] != null && input['PIC'] != null) {

    let findPATTERN = await mongodb.find(PATTERN, PATTERN_01, { "CP": input[`CPorder`]['CP'] });
    console.log(findPATTERN);
    if (findPATTERN.length == 0) {

      return res.json("nok");

    } else {

      let input2 = findPATTERN;
      let out = input['CPorder'];
      let CP = input2[0].CP;

      let updatePATTERN = await mongodb.update(PATTERN, PATTERN_01, { 'CP': CP }, { $set: { 'Pimg': { "P1": input['PIC'] } } });
      return res.json("ok");
    }

  }

  return res.json("output");
});








module.exports = router;
