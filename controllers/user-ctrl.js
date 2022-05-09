const user = require("../models/user");
const bcrypt = require("bcryptjs");

registerUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(301).json({ msg: "no email or password was sent" });
    }

    const existingUser = user.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with that email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);

    const newUser = new user({
      email: email,
      password: passHash,
      admin: false,
      vouchers: 0,
      idsSaved: [],
    });

    const saveUser = await newUser.save();

    return res.status(200).json({ msg: "Successfully saved!", user: saveUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    var user = await user.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "User doesn't exist please register" });
    }

    const isMatch = await bcrypt.compare(email, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Email or Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        password: user.password,
        idsSaved: user.idsSaved,
        vouchers: user.vouchers,
        admin: user.admin,
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

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
