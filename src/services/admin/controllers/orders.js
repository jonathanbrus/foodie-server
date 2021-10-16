const orders = require("../../../models/order");
const response = require("../../../utils/response");

const get = async (req, res, nex) => {
  const { count } = req.query;
  try {
    const allOrders = await orders.find({}, null, {
      sort: { createdAt: -1 },
      limit: Number(count),
    });

    res.json(response(200, "Fetched all orders", allOrders));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const update = async (req, res, nex) => {
  const { id, paid, orderStatus, other } = req.body;

  try {
    const fetched = await orders.findById(id);

    if (!fetched) {
      throw error(404, "Order not found.");
    }

    fetched.paid = paid;
    fetched.orderStatus = orderStatus || fetched.orderStatus;

    fetched.food = other.isFood || fetched.food;
    fetched.packingCharge = other.packagingCharge || fetched.packingCharge || 0;
    fetched.taxAmount = other.taxPrice || fetched.taxAmount;
    fetched.deliveryCharge = other.deliveryPrice || fetched.deliveryCharge;
    fetched.totalAmount = other.totalPrice || fetched.totalAmount;

    const updated = await fetched.save();

    res.json(response(200, "Updated order successfully.", updated));
  } catch (e) {
    console.log(e);
    res.json(response(500, "Something went wrong, try again later"));
  }
};

module.exports = {
  get: get,
  update: update,
};
