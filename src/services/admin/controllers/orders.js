const orders = require("../../../models/order");

const allOrders = async (req, res, nex) => {
  const { count } = req.query;
  try {
    const allOrder = await orders.find();

    res.json({
      message: "Fetched all orders",
      allOrders: allOrder.reverse().splice(0, count),
      totalOrders: allOrder.length,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateOrder = async (req, res, nex) => {
  const { orderId, isPaid, orderStatus, ifNeeded } = req.body;

  try {
    const order = await orders.findById(orderId);

    if (!order) {
      throw error(404, "Order not found.");
    }

    order.isPaid = isPaid || order.isPaid;
    order.orderStatus = orderStatus || order.orderStatus;

    order.taxAmount = ifNeeded.taxPrice || order.taxAmount;
    order.deliveryCharge = ifNeeded.deliveryPrice || order.deliveryCharge;
    order.totalAmount = ifNeeded.totalPrice || order.totalAmount;

    const updatedOrder = await order.save();

    res.json({
      message: "Updated order successfully.",
      updatedOrder: updatedOrder,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  allOrders: allOrders,
  updateOrder: updateOrder,
};
