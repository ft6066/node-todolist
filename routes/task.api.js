// 2. 라우터 주소 정의
const express = require("express");
const taskController = require("../controller/task.controller");
const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getTask);
router.put("/:id", taskController.putTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
