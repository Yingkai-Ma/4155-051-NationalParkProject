
const express = require('express');
const controller = require('../controllers/stateController');
const router = express.Router();


//GET   /states/:value:   Send details of clicked state of National Park
router.get('/:value', controller.show)










module.exports = router;