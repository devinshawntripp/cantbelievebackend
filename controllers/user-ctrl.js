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
      idsSaved: [],
    });

    const saveUser = await newUser.save();

    return res.status(200).json({ msg: "Successfully saved!", user: saveUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
