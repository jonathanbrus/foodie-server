const users = require("../../../models/user");

const response = require("../../../utils/response");

const updateProfile = async (req, res, nex) => {
  const { userId, name, email, phone } = req.body;

  try {
    const user = await users.findById(userId);

    if (!user) {
      throw { status: 404, message: "User not found." };
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    res.json(
      response(200, "Updated the profile successfully", {
        userId: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      })
    );
  } catch (e) {
    res.json(response(500, "Something went wrong"));
  }
};

const addAddress = async (req, res, nex) => {
  const { fullName, phone, pincode, city, state, address } = req.body;

  try {
    const user = await users.findById(req.userId);

    if (!user) {
      throw { status: 404, message: "User not found." };
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

    res.json(
      response(200, "Address added successfully", updatedAddresses.addresses)
    );
  } catch (e) {
    res.json(response(e.status, e.message));
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
    res.json(response(500, "Something went wrong"));
  }
};

const changePassword = async (req, res, nex) => {
  const { userId, password } = req.body;
  try {
    const user = await users.findById(userId);

    if (!finduser) {
      throw { status: 404, message: "User does not exist" };
    }

    const hashed = bcrypt.hashSync(password, 10);

    user.password = hashed;
    user.save();

    res.json(response(200, "Succesfully changed password"));
  } catch (e) {
    res.json(response(e.status, e.message));
  }
};

module.exports = {
  updateProfile: updateProfile,
  addAddress: addAddress,
  deleteAddress: deleteAddress,
  changePassword: changePassword,
};
