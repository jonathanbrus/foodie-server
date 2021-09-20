const bcrypt = require("bcrypt");
const client = require("twilio")(
  "ACd6ce0c29f9be6349ce11bd48adaf8c9f",
  "8cc5796af8bee3896046401fa636afc4"
);
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

    const authToken = generateToken(existingUser._id, existingUser.email);

    res.json({
      statusCode: 200,
      message: "User authenticated",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        primeMember: true,
        userAddress: existingUser.userAddress.map((address) => {
          return {
            fullName: address.fullName,
            phone: "6380582919",
            pincode: address.pincode,
            address: "Retchagar street",
            city: address.city,
            state: address.state,
          };
        }),
      },
      authToken: authToken,
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

    const authToken = generateToken(newUser._id, newUser.email);

    res.status(201).json({
      message: "User created.",
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        primeMember: true,
        userAddress: newUser.userAddress.map((address) => {
          return {
            fullName: address.fullName,
            phone: address.phone,
            pincode: address.pincode,
            address: address.street,
            city: address.city,
            state: address.state,
          };
        }),
      },
      authToken: authToken,
    });
  } catch (e) {
    res.json(e);
  }
};

const checkIfUserExist = async (req, res, nex) => {
  try {
    const userExist = users.findOne({ phone: req.body.phone });

    if (!userExist) {
      throw error(404, "User does not exist.");
    }
    res.json({
      statusCode: 200,
      userExist: true,
      userId: userExist._id,
      phone: userExist.phone,
    });
  } catch (e) {
    res.json(e);
  }
};

const verifyOtp = async () => {
  try {
    // client.verify
  } catch (e) {
    res.json(e);
  }
};

const changePassword = async (req, res, nex) => {
  const { userId, password } = req.body;
  try {
    const findUser = await users.findById(userId);

    if (!finduser) {
      throw error(404, "User does not exist");
    }

    const hashed = bcrypt.hashSync(password, 10);

    findUser.password = hashed;

    findUser.save();

    res.json({
      statusCode: 200,
      message: "Succesfully changed password",
    });
  } catch (e) {
    res.json(e);
  }
};

module.exports = {
  signIn: signIn,
  signUp: signUp,
  checkIfUserExist: checkIfUserExist,
  verifyOtp: verifyOtp,
  changePassword: changePassword,
};
