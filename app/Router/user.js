const express = require('express');
const app = express();
const router = express.Router();
const giveTokenFb = require('../middleware/giveTokenFb')
const userController = require('../controller/userController')
const jwt = require('jsonwebtoken');
const key = require('../config/key/key');
const passport = require('passport');
const cookieSession = require('cookie-session')
router.use(cookieSession({ name: 'session',
                        secret: 'tokenaccess', 
                        maxAge: 24 * 60 * 60 * 1000,
                        resave: false,
                        saveUninitialized: true,
                        }));

// Google account
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
router.use(require('express-session')({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secret: 'asdasdasdsdfsdf',
    resave: true,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());
// Check middleware
const check = require('../middleware/check')
const AccountModal = require('../modals/accountModal')
// Check Token
const giveToken = require('../middleware/giveToken')
const checkToken = require('../middleware/checkToken')
// check Role
const authenUser = require('../middleware/authenUser')
// Check User
const CheckUser = require('../middleware/checkUser')
const CheckUserEmail = require('../middleware/checkUserEmail')

// Đăng Kí người dùng
router.get('/register', userController.registerPage)
router.post('/register/done',CheckUser,CheckUserEmail,userController.registerCompelete)

// Đăng Nhập
router.get('/login', userController.userLoginPage)
router.post('/login/done',check,giveToken,authenUser,userController.loginDone)
router.get('/account-setting',checkToken,authenUser,userController.userPage)
// dang nhap bang facebook 
router.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/user/login' }),
    function(req, res, next) {
        var token = jwt.sign({ id:req.user._id }, 'password');
        res.cookie('key',token)
        return res.redirect('/');  
    })
// Đăng Nhập bằng google 
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/user/login' }),
    function(req, res) {
    var token = jwt.sign({ id:req.user._id }, 'password');
    res.cookie('key',token)
    res.redirect('/');
  });
// Đăng Xuất
router.get('/log-out',checkToken,authenUser,userController.logOut)
router.get('/user-profile',checkToken,authenUser,userController.userPage)
router.get('/user-profile/edit',checkToken,authenUser,userController.userEditPage)
router.put('/user-profile/edit/done',checkToken,authenUser,userController.userEdit)
// Thanh toán
router.get('/buy-product/check-out',checkToken,authenUser,userController.checkOut)
router.get('/buy-product/:id/form-check-out',checkToken,authenUser,userController.formCheckOut)
router.post('/buy-product/:id/done',checkToken,authenUser,userController.orderDone)
// trang quản lý đơn hàng
router.get('/order-infor',checkToken,authenUser,userController.orderinforPage)
// quản lý bảo hành
router.get('/warranty-info',checkToken,authenUser,userController.warrantyInfo)
router.get('/create-warranty',checkToken,authenUser,userController.warrantyForm)
router.post('/create-warranty/done',checkToken,authenUser,userController.warrantySend)

passport.use(new FacebookStrategy({
    clientID: '575285976828339',
    clientSecret: 'd23f0c7747c032ed0b798e14f79045ab',
    callbackURL: "http://localhost:3000/user/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    AccountModal.findOne({id: profile._json.id},function(err,user){
        if(err) {return done(err);}
        if(user){
            return done(null,user)
        }
        else{
            var newUser = new AccountModal(profile._json)
            newUser.save(function(err){
                return done(null,newUser)
            })
        }

    })

  }
));
passport.use(new GoogleStrategy({
    clientID: '205493866074-j1rksjkotbjqh69u3vo8f3gs013m5lfm.apps.googleusercontent.com',
    clientSecret: 'IDM-QeuwrSvm3GXl2bQwhF6a',
    callbackURL: "http://localhost:3000/user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    AccountModal.findOne({idGoogle: profile._json.sub},function(err,user){
        if(err) {return done(err);}
        if(user){
            return done(null,user)
        }
        else{
            var newUser = new AccountModal({
                name: profile._json.name,
                idGoogle: profile._json.sub
            })
            newUser.save(function(err){
                return done(null,newUser)
            })
        }

    })

  }
));

passport.serializeUser(function(user,done){
    done(null,user.id)
})
passport.deserializeUser(function(id,done){
    AccountModal.findOne({id},function(err,user){
        done(null,user)
    })
})
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});
module.exports = router