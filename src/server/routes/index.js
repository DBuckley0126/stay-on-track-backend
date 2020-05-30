const Router = require("koa-router");

const indexControllers = require("../controllers/index");

const router = new Router();

router.get("/api/v1/", indexControllers.index);

module.exports = router;
