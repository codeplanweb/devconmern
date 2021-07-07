const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){

  //get the token
 const token = req.header('x-auth-token');

  //chack tocken
  if(!token){
    return res.status(401).json({ msg:'no token, authorization denied' })
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ msg: 'token in nit valid' })
  }

}