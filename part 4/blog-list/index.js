const app = require("./app");
const config = require("./utils/config");

app.listen(config.PORT, () => {
  `Server running on port ${config.PORT}`;
});
