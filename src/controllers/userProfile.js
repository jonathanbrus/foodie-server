const users = require("../models/user");

// helper
const error = require("../helpers/error");

const updateProfile = async (req, res, nex) => {
  const { userId, name, email, phone } = req.body;

  try {
    const user = await users.findById(userId);

    if (!user) {
      throw error(404, "User not found.");
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    res.json({
      message: "Updated the profile successfully",
      user: {
        userId: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const addAddress = async (req, res, nex) => {
  const { fullName, phone, pincode, city, state, address } = req.body;

  console.log(req.body);

  try {
    const user = await users.findById(req.userId);

    if (!user) {
      throw error(404, "User not found.");
    }

    user.userAddress.push({
      fullName: fullName,
      phone: phone,
      pincode: pincode,
      city: city,
      state: state,
      address: address,
    });

    const addedAddress = await user.save();

    res.json({
      message: "Added user address",
      addresses: addedAddress.userAddress,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteAddress = async (req, res, nex) => {
  const { index } = req.body;

  console.log(index);

  try {
    const user = await users.findById(req.userId);

    if (index > -1) {
      user.userAddress.splice(Number(index), 1);

      const updated = await user.save();

      res.json({
        message: "deleted user address",
        addresses: updated.userAddress,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  updateProfile: updateProfile,
  addAddress: addAddress,
  deleteAddress: deleteAddress,
};
