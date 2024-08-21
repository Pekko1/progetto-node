const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// import db
require('./config/database')

// Import routers
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const orderRouter = require("./routes/orders");

app.use(express.json());

// Use routers
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", orderRouter);

// Base route
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});