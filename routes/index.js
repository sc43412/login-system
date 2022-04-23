const express = require('express');
const passport=require('passport');

const router = express.Router();

const userController = require('../controllers/userController');
router.get('/',passport.checkAuthentication,userController.home);

router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
//router.post('/createsession',userController.createsession);
router.post('/createsession', passport.authenticate(
    'local',
    {failureRedirect: '/signin'},
), userController.createSession);
router.post('/create',userController.create);

router.get('/sign-out', userController.destroySession);
router.get('/user-delete/:id', passport.checkAuthentication, userController.delete);
router.get('/user-update/:id',passport.checkAuthentication,userController.update);
router.post('/update-details/:id',passport.checkAuthentication,userController.updated);

module.exports= router;