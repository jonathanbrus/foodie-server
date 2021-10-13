const orders = require("../../../models/order");

const get = async (req, res, nex) => {
  const { count } = req.query;
  try {
    const allOrders = await orders.find();

    res.json({
      message: "Fetched all orders",
      allOrders: allOrders.reverse().splice(0, count),
      totalOrders: allOrders.length,
    });
  } catch (e) {
    console.log(e);
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

    fetched.taxAmount = other.taxPrice || fetched.taxAmount;
    fetched.deliveryCharge = other.deliveryPrice || fetched.deliveryCharge;
    fetched.totalAmount = other.totalPrice || fetched.totalAmount;

    const updated = await fetched.save();

    res.json({
      message: "Updated order successfully.",
      updated: updated,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  get: get,
  update: update,
};
