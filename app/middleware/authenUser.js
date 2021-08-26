const AccountModal = require('../modals/accountModal')
const jwt = require('jsonwebtoken');
module.exports = function checkRoles(req, res, next) {
    if(req.data.role === 'user'|| req.data.role === 'admin'|| req.data.role === 'warranty staff' || req.data.role === 'seller'){
        return next();
    } else{
        res.clearCookie('key')
        return res.send('Khu vực này chỉ dành cho User')
    }
}
