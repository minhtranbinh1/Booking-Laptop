const AccountModal = require('../modals/accountModal')
const jwt = require('jsonwebtoken');
module.exports = function checkRole(req, res, next) {
    if(req.data.role === 'admin'){
        return next();
    } else{
        res.clearCookie('key')
        return res.send('Khu vực này chỉ dành cho Admin')
    }
}
