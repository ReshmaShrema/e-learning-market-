const express=require('express');
const authCountroller = require('../controllers/auth');
const { requireSignin } = require('../middleware');
const router=express.Router();

router.post('/register', authCountroller.register);
router.post('/login',authCountroller.login)
router.get('/logout',authCountroller.logout)
router.get('/current-user',requireSignin)
module.exports = router;