const express = require('express');
const router = express.Router();
const singleController = require('../controller/singlePage')
const cookieSession = require('cookie-session')
router.use(cookieSession({ name: 'session',
                        secret: 'tokenaccess', 
                        maxAge: 24 * 60 * 60 * 1000,
                        resave: false,
                        saveUninitialized: true,
                        }));


router.get('/product/:slug', singleController.productPage)
router.get('/thank-you',singleController.thankYouPage)
router.get('/', singleController.homePage)





module.exports = router