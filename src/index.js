require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const userRoutes = require("./infra/users/routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(routes);
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
