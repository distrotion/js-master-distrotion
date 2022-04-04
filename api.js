const express = require("express");
const router = express.Router();

router.use(require("./flow/001/flow001"))
// router.use(require("./flow/002/flow002"))
// router.use(require("./flow/003/flow003"))
// router.use(require("./flow/004/flow004"))
// router.use(require("./flow/005/flow005"))
router.use(require("./flow/testflow/testflow"))

module.exports = router;

