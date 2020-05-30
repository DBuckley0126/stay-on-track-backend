if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Koa = require("koa");
const logger = require("koa-logger");
const KoaBody = require("koa-body");
const Json = require("koa-json");
const cors = require("@koa/cors");
const jwt = require("koa-jwt");
const jwksRsa = require("jwks-rsa");

const indexRoutes = require("./routes/index");
const testRoutes = require("./routes/test");
const userRoutes = require("./routes/user");

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

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status == 401) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});


app.use(
  jwt({
    secret: jwksRsa.koaJwtSecret({
      cache: true,
      cacheMaxEntries: 5,
      rateLimit: true,
      jwksRequestsPerMinute: 2,
      jwksUri: `https://danny-buckley-test.eu.auth0.com/.well-known/jwks.json`
    }),
    audience: "http://localhost:5000",
    issuer: "https://danny-buckley-test.eu.auth0.com/"
  }).unless({ path: [/^\/api\/v1\/public/] })
);

app.use(indexRoutes.routes());

app.use(testRoutes.routes());

app.use(userRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
