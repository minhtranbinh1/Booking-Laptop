const AccountModal = require('../modals/accountModal')
module.exports = function checkUser(req, res, next){
    AccountModal.findOne({username: req.body.username})
    .then(function(account){
        if(!account){
            return res.send('user không tồn tại')
        }
        if(account){
            if(req.body.username === account.username && req.body.password === account.password){
                    req.data = account;
                    return next()
            }
            else{
                return res.send('Thông tin đăng nhập sai')
            }
        }

    })
    .catch(function(err){
        console.error(err)
    })
}