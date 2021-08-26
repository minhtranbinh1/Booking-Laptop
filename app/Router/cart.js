const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController')
const productModal = require('../modals/productModal')
const checkToken = require('../middleware/checkToken')
const crypto = require('crypto');
var generate_key = function() {
    return crypto.randomBytes(16).toString('base64');
};
// thêm cart
const cookieSession = require('cookie-session')
router.use(cookieSession({ name: 'session',
                        secret: 'tokenaccess', 
                        maxAge: 24 * 60 * 60 * 1000,
                        resave: false,
                        saveUninitialized: true,
                        }));

// Thêm sản phẩm vào giỏ hàng
router.get('/add/:id',checkToken,function (req, res,next) {
    if(!req.session.cart){
        var id = req.params.id
        productModal.findOne({_id: id})
        .then(function (product){
            data = {
                _id : product._id,
                name : product.name,
                price : product.price,
                image : product.image,
                count : 1
            }
            req.session.cart =[{product:data}]
            return next()
        })
        .catch(function(err){
            console.log(err)
        })
    }
    if(req.session.cart){
        var id = req.params.id
        productModal.findOne({_id: id})
        .then(function (product){
            var data = {
                _id : product._id,
                name : product.name,
                price : product.price,
                image : product.image,
                count : 1
            }
            var dataOld = req.session.cart
            dataOld.push({product:data})
            return next()
        })
        .catch(function(err){
            console.log(err)
        })
    }

},cartController.cartAdd);

router.get('/remove',checkToken,cartController.remove)
router.get('/see',function (req, res,next) {
    var cart = req.session.cart
    res.json(cart)
});
router.get('/remove/:id',cartController.remove)

module.exports = router