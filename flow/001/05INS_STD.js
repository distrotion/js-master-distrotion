const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');

let masterDB = "master_FN";
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


router.get('/FINALMASTER', async (req, res) => {
  return res.json("READY");
});

router.post('/INSPECTION_FINAL_GET_STEP1', async (req, res) => {
  //-------------------------------------
  console.log("--INSPECTION_FINAL_GET_STEP1--");
  input = req.body;
  output2 = [];
  //-------------------------------------

  let find2 = await mongodb.find(masterDB, ITEMs, { "activeid": "active_id" });
  if (find2.length > 0) {
    for (i = 0; i < find2.length; i++) {
      output2.push({ "ITEMs": find2[i]['ITEMs'], "RESULTFORMAT": find2[i]['RESULTFORMAT'], "TYPE": find2[i]['TYPE'], "GRAPHTYPE": find2[i]['GRAPHTYPE'], "INTERSECTION": find2[i]['INTERSECTION'], "masterID": find2[i]['masterID'] })
    }
  }
  // console.log("------------");
  // console.log(find2);
  // console.log("------------");


  return res.json({ "ITEMs": output2 });
});

router.get('/FINALMASTER', async (req, res) => {
  return res.json("READY");
});

router.post('/INSPECTION_FINAL_GET_STEP2', async (req, res) => {
  //-------------------------------------
  console.log("--INSPECTION_FINAL_GET_STEP2--");
  input = req.body;
  let RESULTFORMATdata = "";
  let TYPEdata = "";
  let output3 = [];
  let output4 = [];
  let output5 = [];
  let output6 = [];
  let output7 = [];
  let output8 = [];
  let output9 = [];
  let output10 = [];
  //-------------------------------------
  if (input[`ITEMs`] != undefined) {

    let ITEMsdata = await mongodb.find(masterDB, ITEMs, { "masterID": input['ITEMs'], "activeid": "active_id" });
    RESULTFORMATdata = ITEMsdata[0][`RESULTFORMAT`];
    TYPEdata = ITEMsdata[0][`TYPE`];


    let MACHINEdata = await mongodb.find(masterDB, MACHINE, { "activeid": "active_id" });
    let find3 = await mongodb.find(masterDB, METHOD, { "ITEMs": input['ITEMs'], "activeid": "active_id" });
    if (find3.length > 0) {
      for (i = 0; i < find3.length; i++) {
        let MC = "";
        for (j = 0; j < MACHINEdata.length; j++) {
          if (MACHINEdata[j][`masterID`] === find3[i][`METHOD`]) {
            MC = MACHINEdata[j][`METHOD`];
            break;
          }
        }
        output3.push({ "METHOD": MC, "masterID": MACHINEdata[j][`masterID`] });
      }
    }

    let find4 = await mongodb.find(masterDB, LOAD, {});
    if (find4.length > 0) {
      for (i = 0; i < find4.length; i++) {
        output4.push({ "LOAD": find4[i]['value'], "masterID": find4[i]['value'] })
      }
    }

    let find5 = await mongodb.find(masterDB, CORETYPE, {});
    if (find5.length > 0) {
      for (i = 0; i < find5.length; i++) {
        output5.push({ "CORETYPE": find5[i]['value'], "masterID": find5[i]['value'] })
      }
    }

    let find6 = await mongodb.find(PATTERN, GRAPH_TABLE, {});
    if (find6.length > 0) {
      for (i = 0; i < find6.length; i++) {
        output6.push({ "GT": find6[i]['NO'], "masterID": find6[i]['NO'] })
      }
    }

    let find7 = await mongodb.find(masterDB, UNIT, { "TYPE": TYPEdata, "activeid": "active_id" });
    if (find7.length > 0) {
      for (i = 0; i < find7.length; i++) {

        output7.push({ "UNIT": find7[i]['UNIT'], "masterID": find7[i]['masterID'] })
      }
    }

    let find8 = await mongodb.find(masterDB, FREQUENCY, {});
    if (find8.length > 0) {
      for (i = 0; i < find8.length; i++) {
        output8.push({ "FREQUENCY": find8[i]['value'], "masterID": find8[i]['value'] })
      }
    }

    let find9 = await mongodb.find(masterDB, CALCULATE, { "activeid": "active_id" });
    if (find9.length > 0) {
      console.log(find9)
      for (i = 0; i < find9.length; i++) {
        output9.push({ "CALCULATE": find9[i]['CALCULATE'], "masterID": find9[i]['masterID'] })
      }
    }

    let find10 = await mongodb.find(masterDB, SPECIFICATION, { "ITEMs": input[`ITEMs`], "activeid": "active_id" });
    if (find10.length > 0) {
      for (i = 0; i < find10.length; i++) {
        output10.push({ "SPECIFICATION": find10[i]['SPECIFICATION'], "masterID": find10[i]['masterID'] })
      }
    }




  }

  return res.json({ "RESULTFORMATdata": RESULTFORMATdata, "METHOD": output3, "LOAD": output4, "CORETYPE": output5, "GT": output6, "UNIT": output7, "FREQUENCY": output8, "CALCULATE": output9, "SPECIFICATION": output10 });

});

