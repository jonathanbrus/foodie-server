const orders = require("../models/order");
const carts = require("../models/cart");

const allOrders = async (req, res, nex) => {
  try {
    const allOrder = await orders.find();

    res.json({
      message: "Fetched all orders",
      allOrders: allOrder.reverse().splice(0, 49),
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
    food,
    buyFrom,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxAmount,
    deliveryCharge,
    packingCharge,
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
      userId: req.userId,
      food: food,
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
      packingCharge: packingCharge,
      totalAmount: totalAmount,
      deliveredAt: "",
    });

    if (!food) {
      await carts.deleteOne({ userId: req.userId });
    }

    res.json({
      message: "Order placed",
      newOrder: newOrder,
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
