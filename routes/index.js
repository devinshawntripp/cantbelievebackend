const express = require("express");
const router = express.Router();
const amazItem = require("../models/amazonItem");
const userCnt = require("../controllers/user-ctrl");
const auth = require("../middleware/auth");

//get all amazon items in database
router.get("/items", async (req, res) => {
  const items = await amazItem.find({});
  res.send({ success: true, items: items });
});

// router.post("/user", async (req, res) => {
//   const user = await user
// });

router.post("/registerUser", userCnt.registerUser);
router.get("/", auth, userCnt.getUser);
router.get("/login", userCnt.loginUser);

module.exports = router;
