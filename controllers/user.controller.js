const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide all fields",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!user) {
      return res.status(500).json({
        message: "Couldn't create user",
      });
    }

    res.status(201).json({
      success: true,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Provide Id",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "Couldn't find user",
      });
    }

    res.status(200).json({
      success: true,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

module.exports = {
  createUser,
  getUser,
};
