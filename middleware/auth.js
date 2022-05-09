const jwt = require("jsonwebtoken");

/* 

    Middleware function that you will commonly see between the  '/whatever' and the 
    function call UserCtrl.functioncall. It will do the call then run this code after.


    This codes functionality is to return whether or not they have a valid "jwt" or json web token.
    If it is valid then it will call the next() function which will move to the function to the right
    of auth(). So an example would be UserCtrl.getusers.



*/
const auth = (req, res, next) => {
  try {
    //get the token from the request header and check if it exists
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token found, auth denied." });
    }

    //If there is data in that x-auth-token, verify that token with the hashed environment password
    //(they should match when running the verify() function)
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //verified will equal true or false signifying that a user is infact either logged in or not logged in.
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, auth denied." });
    }

    req.id = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
