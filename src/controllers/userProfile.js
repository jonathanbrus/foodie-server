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

  try {
    const user = await users.findById(req.userId);

    if (!user) {
      throw error(404, "User not found.");
    }

    user.addresses.push({
      fullName: fullName,
      phone: phone,
      pincode: pincode,
      city: city,
      state: state,
      address: address,
    });

    const updatedAddresses = await user.save();

    res.json({
      message: "Address added successfully",
      addresses: updatedAddresses.addresses,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteAddress = async (req, res, nex) => {
  const { index } = req.body;

  try {
    const user = await users.findById(req.userId);

    if (index > -1) {
      user.addresses.splice(Number(index), 1);

      const updatedAddresses = await user.save();

      res.json({
        message: "Address deleted successfully",
        addresses: updatedAddresses.addresses,
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
