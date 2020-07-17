const express = require("express");
const app = express();
const server = require("http").Server(app);

var list = {
  globalEntry: {
    checkin_mon: 1,
    checkin_day: 1,
    checkout_mon: 1,
    checkout_day: 2,
    BBQ: 1
  },
  dailyEntry: []
};

// Status
const OK_STATUS_MSG = {
  response_code: 200,
  msg: "OK",
  more_info: "",
  error_code: 0
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
app.get("/", (req, res) => {
  res.json(list);
});
app.put("/", (req, res) => {
  for (let i = 0; i < list.dailyEntry.length; i++) {
    if (
      req.query.checkin_mon === list.dailyEntry[i].checkin_mon &&
      req.query.checkin_day === list.dailyEntry[i].checkin_day
    ) {
      list.dailyEntry[i].checkin_mon = req.query.checkin_mon;
      list.dailyEntry[i].checkin_day = req.query.checkin_day;
      list.dailyEntry[i].discount = req.query.discount;
      list.dailyEntry[i].addBedNum = req.query.addBedNum;
      list.dailyEntry[i].peopleNum = req.query.peopleNum;
      list.dailyEntry[i].totalPrice = req.query.totalPrice;
      list.dailyEntry[i].price = req.query.price;
      list.dailyEntry[i].discountPrice = req.query.discountPrice;
    }
  }
  res.json({
    status: OK_STATUS_MSG
  });
});

app.post("/", (req, res) => {
  let match = false;
  for (let i = 0; i < list.dailyEntry.length; i++) {
    if (
      req.query.checkin_mon === list.dailyEntry[i].checkin_mon &&
      req.query.checkin_day === list.dailyEntry[i].checkin_day
    ) {
      match = true;
    }
  }
  if (!match) {
    list.dailyEntry.push({
      checkin_mon: req.query.checkin_mon,
      checkin_day: req.query.checkin_day,
      discount: req.query.discount,
      addBedNum: req.query.addBedNum,
      peopleNum: req.query.peopleNum,
      totalPrice: req.query.totalPrice,
      price: req.query.price,
      discountPrice: req.query.discountPrice
    });
  }
  res.json({
    status: OK_STATUS_MSG
  });
});
app.delete("/", (req, res) => {
  for (let i = 0; i < list.dailyEntry.length; i++) {
    if (
      req.query.checkin_mon === list.dailyEntry[i].checkin_mon &&
      req.query.checkin_day === list.dailyEntry[i].checkin_day
    ) {
      list.dailyEntry.splice(i, 1);
    }
  }
  res.json({
    status: OK_STATUS_MSG
  });
});
server.listen(8080);
