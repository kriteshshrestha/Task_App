const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");

const getusercontroller = async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "user get successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in userdata api",
    });
  }
};

const updateusercontroller = async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const { username, phone, address } = req.body;
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();
    res.status(200).send({
      success: true,
      message: "user update successful",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update user api",
    });
  }
};

const resetpasswordcontroller = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    if (!email || !newpassword) {
      return res.status(500).send({
        success: false,
        message: "enter all the fields",
      });
    }

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);

    user.password = hashedpassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "password reset successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in reset password api",
      error,
    });
  }
};

const updatepasswordcontroller = async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.user.id });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found",
      });
    }
    const { oldpassword, newpassword } = req.body;
    const ismatch = await bcrypt.compare(oldpassword, user.password);
    if (!ismatch) {
      return res.status(500).send({
        success: false,
        message: "invalid old password",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);

    user.password = hashedpassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "user password upated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updatepassword api",
    });
  }
};

const deleteusercontroller = async (req, res) => {
  try {
    const user = await usermodel.findByIdAndDelete(req.params.id);

    if (!user) {
      console.log(error);
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete user API",
      error,
    });
  }
};
module.exports = {
  getusercontroller,
  updateusercontroller,
  resetpasswordcontroller,
  updatepasswordcontroller,
  deleteusercontroller,
};
