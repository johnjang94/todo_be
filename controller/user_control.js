const User = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("you already have an account");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "successful!" });
  } catch (error) {
    res.status(400).json({ status: "error", error });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(
      { email },
      "-_id -createdAt -updatedAt -__v"
    );
    console.log("user", user);
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success!", user, token });
      }
    }
    throw new Error("ID and password do not match.");
  } catch (error) {
    res.status(400).json({ status: "failed", error });
  }
};

module.exports = userController;
