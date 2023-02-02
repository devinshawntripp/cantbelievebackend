const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");

registerUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(301).json({ msg: "no email or password was sent" });
    }

    const existingUser = await user.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with that email already exists please sign in" });
    }

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);

    const newUser = new user({
      email: email,
      password: passHash,
      role: "user",
      vouchers: 0,
      idsSaved: [],
    });

    const saveUser = await newUser.save();

    return res.status(200).json({ msg: "Successfully saved!", user: saveUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

/**
 *
 * login the user and check for google auth
 */
loginUser = async (req, res) => {
  try {
    const { email, password, jwtGoogleCred } = req.body;
    /**
     * check if a google user
     */
    if (jwtGoogleCred !== undefined && jwtGoogleCred !== "") {
      console.log(jwtGoogleCred);
      const decodedObj = jwt.decode(jwtGoogleCred);
      const existingUser = await user.findOne({ email: decodedObj.email });
      if (!existingUser) {
        //create a user using googles "sub"
        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(decodedObj.sub, salt);

        const newUser = new user({
          email: decodedObj.email,
          password: passHash,
          role: "user",
          vouchers: 0,
          idsSaved: [],
        });

        const saveUser = await newUser.save();

        return res
          .status(200)
          .json({ msg: "Successfully saved!", user: saveUser });
      } else {
        if (existingUser.password != "") {
          const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            {
              expiresIn: "10m",
            }
          );

          return res.json({
            token,
            user: {
              id: existingUser._id,
              email: existingUser.email,
              idsSaved: existingUser.idsSaved,
              vouchers: existingUser.vouchers,
              role: existingUser.role,
            },
          });
        }
      }

      return res.status(500).json({ msg: "google" });
    }

    const existingUser = await user.findOne({ email: email });
    console.log(existingUser);
    console.log("END EMAIL");

    if (!existingUser) {
      return res
        .status(400)
        .json({ msg: "User doesn't exist please register" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Email or Password is incorrect" });
    }

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    return res.json({
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
        // password: existingUser.password,
        idsSaved: existingUser.idsSaved,
        vouchers: existingUser.vouchers,
        role: existingUser.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

getUser = async (req, res) => {
  var user = await user.findById(req.id);
  if (!user) {
    return res.json({ msg: "user not found" });
  } else {
    return res.json({
      name: user.email,
      id: user._id,
      admin: user.admin,
    });
  }
};

loginWithJwt = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(301)
        .json({ msg: "There is not token passed in the header" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const existingUser = await user.findById(verified.id);
    if (!existingUser) {
      return res
        .status(500)
        .json({ msg: "User does not exist with current token" });
    }

    return res
      .status(200)
      .json({ msg: "Decoded Successfully", user: existingUser });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

checkToken = async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    console.log("Before: token exists");
    if (!token) {
      return res.json(false);
    }

    console.log("Before: token verify");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    console.log("Before: check user");

    const decoded = parseJwt(token);
    console.log(decoded);
    var existingUser = await user.findById(verified.id);
    if (!existingUser) {
      return res.json(false);
    }

    if (decoded.exp == undefined) {
      return res.json(false);
    }
    console.log("End: check user");

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

sendEmail = async (req, res) => {
  try {
    console.log(req.body);
    new AWS.SES({
      apiVersion: "2010-12-01",
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_SECRET_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    })
      .sendEmail(req.body.options)
      .promise()
      .then((response) => {
        console.log(response);
        res.status(200).json({ msg: response });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: err.message });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  checkToken,
  loginWithJwt,
  sendEmail,
};
