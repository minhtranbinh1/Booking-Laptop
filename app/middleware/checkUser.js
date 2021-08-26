const AccountModal = require('../modals/accountModal')
module.exports = function(req,res,next){
    AccountModal.findOne({
        username: req.body.username
    })
    .then(function(account){
        if(!account){
            return  next()
        } else{
            return res.send('Đăng kí không thành công vì trùng username')
        }
    })
}