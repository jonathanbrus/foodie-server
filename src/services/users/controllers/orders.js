const orders = require("../../../models/order");
const carts = require("../../../models/cart");

const response = require("../../../utils/response");

const myOrders = async (req, res, nex) => {
  try {
    const myAllOrders = await orders.find({ userId: req.userId }, null, {
      sort: { createdAt: -1 },
    });

    res.json(response(200, "Fetched all orders", myAllOrders));
  } catch (e) {
    res.json(response(500, "Something went wrong"));
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
      paid: false,
      taxAmount: taxAmount,
      deliveryCharge: deliveryCharge,
      packingCharge: packingCharge,
      totalAmount: totalAmount,
      deliveredAt: "",
    });

    if (food !== "true") {
      await carts.deleteOne({ userId: req.userId });
    }

    res.json(response(200, "Order placed", newOrder));
  } catch (e) {
    res.json(response(500, "Something went wrong"));
  }
};

const cancelOrder = async (req, res, nex) => {
  const { orderId } = req.body;

  try {
    const order = await orders.findById(orderId);

    if (!order) {
      throw { status: 404, message: "Order not found." };
    }

    order.orderStatus = "Canceled" || order.orderStatus;

    await order.save();

    res.json(response(200, "Successfully canceled order"));
  } catch (e) {
    res.json(response(e.status, e.message));
  }
};

module.exports = {
  myOrders: myOrders,
  placeOrder: placeOrder,
  cancelOrder: cancelOrder,
};
