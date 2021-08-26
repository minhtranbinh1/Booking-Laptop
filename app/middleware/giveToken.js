const AccountModal = require('../modals/accountModal')
const tokenModal = require('../modals/tokenModal')
const jwt = require('jsonwebtoken');
module.exports = function giveToken(req ,res ,next){
        var token = jwt.sign({ id:req.data._id }, 'password',{expiresIn: 60*60*5});
        var refreshToken = jwt.sign({ id:req.data._id }, 'password',{expiresIn: 60*14400});
        var NewrefreshToken = new tokenModal(
                {
                        refreshToken:refreshToken,
                        userid:req.data._id
                })
        tokenModal.findOne({userid:req.data._id})
        .then(function(refreshToken){
                if(refreshToken){
                    res.cookie('key',token)
                    return next();
                }else{
                    NewrefreshToken.save()
                    .then(function(){
                        res.cookie('key',token)
                        return next(); 
                    })

                }
        })


}