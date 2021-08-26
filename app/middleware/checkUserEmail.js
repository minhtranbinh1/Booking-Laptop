const AccountModal = require('../modals/accountModal')
module.exports = function(req,res,next){
    AccountModal.findOne({
        email: req.body.email,
    })
    .then(function(account){
        if(!account){
            return  next()
        } else{
            return res.send('Email Đã sử dụng rồi')
        }
    })
}