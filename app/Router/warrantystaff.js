const express = require('express');
const router = express.Router();
const warrantystaff = require('../controller/warrantystaffController')
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


router.get('/login', warrantystaff.warrantystaffLoginPage);
router.post('/login/done',check,giveToken,authenWarranty,warrantystaff.warrantystaffLogin);
// trang quản trị dành cho nhân viên bảo hành
router.get('/warranty-page',checkToken,authenWarranty,warrantystaff.warrantystaffPage);
router.get('/warranty',checkToken,authenWarranty,warrantystaff.warrantyPage)
// trang thay đổi trạng thái
router.get('/warranty/:id/change',checkToken,authenWarranty,warrantystaff.warrantyChangeStatus)
router.put('/warranty/:id/change/done',checkToken,authenWarranty,warrantystaff.warrantyChange)



module.exports = router