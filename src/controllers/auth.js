const bcrypt = require("bcrypt");
// model
const users = require("../models/user");
// helper
const generateToken = require("../helpers/generateToken");
const error = require("../helpers/error");

const signIn = async (req, res, nex) => {
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email: email });

    if (!existingUser) {
      throw error(
        404,
        "No user found with the email, try creating an account."
      );
    }

    const isMatched = bcrypt.compareSync(password, existingUser.password);

    if (!isMatched) {
      throw error(401, "Password does not match, try again.");
    }

    const token = generateToken(existingUser._id, existingUser.email);

    res.json({
      message: "User authenticated",
      user: {
        userId: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        userAddress: existingUser.userAddress,
      },
      token: token,
    });
  } catch (e) {
    res.json(e);
  }
};

const signUp = async (req, res, nex) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await users.findOne({ email: email });

    if (existingUser) {
      throw error(406, "User already exists with the same email.");
    }

    const hashed = bcrypt.hashSync(password, 10);

    const newUser = await users.create({
      name: name,
      email: email,
      phone: phone,
      password: hashed,
    });

    const token = generateToken(newUser._id, newUser.email);

    res.status(201).json({
      message: "User created.",
      user: {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        userAddress: newUser.userAddress,
      },
      token: token,
    });
  } catch (e) {
    res.json(e);
  }
};

module.exports = {
  signIn: signIn,
  signUp: signUp,
};
