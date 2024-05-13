const express = require('express');
const employee = require('../Controller/controllers');

const router = express.Router();
// Routes for performing different operations with different endpoint
router.route('/add/employee').post(employee.addEmployee);
router.route('/edit/employee').post(employee.updateEmployee);
router.route('/delete/employee').post(employee.deleteEmployee);
router.route('/search/employee').post(employee.showEmployee);

module.exports = router;