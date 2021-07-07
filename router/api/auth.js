const router = require('express').Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')


// @route    Get api/auth
// @desc     Test route
// @access   Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json('server error')
  }
})


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public

router.post('/',
check('email', 'please provide a valid email').isEmail(),
check('password', 'password is required').exists(),
async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password } = req.body
 
  try {
    //is user match
    let existsuser = await User.findOne({ email })
    if(!existsuser){
      return res.status(400).json('invalid credentials')
    }
  
    //match password
    const isMatch = await bcrypt.compare(password, existsuser.password )
    if(!isMatch){
      return res.status(400).json('invalid credentials')
    }
       
    //jsonwebtoken
    const payload = {
        existsuser: {
          id: existsuser.id
        }
      }
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err ;
        res.status(200).json({ token })
      }
    )
    
  } catch (error) {
    res.status(500).json('server error')
  }

})



module.exports = router