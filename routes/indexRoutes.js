const express = require('express');
const controller = require('../controllers/indexController');
const router = express.Router();

//get request     show home page
router.get('/', controller.home);

//get request    show login
router.get('/login', controller.login);



module.exports = router;