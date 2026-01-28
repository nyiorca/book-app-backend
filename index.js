const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const port = process.env.PORT || 5000;

require("dotenv").config();

//Jq9qOFr3xPuXF4FK

//mongodb+srv://nyiorca:<db_password>@cluster0.tiye98k.mongodb.net/?appName=Cluster0

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-app-frontend-opal-eight.vercel.app",
    ],
    credentials: true,
  }),
);

const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("Book Server is running");
  });
}

main()
  .then(() => console.log("mongoose connect successfully"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
