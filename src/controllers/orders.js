const orders = require("../models/order");

const placeOrder = async (req, res, nex) => {
  const {
    userId,
    isFood,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    deliveryPrice,
    totalPrice,
  } = req.body;

  try {
    const parsedOrderItems = JSON.parse(orderItems);
    const parsedAddress = JSON.parse(shippingAddress);

    console.log([...parsedOrderItems]);

    const newOrder = await orders.create({
      userId: userId,
      isFood: isFood,
      orderItems: [...parsedOrderItems],
      shippingAddress: {
        landmark: parsedAddress["landmark"],
        address: parsedAddress["address"],
        city: parsedAddress["city"],
      },
      paymentMethod: paymentMethod,
      taxPrice: taxPrice,
      deliveryPrice: deliveryPrice,
      totalPrice: totalPrice,
      isPaid: false,
      isDelivered: false,
      deliveredAt: "",
    });

    res.json({
      message: "Order placed",
      newOrder: newOrder,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateOrder = async (req, res, nex) => {
  const { orderId, isPaid, isDelivered, deliveredAt } = req.body;

  try {
    const order = await orders.findById(orderId);

    if (!order) {
      throw error(404, "Order not found.");
    }

    order.isPaid = isPaid || order.isPaid;
    order.isDelivered = isDelivered || order.isDelivered;
    order.deliveredAt = deliveredAt || order.deliveredAt;

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
  placeOrder: placeOrder,
  updateOrder: updateOrder,
};