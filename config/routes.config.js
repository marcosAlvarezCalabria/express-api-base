const express = require('express');

const router = express.Router();
const employees = require('../controllers/employees.controller')


router.get("/employees",employees.list)
router.get("/employees/oldest",employees.oldest)
router.post("/employees" , employees.doList)
router.get("/employees/:name",employees.listName)


module.exports = router;
