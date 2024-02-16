const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/rental")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.log("could not connect to mongoDB...", err));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR:  jwtPrivateKey is undefined!");
  process.exit(1);
}
// parse requests of content type - application/x-www-form-urlencoded

const genre = require("./routes/genres");
const customer = require("./routes/customers");
const movie = require("./routes/movies");
const rental = require("./routes/rentals");
const user = require("./routes/users");
const auth = require("./routes/auth");

app.use(express.json());
app.use("https://4567-102-88-37-115.ngrok-free.app/api/genres", genre);
app.use("https://4567-102-88-37-115.ngrok-free.app/api/customers", customer);
app.use("https://4567-102-88-37-115.ngrok-free.app/api/movies", movie);
app.use("https://4567-102-88-37-115.ngrok-free.app/api/rentals", rental);
app.use("https://4567-102-88-37-115.ngrok-free.app/api/users", user);
app.use("https://4567-102-88-37-115.ngrok-free.app/api/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}....`);
});
