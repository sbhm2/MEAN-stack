const express = require('express'),
      pkg     = require('../../package.json');
    
const router = express.Router();

router.get('/', async function(req, res){
    return res.status(200).send({version: pkg.version}).end();
});

module.exports = router;