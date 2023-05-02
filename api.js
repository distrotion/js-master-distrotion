const express = require("express");
const router = express.Router();


// router.use(require("./flow/001/00LOGIN"))
router.use(require("./flow/001/02MASTER_FINAL"))
// router.use(require("./flow/003/flow003"))
router.use(require("./flow/001/04MATCPlist"))
router.use(require("./flow/001/05-01-INS_STD_MASTER"))
router.use(require("./flow/001/05-02-INS_STD_IC"))
router.use(require("./flow/001/05-04-INS_STD_FN"))

// router.use(require("./flow/003/flow003"))
// router.use(require("./flow/004/flow004"))
// router.use(require("./flow/005/flow005"))
router.use(require("./flow/login/login"))
router.use(require("./flow/testflow/testflow"))

module.exports = router;

