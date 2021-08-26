const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session')
router.use(cookieSession({ name: 'session',
                        secret: 'tokenaccess', 
                        maxAge: 24 * 60 * 60 * 1000,
                        resave: false,
                        saveUninitialized: true,
                        }));

// Controller
const AdminController = require('../controller/adminController')
// Check middleware
const checkUser = require('../middleware/check')
const AccountModal = require('../modals/accountModal')
// Check Token
const giveToken = require('../middleware/giveToken')
const checkToken = require('../middleware/checkToken')
// check Role
const authenAdmin = require('../middleware/authenAdmin')

// Login 
router.get('/login',AdminController.loginPage)
router.post('/login/done',checkUser,giveToken,AdminController.adminLoginDone)
// User Manager
router.get('/user-controll',checkToken,authenAdmin,AdminController.userControllPage)
// Controll Admin Page
router.get('/admin-page',checkToken,authenAdmin,AdminController.adminPage)
// Product Manage
router.get('/product-manage',checkToken,authenAdmin,AdminController.productManagePage)
// Add product
router.get('/product-manage/add-product',checkToken,authenAdmin,AdminController.formAddProduct)
router.post('/product-manage/add-product/done',checkToken,authenAdmin,AdminController.addProduct)
// edit product
router.get('/product-manage/edit-product/:slug',checkToken,authenAdmin,AdminController.formEditProduct)
router.put('/product-manage/edit-product/:slug/done',checkToken,authenAdmin,AdminController.editProductDone)
// delete product
router.delete('/product-manage/delete/:id/done',checkToken,authenAdmin,AdminController.deleteProduct)
// Quản lý đơn hàng
router.get('/order-manage',checkToken,authenAdmin,AdminController.orderManage)
// xác nhận đơn hàng
router.get('/order-manage/confirm/:id',checkToken,authenAdmin,AdminController.confimOrder)
router.put('/order-manage/confirm/:id/',checkToken,authenAdmin,AdminController.confirmDone)
// danh sách các đơn hàng chưa xác nhận
router.get('/order-manage/unconfirmed',checkToken,authenAdmin,AdminController.unconfirmed)
// danh sách các đơn hàng đã xác nhận
router.get('/order-manage/confirmed',checkToken,authenAdmin,AdminController.confirmed)
// danh sách các đơn hàng đang giao
router.get('/order-manage/shipping',checkToken,authenAdmin,AdminController.shipping)
// danh sách các đơn hàng đã hoàn thành
router.get('/order-manage/completed',checkToken,authenAdmin,AdminController.complete)
// quản trị các yêu cầu bảo hành
router.get('/warranty-manage/',checkToken,authenAdmin,AdminController.warrantyPage)
// gửi yêu cầu bảo hành cho nhân viêng 
router.get('/warranty-send/:id',checkToken,authenAdmin,AdminController.sendwarrantyPage)
router.put('/warranty-send/:id/done',checkToken,authenAdmin,AdminController.sendwarrantyDone)
// xem doanh thu theo tháng, năm
router.post('/order-manage/turnover',checkToken,authenAdmin,AdminController.turnover)
// Log out
router.get('/log-out',AdminController.logOut)


module.exports = router