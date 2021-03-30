const jwt = require('jsonwebtoken');

const config = require('../../config');

exports.generateAccessToken = async function (req, res, next) {
    let username = req.body.username;
    let token = jwt.sign({data: username}, config.get("token_secret"), {expiresIn: 3600*1000});
    req.token = token;
    next();
}

exports.verifyToken = async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, config.get("token_secret"), (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.userName = user
  
      next()
    })
  }