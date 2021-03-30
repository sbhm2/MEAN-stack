const express = require('express');

const middleware = require('./middleware');
const auth       = require('../lib/auth');

const router = express.Router();

router.post('/register', middleware.generateAccessToken, async(req,res)=>{
    auth.register(req, res);
});

router.post('/login', middleware.generateAccessToken, async(req, res)=>{
    auth.login(req, res);
})

module.exports = router;