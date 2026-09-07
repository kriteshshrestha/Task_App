const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registercontroller = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    if (!username || !email || !password || !phone) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }

    const existing = await usermodel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "your ac has already registerd please login",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await usermodel.create({
      username,
      email,
      password: hashedpassword,
      phone,
      address,
    });
    res.status(201).send({
      success: true,
      message: "successfully registerd",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register api",
      error,
    });
  }
};

const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "enter email and password",
      });
    }

    const user = await usermodel.findOne({ email: email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credential",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login succesfull",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "error in login api",
      error,
    });
  }
};

const logoutcontroller = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in logout API",
      error,
    });
  }
};

module.exports = {
  registercontroller,
  logincontroller,
  logoutcontroller,
};

module.exports = { registercontroller, logincontroller, logoutcontroller };
