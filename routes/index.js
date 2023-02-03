const express = require("express");
const router = express.Router();
const amazItem = require("../models/amazonItem");
const userCnt = require("../controllers/user-ctrl");
const auth = require("../middleware/auth");

//get all amazon items in database
router.post("/items", async (req, res) => {
  const pageSize = 4;
  const pageNumber = req.query.pageNumber;
  var t = pageNumber - 1;
  if (pageNumber === 1) {
    t = 0;
  }
  const items = await amazItem
    .find({})
    .skip(t * pageSize)
    .limit(pageSize);

  res.send({ success: true, items: items });
});

// router.post("/user", async (req, res) => {
//   const user = await user
// });

router.post("/registerUser", userCnt.registerUser);
router.post("/checkToken", userCnt.checkToken);
router.get("/loginwithjwt", userCnt.loginWithJwt);
router.get("/", auth.auth, userCnt.getUser);
router.post("/login", userCnt.loginUser);
router.post("/sendMail", userCnt.sendEmail);

module.exports = router;
