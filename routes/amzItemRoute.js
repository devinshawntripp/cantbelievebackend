const express = require("express");
const router = express.Router();
const amazItem = require("../models/amazonItem");
const amazItemCntrl = require("../controllers/amazItem-ctrl");

router.post("/AddProduct", amazItemCntrl.addProduct);
router.post("/deleteItem", amazItemCntrl.deleteProduct);
router.post("/saveProduct", amazItemCntrl.saveProductToUser);

module.exports = router;
