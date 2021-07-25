const orders = require("../models/order");
const carts = require("../models/cart");

const allOrders = async (req, res, nex) => {
  try {
    const allOrder = await orders.find();

    res.json({
      message: "Fetched all orders",
      allOrders: allOrder.reverse().slice(0, 50),
      totalOrders: allOrder.length,
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
    buyFrom,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxAmount,
    deliveryCharge,
    totalAmount,
  } = req.body;

  try {
    const parsedOrderItems = JSON.parse(orderItems);
    const parsedAddress = JSON.parse(shippingAddress);

    let address;

    if (
      (parsedAddress["doorNo"] + " - " + parsedAddress["street"]).includes(
        "undefined"
      )
    ) {
      address = parsedAddress["address"];
    } else {
      address = parsedAddress["doorNo"] + " - " + parsedAddress["street"];
    }

    const newOrder = await orders.create({
      userId: userId,
      isFood: isFood,
      buyFrom: buyFrom,
      orderItems: [...parsedOrderItems],
      shippingAddress: {
        fullName: parsedAddress["fullName"] || parsedAddress["name"],
        phone: parsedAddress["phoneNo"] || parsedAddress["phone"],
        pincode: parsedAddress["pincode"] || 629702,
        address: address,
        city: parsedAddress["city"],
        state: parsedAddress["state"] || "Tamil Nadu",
      },
      paymentMethod: paymentMethod,
      isPaid: false,
      taxAmount: taxAmount,
      deliveryCharge: deliveryCharge,
      totalAmount: totalAmount,
      deliveredAt: "",
    });

    await carts.deleteOne({ userId: userId });

    res.json({
      message: "Order placed",
      newOrder: newOrder,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateOrder = async (req, res, nex) => {
  const { orderId, isPaid, orderStatus } = req.body;

  try {
    const order = await orders.findById(orderId);

    if (!order) {
      throw error(404, "Order not found.");
    }

    order.isPaid = isPaid || order.isPaid;
    order.orderStatus = orderStatus || order.orderStatus;

    const updatedOrder = await order.save();

    res.json({
      message: "Updated order successfully.",
      updatedOrder: updatedOrder,
    });
  } catch (e) {
    console.log(e);
  }
};

const cancelOrder = async (req, res, nex) => {
  const { orderId } = req.body;

  try {
    const order = await orders.findById(orderId);

    if (!order) {
      throw error(404, "Order not found.");
    }

    order.orderStatus = "Canceled" || order.orderStatus;

    const CanceledOrder = await order.save();

    res.json({
      message: "Canceled order successfully.",
      CanceledOrder: CanceledOrder,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  allOrders: allOrders,
  myOrders: myOrders,
  placeOrder: placeOrder,
  cancelOrder: cancelOrder,
  updateOrder: updateOrder,
};
