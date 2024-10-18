const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3010;

app.use(express.static('static'));

// Server-side values
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; //2 points poer $1

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = newItemPrice + cartTotal;
  res.send(cartTotal.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let finalPrice;
  if (isMember === 'true') {
    finalPrice = cartTotal - (discountPercentage / 100) * cartTotal;
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (taxRate / 100) * cartTotal;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryDays;
  if (shippingMethod === 'standard') {
    deliveryDays = distance / 50;
  } else if (shippingMethod === 'express') {
    deliveryDays = distance / 100;
  }
  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
