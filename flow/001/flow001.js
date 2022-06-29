const express = require("express");
const router = express.Router();
var mongodb = require('./../../function/mongodb');


router.get('/flow001', async (req, res) => {

return  res.json("testflow1");
})


module.exports = router;