router.post('/GET_DOCUMENT', async (req, res) => {
  //-------------------------------------
  console.log("--GET_DOCUMENT--");
  input = req.body;
  output = { "DOCUMENT": "" }
  //-------------------------------------
  console.log(input);

  if (input['METHODid'] != undefined) {
    let find2 = await mongodb.find(masterDB, METHOD, { "METHOD": `${input['METHODid']}`, "activeid": "active_id" });
    if (find2.length > 0) {
      output[`DOCUMENT`] = find2[0][`DOCUMENTSM`];
    }
  }

  return res.json(output);
});

router.post('/GET_CALCULATE', async (req, res) => {
  //-------------------------------------
  console.log("--GET_CALCULATE--");
  input = req.body;
  output = {}
  //-------------------------------------
  console.log(input);

  if (input['CALid'] != undefined) {
    let find2 = await mongodb.find(masterDB, CALCULATE, { "masterID": `${input['CALid']}`, "activeid": "active_id" });
    if (find2.length > 0) {

      output = find2[0];
    }
  }

  return res.json(output);
});

router.post('/GET_MATCP_DATA', async (req, res) => {
  //-------------------------------------
  console.log("--GET_MATCP_DATA--");
  input = req.body;
  output = []
  //-------------------------------------
  console.log(input);

  let findTYPE = await mongodb.find(masterDB, TYPE, {});
  let findITEMs = await mongodb.find(masterDB, ITEMs, {});
  let findCALCULATE = await mongodb.find(masterDB, CALCULATE, {});
  let findMACHINE = await mongodb.find(masterDB, MACHINE, {});
  let findUNIT = await mongodb.find(masterDB, UNIT, {});
  let findSPECIFICATION = await mongodb.find(masterDB, SPECIFICATION, {});


  if (input['MATCP'] != undefined) {
    let find2 = await mongodb.find(PATTERN, PATTERN_01, { "CP": `${input['MATCP']}` });
    // console.log(find2);
    if(find2.length>0){
      output = find2;
    }else{
      output = [{
        "CP":input['MATCP'],
      }]
    }
   
  }
  output[0][`findTYPE`] = findTYPE;
  output[0][`findITEMs`] = findITEMs;
  output[0][`findCALCULATE`] = findCALCULATE;
  output[0][`findMACHINE`] = findMACHINE;
  output[0][`findUNIT`] = findUNIT;
  output[0][`findSPECIFICATION`] = findSPECIFICATION;

  return res.json(output);
});




