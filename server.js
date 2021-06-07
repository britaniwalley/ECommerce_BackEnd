const express = require("express");
const routes = require("./routes");
//added dev dependencies
const mySql2 = require("mySql2");
const dotenv = require("dotenv");

// import sequelize connection---IMPORTED ACTIVITY 1
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server---SYNCED SERVER _ ACITVITY 1
sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}!`)
  );
});
