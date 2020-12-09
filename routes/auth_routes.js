const express = require('express');
const router = express.Router();
const passport = require("passport");
const {  Joi, celebrate,  } = require('celebrate');
const {registerCreate, registerNew , logOut, loginNew, loginCreate, editUser, editUserReq, removeUser} = require('../controllers/auth_controller')
const {authRedirect} = require("../middleware/auth_middleware")
const {userValidationRules, validate} = require("../middleware/validator")
const User = require('../models/user');



//GET Route for Register Page
router.get('/register',authRedirect, registerNew);
//POST Route for registering and creating a user
router.post('/register', userValidationRules(), validate, registerCreate);

 
//GET Route for Login page
router.get("/login", loginNew)
//POST Route for finding the user and logging them in
router.post("/login", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }}), 
    passport.authenticate('local', {
        failureRedirect: '/user/login',
        session: false
}), loginCreate);


//GET Route for Logout function
router.get('/logout', logOut);



//GET Route for Account Settings Page
router.get("/:username/account-settings", editUser)
//PATCH Route for Updating the user via account settings
router.patch("/:username/account-settings", editUserReq)

//router.delete("/:name/delete", removeUser)


const upload = require("../middleware/profile_aws.js");
const singleUpload = upload.any('image');

router.post("/:username/add-profile-picture",  function (req, res) {
    const username = req.params.username;
    //console.log(username)
     singleUpload(req, res, async function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Image Upload Error",
            detail: err.message,
            error: err,
          },
        });
      }
      let update = { profile: req.files[0].location };
      //console.log(update)
      await User.findOneAndUpdate(username, update, {new: true})
        .then((user) => res.status(200).json({ success: true, user: user }) )
        .catch((err) => res.status(400).json({ success: false, error: err }));
    });
  });

//passport.authenticate('jwt', {session: false})



module.exports = router
