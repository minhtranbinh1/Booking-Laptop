const productModal = require('../modals/productModal')
const AccountModal = require('../modals/accountModal')
const orderModal = require('../modals/orderModal')
const jwt = require('jsonwebtoken');
const cookieSession = require('cookie-session')

class Cart{
    cartAdd(req, res, next){
        var cart = req.session.cart
        res.redirect('/')
    }
    remove(req, res, next){
        var data = req.session.cart
        data = data.filter(function(data){
            return data.product._id !== req.params.id
        })
        req.session.cart = data
        return res.redirect('/')
    }
}
module.exports = new Cart;