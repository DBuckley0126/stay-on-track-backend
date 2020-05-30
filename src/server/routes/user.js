const Router = require("koa-router");

const userControllers = require("../controllers/user");

const router = new Router();

router.post("/api/v1/user/sync", userControllers.syncUser);

module.exports = router;
