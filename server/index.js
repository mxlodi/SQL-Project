const sequelize = require("sequelize");
const db = require("./models");
const app = require("./app");

// Start Server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
