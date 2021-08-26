const productModal = require('../modals/productModal')
const AccountModal = require('../modals/accountModal')
const orderModal = require('../modals/orderModal')
const warrantyModal = require('../modals/warrantyModal')
class User{
    // Đăng Nhập
    userLoginPage(req, res, next){
        if(!req.cookies.key){
            return res.render('./user/login',{layout: 'loginUser'})
        }
        if(req.cookies.key){
            return res.send('User Page')
        }
        
    }
    loginDone(req, res, next){
        res.redirect('/')
    }
    // Trang user
    userPage(req, res, next){
        var user = req.data
        user = user.toObject()
        res.render('./user/userPage',{layout: 'productPage',user:user,account:user})
    }
    // Trang sửa User
    userEditPage(req, res, next){
        var user = req.data
        user = user.toObject()
        res.render('./user/editUser',{layout: 'productPage',user:user,account:user})
    }
    // Sửa thành công
    userEdit(req, res, next){
        var formData = req.body
        var user = req.data
        AccountModal.updateOne({_id:user._id},{
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
        })
        .then(function(){
            res.redirect('/user/user-profile')
        })
    }
    // Đăng kí
    registerPage(req, res, next){
        res.render('./user/register',{layout: 'productPage'})
    }
    registerCompelete(req, res, next){
        var formData = req.body;
        var newUser = new AccountModal(formData)
        newUser.save()
        .then(function(){
            res.send('Done')
        })
    }
    // Form thanh toán
    formCheckOut(req, res, next){
        var user = req.data
        user = user.toObject()
        var account 
        productModal.findOne({_id: req.params.id})
        .then(function(product){
           product = product.toObject()
           return res.render('./user/checkOut',{user:user,product:product,account:user})
        })
        
    }
    // Đặt hàng thành công
    orderDone(req, res, next){
        var user = req.data
        var orderInfo = req.body
        orderInfo["idCustomer"] = `${user._id}`;
        var newOrder = new orderModal(orderInfo)
        newOrder.save()
        .then(function(){
            res.redirect('/thank-you')
        })
    }
    // trang quản lý đơn hàng
    orderinforPage(req, res, next){
        var account = req.data
        account = account.toObject()
        orderModal.find({idCustomer: account._id})
        .sort({date: -1})
        .then(function(orders){
            orders = orders.map(function(orders){
                return orders.toObject()
            })
            var ordersDone = orders.filter(function(orders){
                return orders.status === 'Đã hoàn thành'
            })
            var sumOrder = 0
            for(var i = 0; i < ordersDone.length; i++) {
                sumOrder++
            }
            if(sumOrder>2){
                AccountModal.updateOne({_id:req.data._id},{type:'Khách hàng thân quen'})
                .then(function(){
                    return res.render('./user/orderInforPage',{layout: 'productPage',account:account,orders:orders})
                })
            } else {
                return res.render('./user/orderInforPage',{layout: 'productPage',account:account,orders:orders})
            }
            
        })
        
    }
    // thông tin bảo hành
    warrantyInfo(req, res, next){
        var user = req.data;
        user = user.toObject()
        var account 
        warrantyModal.find({idCustomer: user._id})
        .sort({date: -1})
        .then(function(warrantyInfo){
            warrantyInfo = warrantyInfo.map(function(warranty){
                return warranty.toObject()
            })
            return res.render('./user/warranty-info',{layout: 'productPage',account:user,warrantyInfo:warrantyInfo})
        })
        
    }
        // tạo thông tin bảo hành
        warrantyForm(req , res, next){
            var user = req.data;
            user = user.toObject()
            var account
            orderModal.find({idCustomer: req.data._id,status:'Đã hoàn thành'})
            .then(function(product){
                product = product.map(function(product){
                    return product.toObject();
                })
                return res.render('./user/create-warranty', {layout: 'productPage',user:user,account:user,product:product})
            })
            
        }
    // Gửi thông tin bảo hành
    warrantySend(req, res, next){
        var user = req.data
        var warranty = req.body
        warranty["idCustomer"] = `${user._id}`
        var newWarranty = warrantyModal(warranty)
        newWarranty.save()
        .then(function(){
            return res.redirect('/user/warranty-info')
        })
        .catch(function(err){
            console.log(err)
        })
    }
    // thanh toán cart
    checkOut(req, res, next){
        var user = req.data
        user = user.toObject()
        var account 
        var data = req.session.cart
        var money = []
        for(let i= 0; i<data.length; i++){
            money.push(data[i].product.price)
        }
        var total = money.reduce(function(total, sum){
        return total + sum
        },0)
        var obj = {}
        obj['total'] = total
        var length = data.length
        obj['len'] = length
        return res.render('./user/checkOutcart',{user:user,account:user,product:data,sum:obj})
    }
    // Log Out
    logOut(req, res, next){
        res.clearCookie('key')
        return res.redirect('/')
    }
} 

module.exports = new User;