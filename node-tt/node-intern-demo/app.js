console.log("APP PATH:", __dirname);
require("dotenv").config();
const express = require("express");

const app = express();

// middleware
app.use(express.json());

const logger = require("./middlewares/logger.middleware");
app.use(logger);

// routes
const userRoute = require("./src/routes/user.route");
app.use("/api/users", userRoute);

// test api
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Express working" });
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
