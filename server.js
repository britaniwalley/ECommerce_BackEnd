const express = require("express");
const routes = require("./routes");
//added dev dependencies
const mySql2 = require("mySql2");
const dotenv = require("dotenv");

const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}!`)
  );
});