router.post('/GET_MATCP_DATA', async (req, res) => {
  //-------------------------------------
  console.log("--GET_MATCP_DATA--");
  input = req.body;
  output = []
  //-------------------------------------
  console.log(input);

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

router.post('/INSPECTION_FINAL_GETSPEC', async (req, res) => {
  //-------------------------------------
  console.log("--INSPECTION_FINAL_GETSPEC--");
  let input = req.body;
  let output = []
  //-------------------------------------
  console.log(input);
  if (input[`ITEMs`] != undefined) {
    let findSPECIFICATION = await mongodb.find(masterDB, SPECIFICATION, { "ITEMs": input[`ITEMs`] });
    output = findSPECIFICATION;
  }

  return res.json(output);
});


router.post('/FINAL_SAVE', async (req, res) => {
  //-------------------------------------
  console.log("--FINAL_SAVE--");
  let input = req.body;
  let output = {}
  //-------------------------------------
  console.log(input);
  if (input['CPorder'] != null && input['MASTERdatalist'] != null && input['editedItem_FN'] != null) {
    let findPATTERN = await mongodb.find(PATTERN, PATTERN_01, { "CP": input[`CPorder`]['CP'] });
    if (findPATTERN.length == 0) {
      let out = input['CPorder'];
      let newob = {
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
      };

    
      out[`FINAL`] = [newob]

      let updatePATTERN = await mongodb.insertMany(PATTERN, PATTERN_01, [out] );
      return res.json("ok");

    } else if ('FINAL' in findPATTERN[0]) {


      PATTERN_create_buff = input
      ans = false
      for (i = 0; i < findPATTERN[0].FINAL.length; i++) {
        if (PATTERN_create_buff.editedItem_FN.ITEMs === findPATTERN[0].FINAL[i].ITEMs) {
          ans = true
          break
        }
      }
      if (ans) {
        let input2 = findPATTERN;
        let out = input['CPorder'];
        let CP = input2[0].CP;
        let FINAL = input2[0].FINAL;
        let NEXT_I = i + 1
        let n = NEXT_I;
        var newob = {
          'SEQ': NEXT_I,
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
        };

     

        FINAL[n - 1] = newob;
        out = [{ 'CP': CP }, { $set: { 'FINAL': FINAL } }]
        console.log(out);

        let updatePATTERN = await mongodb.update(PATTERN, PATTERN_01, { 'CP': CP },{ $set: { 'FINAL': FINAL }});
        return res.json("ok");

      } else {
        let input2 = findPATTERN;
        let out = input['CPorder'];
        let CP = input2[0].CP;
        let FINAL = input2[0].FINAL;
        let n = FINAL.length;
        var newob = {
          'SEQ': FINAL.length + 1,
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
        };
        FINAL[n] = newob;
        out = [{ 'CP': CP }, { $set: { 'FINAL': FINAL } }]
        console.log(out);

        let updatePATTERN = await mongodb.update(PATTERN, PATTERN_01, { 'CP': CP },{ $set: { 'FINAL': FINAL }});
        return res.json("ok");

      }

    } else if (('INCOMMING' in findPATTERN[0])) {

      let input2 = findPATTERN;
      let out = input['CPorder'];
      let CP = input2[0].CP;
      let FINAL = input2[0].FINAL;
      
      FINAL=[{
          'SEQ': 1,
          'TYPE':input.MASTERdatalist.TYPE,
          'ITEMs':input.editedItem_FN.ITEMs,
          'RESULTFORMAT':input.MASTERdatalist.RESULTFORMAT,
          'GRAPHTYPE':input.MASTERdatalist.GRAPHTYPE,
          'INTERSECTION':input.MASTERdatalist.INTERSECTION,
          'DOCUMENT':input.editedItem_FN.DOCUMENT,
          'SCMARK':input.editedItem_FN.SCMARK,
          'METHOD':input.editedItem_FN.METHOD,
          'INSTRUMENTS':input.editedItem_FN.INSTRUMENTS,
          'SPECIFICATION':input.editedItem_FN.SPECIFICATION,
          'SPECIFICATIONve':input.editedItem_FN.SPECIFICATIONve,
          'UNIT':input.editedItem_FN.UNIT,
          'POINTPCS':input.editedItem_FN.POINTPCS,
          'POINT':input.editedItem_FN.POINT,
          'PCS':input.editedItem_FN.PCS,
          'FREQUENCY':input.editedItem_FN.FREQUENCY,
          'MODE':input.editedItem_FN.MODE,
          'REMARK':input.editedItem_FN.REMARK,
          'LOAD':input.editedItem_FN.LOAD,
          'CONVERSE':input.editedItem_FN.CONVERSE,
          'GRAPH_TABLE_FN':input.editedItem_FN.GRAPH_TABLE_FN
      }];

      let updatePATTERN = await mongodb.update(PATTERN, PATTERN_01, { 'CP': CP },{ $set: { 'FINAL': FINAL }});
        return res.json("ok");
    }

  }





  return res.json("output");
});


module.exports = router;
