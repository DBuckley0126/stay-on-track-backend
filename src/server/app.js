if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Koa = require("koa");
const logger = require("koa-logger");
const KoaBody = require("koa-body");
const Json = require("koa-json");
const cors = require("@koa/cors");

const indexRoutes = require("./routes/index");
const testRoutes = require("./routes/test");

const app = new Koa();
const PORT = process.env.PORT || 5000;

// JSON Prettier middleware
app.use(Json());
// Add koa-body middleware
app.use(KoaBody());
// Add koa-logger middleware
if (process.env.NODE_ENV !== "test") {
  app.use(logger());
}
// Add koa-cors middleware
app.use(cors());

app.use(indexRoutes.routes());

app.use(testRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
