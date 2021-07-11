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

  console.log(fullName, phoneNo, pincode, city, state, doorNo, street);
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

    console.log(addedAddress);

    const i = Array(addAddress.userAddress).length - 1;

    res.json({
      message: "Added user address",
      addedAddress: {
        fullName: addedAddress.userAddress[i].fullName,
        phoneNo: addedAddress.userAddress[i].phoneNo,
        pincode: addedAddress.userAddress[i].pincode,
        city: addedAddress.userAddress[i].city,
        state: addedAddress.userAddress[i].state,
        doorNo: addedAddress.userAddress[i].doorNo,
        street: addedAddress.userAddress[i].street,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const changePassword = (req, res, nex) => {};

module.exports = {
  updateProfile: updateProfile,
  addAddress: addAddress,
  changePassword: changePassword,
};
