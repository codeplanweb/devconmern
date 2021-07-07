const router = require('express').Router()
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')




// @route    POST api/users
// @desc     Register user
// @access   Public

router.post('/',
check('name', 'name is required').not().isEmpty(),
check('email', 'please provide a valid email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').isLength({min:6}),
async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  const {name, email, password } = req.body
  try {
    //is user unique
    let existsuser = await User.findOne({ email })
    if(existsuser){
      return res.status(400).json('user already exists')
    }
    //password hash
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    //avater
    const avater = gravatar.url(email,{
      s: '200',
      r: 'pg',
      d:'mm'
    })

    //update user
    const newUser = new User({
      name,
      email,
      password:hashPass,
      avater
    })

    //save
    const user = await newUser.save()

    //jsonwebtoken
    const payload = {
        user: {
          id: user.id
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