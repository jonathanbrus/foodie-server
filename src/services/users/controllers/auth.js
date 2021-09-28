const bcrypt = require("bcrypt");

// model
const users = require("../../../models/user");

// helper
const generateToken = require("../../../utils/generateToken");
const error = require("../../../utils/error");

const signIn = async (req, res, nex) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email: email });

    if (!user) {
      throw error(
        404,
        "No user found with the email, try creating an account."
      );
    }

    const passwordMatched = bcrypt.compareSync(password, user.password);

    if (!passwordMatched) {
      throw error(401, "Password does not match, try again.");
    }

    const authToken = generateToken(user._id, user.email);

    res.json({
      statusCode: 200,
      message: "User authenticated",
      user: {
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        phone: user.phone,
        phoneVerified: user.phoneVerified,
        primeMember: user.primeMember,
        addresses: user.addresses.map((address) => {
          return {
            fullName: address.fullName,
            phone: address.phone || address.phoneNo,
            pincode: address.pincode,
            address: address.address || address.street,
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
    const user = await users.findOne({ email: email });

    if (user) {
      throw error(406, "User already exists with the same email.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await users.create({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });

    const authToken = generateToken(newUser._id, newUser.email);

    res.json({
      statusCode: 201,
      message: "User created.",
      user: {
        name: newUser.name,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
        phone: newUser.phone,
        phoneVerified: newUser.phoneVerified,
        primeMember: newUser.primeMember,
        addresses: newUser.addresses.map((address) => {
          return {
            fullName: address.fullName,
            phone: address.phone,
            pincode: address.pincode,
            address: address.address,
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

module.exports = {
  signIn: signIn,
  signUp: signUp,
};
