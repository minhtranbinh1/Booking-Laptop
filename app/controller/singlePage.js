const productModal = require('../modals/productModal')
const AccountModal = require('../modals/accountModal')
const orderModal = require('../modals/orderModal')
const jwt = require('jsonwebtoken');

class Single{
    homePage(req, res, next){
        productModal.find({})
        .then(function(product){
            if(!req.cookies.key){
                product = product.map(function(product){
                    return product.toObject()
                    
                })
                return res.render('home',{product:product})
            }
            if(req.cookies.key){
                product = product.map(function(product){
                    return product.toObject()
                })
                var token = req.cookies.key
                var decoded = jwt.verify(token, 'password'); 
                AccountModal.findOne({_id: decoded.id})
                .then(function(account){
                    if(req.session.cart){
                        var cart = req.session.cart
                        account = account.toObject();
                        var money = []
                        for(let i= 0; i<cart.length; i++){
                            money.push(cart[i].product.price)
                        }
                        var total = money.reduce(function(total, sum){
                            return total + sum
                        },0)
                        var obj = {}
                        obj['total'] = total
                        var length = cart.length
                        obj['len'] = length
                        return res.render('home',{product:product,account:account,cart:cart,sum:obj})
                    } else {
                        account = account.toObject();
                        return res.render('home',{product:product,account:account,cart:cart})
                    }   
                })
            }

            
        })
    
    }
    productPage(req, res, next){
        productModal.findOne({slug: req.params.slug})
        .then(function(product){
            return product.toObject()
        })
        .then(function(product){
            if(!req.cookies.key){
            return  res.render('productPage',{
                            layout:'productPage',
                            product: product
                        })
            }
            if(req.cookies.key){
                var token = req.cookies.key
                var decoded = jwt.verify(token, 'password'); 
                AccountModal.findOne({_id: decoded.id})
                .then(function(account){
                    account=account.toObject();
                    return  res.render('productPage',{
                        layout:'productPage',
                        product: product,
                        account: account
                    })
                })
            } 
        })
        
    }
    // trang cảm ơn đã đặt hàng
    thankYouPage(req, res, next){
        res.clearCookie('session')
        return res.send('cảm ơn đã đặt hàng')
    }
} 

module.exports = new Single;