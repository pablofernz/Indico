const { Router } = require('express');
const testToken = require("../handlers/testHandler")

const testRouter = Router();


testRouter.get("/token/", testToken)

module.exports = testRouter;