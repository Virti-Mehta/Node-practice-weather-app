const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for Express config
// Challenge: Create a partial for footer
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Virti Mehta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "This is help page.",
    name: "Virti Mehta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Virti Mehta",
  });
});

// Challenge: Update weather endpoint to accept address
// Challenge: Wire up /weather with geocode and forecast
app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide an address",
    });
  }
  const address = req.query.search;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.search,
        location,
        forecast: forecastdata,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("page404", {
    title: "404",
    error: "Help article not found",
    name: "Virti Mehta",
  });
});

app.get("*", (req, res) => {
  res.render("page404", {
    title: "404",
    error: "Page not found",
    name: "Virti Mehta",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
