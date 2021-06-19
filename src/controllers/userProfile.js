const users = require("../models/user");
// helper
const error = require("../helpers/error");

const updateProfile = async (req, res, nex) => {
  const { userId, name, email, phone, userAddress } = req.body;

  try {
    const user = await users.findById(userId);

    if (!user) {
      throw error(404, "User not found.");
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.userAddress = userAddress || user.userAddress;

    const updatedUser = await user.save();

    res.json({
      message: "Updated the profile successfully",
      user: {
        userId: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        userAddress: updatedUser.userAddress,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const addAddress = (req, res, nex) => {};

const changePassword = (req, res, nex) => {};

module.exports = {
  updateProfile: updateProfile,
  addAddress: addAddress,
  changePassword: changePassword,
};
