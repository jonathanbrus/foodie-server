const orders = require("../../../models/order");
const carts = require("../../../models/cart");

const error = require("../../../utils/error");

const myOrders = async (req, res, nex) => {
  try {
    const myAllOrders = await orders.find({ userId: req.userId });

    res.json({
      message: "Fetched all orders",
      myOrders: myAllOrders.reverse(),
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
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

    if (food !== "true") {
      await carts.deleteOne({ userId: req.userId });
    }

    res.json({
      message: "Order placed",
      newOrder: newOrder,
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
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

    await order.save();

    res.json({
      message: "Successfully canceled order",
    });
  } catch (e) {
    res.json(error(e));
  }
};

module.exports = {
  myOrders: myOrders,
  placeOrder: placeOrder,
  cancelOrder: cancelOrder,
};
