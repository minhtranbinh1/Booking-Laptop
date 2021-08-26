const AccountModal = require('../modals/accountModal')
const productModal = require('../modals/productModal')
const orderModal = require('../modals/orderModal')
const warrantyModal = require('../modals/warrantyModal')
class Seller{
    //log in 
    login(req,res,next){
        res.render('./seller/login',{layout: false})
    }
    logined(req,res,next){
        res.redirect('/seller/seller-page')
    }
    sellerPage(req,res,next){
        res.render('./seller/sellerPage',{layout:'seller'})
    }
    // quản trị hóa đơn
    sellerOrderManager(req,res,next){
        var user = req.data;
        user = user.toObject()
        var acc
        orderModal.find({})
        .sort({date: -1})
        .then(function(orders){
            orders= orders.map(function(orders){
                return orders = orders.toObject()
            })
            res.render('./admin/orderManage',{layout:'seller',acc:user,orders:orders,user:user})
        })
        
    }
    // sửa trạng thái đơn hàng
    sellerOrderEdit(req,res,next){
        var user = req.data;
        user = user.toObject()
        var acc
        orderModal.findOne({_id: req.params.id})
        .then(function(order){
            order = order.toObject()
            return res.render('./admin/orderEdit',{layout:'seller',order:order,acc:user})
        })
    }
    // xác nhận thành công đơn hàng
    sellerOrderDone(req,res,next){
        var user = req.data;
        var formData = req.body
        orderModal.updateOne({_id: req.params.id},{ status:formData.status,confirmBy:user.name},function(){
            res.redirect("/seller/order-manage")
        })
    }
    // Log Out
    logOut(req, res, next){
        res.clearCookie('key')
        return res.redirect('/')
    }


} 

module.exports = new Seller;