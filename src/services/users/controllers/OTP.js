const client = require("twilio")(
  "ACd6ce0c29f9be6349ce11bd48adaf8c9f",
  "8cc5796af8bee3896046401fa636afc4"
);

const generateOTP = async (req, res, nex) => {
  try {
    const user = users.findOne({ phone: req.body.phone });

    if (!user) {
      throw error(404, "User does not exist.");
    }

    res.json({
      statusCode: 200,
      user: true,
      userId: user._id,
      phone: user.phone,
    });
  } catch (e) {
    res.json(e);
  }
};

const verifyOTP = async () => {
  try {
    client.verify;
  } catch (e) {
    res.json(e);
  }
};

module.exports = {
  generateOTP: generateOTP,
  verifyOTP: verifyOTP,
};
