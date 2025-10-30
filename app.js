// Import the express module
import express from "express";

// Create an instance of an Express application
const app = express();

app.set("view engine", "ejs");
// Enable static files serving
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const orders = [];

// Define the port number where our server will listen
const PORT = 3010;

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/confirm", (req, res) => {
  res.render("confirmation");
});

app.get("/admin", (req, res) => {
  res.render("admin", { orders });
  //   res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

app.post("/submit-order", (req, res) => {
  const order = {
    name: req.body.name,
    email: req.body.email,
    flavor: req.body.flavor,
    cone: req.body.method,
    toppings: req.body.toppings,
    comments: req.body.comments,
  };
  //   res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
  console.log("Server is running at http://localhost:${PORT}");

  orders.push(order);

  res.render("confirmation", { order });

  console.log(orders);
});

// start the server and make it listen on the port
// specified above
app.listen(PORT, () => {
  console.log(`Sever is running at http://localhost:${PORT}`);
});
