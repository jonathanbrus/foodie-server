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
  const { fullName, phoneNo, pincode, city, state, doorNo, street } = req.body;

  try {
    const user = await users.findById(req.userId);

    if (!user) {
      throw error(404, "User not found.");
    }

    user.userAddress.push({
      fullName: fullName,
      phoneNo: phoneNo,
      pincode: pincode,
      city: city,
      state: state,
      doorNo: doorNo,
      street: street,
    });

    const addedAddress = await user.save();

    res.json({
      message: "Added user address",
      addedAddress: {
        id: addedAddress.userAddress[addedAddress.userAddress.length - 1]._id,
        fullName: fullName,
        phoneNo: phoneNo,
        pincode: pincode,
        city: city,
        state: state,
        doorNo: doorNo,
        street: street,
      },
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
      user.userAddress.splice(Number(index), 1);

      const updated = await user.save();
    }

    res.json({
      message: "deleted user address",
    });
  } catch (e) {
    console.log(e);
  }
};

const changePassword = (req, res, nex) => {};

module.exports = {
  updateProfile: updateProfile,
  addAddress: addAddress,
  deleteAddress: deleteAddress,
  changePassword: changePassword,
};
