const AccountModal = require('../modals/accountModal')
const jwt = require('jsonwebtoken');
module.exports = function checkRoles(req, res, next) {
    if(req.data.role === 'seller'|| req.data.role === 'admin'){
        return next();
    } else{
        res.clearCookie('key')
        return res.send('Khu vực này chỉ dành cho Nhân viên')
    }
}
