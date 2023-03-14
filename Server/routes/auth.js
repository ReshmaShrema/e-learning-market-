const express=require('express');
const authCountroller = require('../controllers/auth');
const router=express.Router();

router.post('/register', authCountroller.register);
router.post('/login',authCountroller.login)
module.exports = router;