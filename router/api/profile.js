const router = require('express').Router()
const User = require('../../models/User')
const Profile = require('../../models/profile')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

// @route    GET api/profile/me
// @desc     Get current user profile
// @access   Private

router.get('/me', auth, async (req, res) => {

    try {
      
      const profile = await Profile.findOne({
      user: req.body.id
    }).populate('user', ['name', 'avatar'])
      if(!profile){
        return res.status(400).json({ msg: 'There is no profile for this user' })
      }
      res.status(200).json(profile)
    } catch (error) {
      console.error(error.message);
      res.status(500).json('server error')
    }
})

// @route    POST api/profile
// @desc     Create & update user profile
// @access   Private

router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

})





module.exports = router