const express = require('express');
const router = express.Router();
const seller = require('../controller/sellerController')
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
const authenWarranty = require('../middleware/authenWarranty')
const authenSeller = require('../middleware/authenSeller')

router.get('/seller-login',seller.login)
router.post('/seller-login/done',check,giveToken,authenSeller,seller.logined)
router.get('/seller-page',checkToken,authenSeller,seller.sellerPage)
router.get('/order-manage',checkToken,authenSeller,seller.sellerOrderManager)
router.get('/order-manage/confirm/:id',checkToken,authenSeller,seller.sellerOrderEdit)
router.put('/order-manage/confirm/:id',checkToken,authenSeller,seller.sellerOrderDone)


module.exports = router