const { Router } = require('express');
const testToken = require("../handlers/tokenHandlers/testHandler");
const getUserDataWithToken = require('../handlers/tokenHandlers/getUserDataWithToken');

const tokenRouter = Router();


tokenRouter.get("/test", testToken)
tokenRouter.get("/getuserdata", getUserDataWithToken)


module.exports = tokenRouter;