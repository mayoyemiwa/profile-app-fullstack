const router = require('express').Router();
const authController = require('../controllers/authControllers')
const auth = require('../middleware/auth')


router.post('/user/api/signup',  authController.signup_post)
router.post('/user/api/login',  authController.login_post)
router.post('/user/api/profilepage', authController.profile_post);
router.post('/user/api/activation', authController.activationEmail);
router.post('/user/api/refresh_token', authController.getAccessToken);
router.post('/user/api/getuserprofile', authController.getAccessToProfile);
router.post('/user/api/getuser', authController.getUser);
// router.post('/user/api/activate/:', authController.profile_post);


module.exports = router;