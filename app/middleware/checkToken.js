const AccountModal = require('../modals/accountModal')
const tokenModal = require('../modals/tokenModal')
const jwt = require('jsonwebtoken');
const checkExpired = require('./checkExp')
module.exports =  function checkToken(req, res, next) {
    try {
        var token = req.cookies.key
        var decoded = jwt.verify(token, 'password');
        var result = checkExpired(decoded.exp)
        if(decoded){
            if(result === false) {
                AccountModal.findOne({_id: decoded.id})
                .then(function(account){
                    req.data = account;
                    return next();
                })
                .catch(function(err){
                    console.error(err)
                })
            }else{
                return res.send('Token hết hạn')
            }
        }
        else{
            return res.send('Phải Đăng nhập')
        }
    } 
    catch(err) {
            res.clearCookie('key')
            return res.send('Phải Đăng nhập')
      }

}
