const Router = require("koa-router");

const testControllers = require("../controllers/test");

const router = new Router();

router.get("/api/v1/test-values", testControllers.getAllTestValues);
router.post("/api/v1/test-values", testControllers.postTestValue);

module.exports = router;
