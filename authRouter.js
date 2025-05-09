const { identifiers } = require('../middlewares/identification');

const express = require('express'); 
const authController = require('../controllers/authoController')
const router = express.Router();

router.post('/signup', authController.signup );
router.post('/signin', authController.signin );
router.post('/signout', identifiers , authController.signout);

router.patch('/send-verification-code', identifiers, authController.sendVerificationCode);
router.patch('/verify-verification-code', identifiers , authController.verifyVerificationCode);

router.patch('/change-password', identifiers , authController.changePassword);
router.patch('/send-forgot-password-code', authController.sendForgotPasswordCode);
router.patch('/verify-forgot-password-code', authController.verifyForgotPasswordCode);


module.exports = router;