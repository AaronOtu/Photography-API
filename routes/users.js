const express = require('express');
const { GetAllUsers, RegisterUsers } = require('../controllers/users');
const router = express.Router();




router.route('/').get(GetAllUsers).post(RegisterUsers)


module.exports = router


