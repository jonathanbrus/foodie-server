const orders = require("../models/order");

const allOrders = async (req, res, nex) => {
  try {
    const allOrder = await orders.find();

    res.json({
      message: "Fetched all orders",
      allOrders: allOrder.reverse(),
    });
  } catch (e) {
    console.log(e);
  }
};

const myOrders = async (req, res, nex) => {
  try {
    const myAllOrders = await orders.find({ userId: req.userId });

    res.json({
      message: "Fetched all orders",
      myOrders: myAllOrders.reverse(),
    });
  } catch (e) {
    console.log(e);
  }
};

const placeOrder = async (req, res, nex) => {
  const {
    userId,
    isFood,
    restaurantName,
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

    const newOrder = await orders.create({
      userId: userId,
      isFood: isFood,
      buyFrom: restaurantName,
      orderItems: [...parsedOrderItems],
      shippingAddress: {
        fullName: parsedAddress["fullName"],
        phone: parsedAddress["phoneNo"],
        pincode: parsedAddress["pincode"],
        address: parsedAddress["doorNo"] + " - " + parsedAddress["street"],
        city: parsedAddress["city"],
        state: parsedAddress["state"],
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
  allOrders: allOrders,
  myOrders: myOrders,
  placeOrder: placeOrder,
  updateOrder: updateOrder,
};
