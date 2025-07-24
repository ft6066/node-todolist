// 2. 라우터 주소 정의

const express = require("express");
const router = express.Router();

const taskApi = require("./task.api");

router.use("/tasks", taskApi);

module.exports = router;
