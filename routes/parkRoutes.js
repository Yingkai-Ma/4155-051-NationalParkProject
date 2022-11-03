const express = require('express');
const controller = require('../controllers/parkController');
const router = express.Router();


//GET   /states/:value:   Send details of clicked National Park
router.get('/', controller.show)










module.exports = router;