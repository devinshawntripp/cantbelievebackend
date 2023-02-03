const express = require("express");
const router = express.Router();
const amazItem = require("../models/amazonItem");
const amazItemCntrl = require("../controllers/amazItem-ctrl");
const auth = require("../middleware/auth");

router.post("/AddProduct", auth.isAdmin, amazItemCntrl.addProduct);
router.post("/deleteItem", auth.isAdmin, amazItemCntrl.deleteProduct);
router.post("/UpdateItem", auth.isAdmin, amazItemCntrl.updateItem);
router.post("/saveProduct", auth.auth, amazItemCntrl.saveProductToUser);

module.exports = router;
