const AccountModal = require('../modals/accountModal')
const jwt = require('jsonwebtoken');
module.exports = function giveToken(req ,res ,next){
        var token = jwt.sign({id:req.data.id}, 'password');
        res.cookie('key',token)
        return next();
}