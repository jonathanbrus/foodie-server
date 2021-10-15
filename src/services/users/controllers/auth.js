const bcrypt = require("bcrypt");

// model
const users = require("../../../models/user");

// helper
const generateToken = require("../../../utils/generateToken");
const response = require("../../../utils/response");

const signIn = async (req, res, nex) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email: email });

    if (!user) {
      throw {
        status: 404,
        message: "No user found with the email, try creating an account.",
      };
    }

    const passwordMatched = bcrypt.compareSync(password, user.password);

    if (!passwordMatched) {
      throw { status: 401, message: "Password does not match, try again." };
    }

    const authToken = generateToken(user._id, user.email);

    res.json(
      response(200, "User authenticated", {
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
        authToken: authToken,
      })
    );
  } catch (e) {
    res.json(response(e.status, e.message));
  }
};

const signUp = async (req, res, nex) => {
  const { name, email, phone, password } = req.body;

  try {
    const user = await users.findOne({ email: email });

    if (user) {
      throw {
        status: 406,
        messagse: "User already exists with the same email.",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await users.create({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });

    const authToken = generateToken(newUser._id, newUser.email);

    res.json(
      response(201, "User created.", {
        name: newUser.name,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
        phone: newUser.phone,
        phoneVerified: newUser.phoneVerified,
        primeMember: newUser.primeMember,
        addresses: newUser.addresses,
        authToken: authToken,
      })
    );
  } catch (e) {
    res.json(response(e.state, e.message));
  }
};

module.exports = {
  signIn: signIn,
  signUp: signUp,
};
