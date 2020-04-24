const express = require("express"),
  bodyParser = require("body-parser"),
  siteRoutes = require("./routes/site"),
  morgan = require("morgan");

const app = express();

require("dotenv").config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(siteRoutes);

app.use((req, res, next) => {
  const error = new Error("Request not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port on ${port}`);
});

module.exports = app;
