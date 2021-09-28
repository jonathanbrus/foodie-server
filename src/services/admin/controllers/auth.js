// helper
const generateToken = require("../../../utils/generateToken");
const error = require("../../../utils/error");

const signIn = async (req, res, nex) => {
  const { email, password } = req.body;

  try {
    const passwordMatched = process.env.ADMIN_PASSWORD === password;

    if (!passwordMatched) {
      throw error(401, "Password does not match, try again.");
    }

    const authToken = generateToken("alogroups", email);

    res.json({
      statusCode: 200,
      message: "Logged In",
      authToken: authToken,
    });
  } catch (e) {
    res.json(e);
  }
};

module.exports = signIn;
