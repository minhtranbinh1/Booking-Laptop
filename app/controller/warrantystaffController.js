const productModal = require('../modals/productModal')
const AccountModal = require('../modals/accountModal')
const orderModal = require('../modals/orderModal')  
const warrantyModal = require('../modals/warrantyModal')
const jwt = require('jsonwebtoken');
class Warranty{
    warrantystaffLoginPage(req, res, next){
        res.render('./warranty/warrantyLogin',{layout: false})
    }
    warrantystaffLogin(req , res, next){
        res.redirect('/warranty-staff/warranty-page')
    }
    // trang quan trị
    warrantystaffPage(req , res, next){
        res.render('./warranty/warranty-page',{layout:'staff'})
    }
    // trang quản lý bảo hành
    warrantyPage(req , res, next){
        warrantyModal.find({staff:req.data.name})
        .sort({
            date: -1,
        })
        .then(function(warranty){
            warranty = warranty.map(function(warranty){
                return warranty.toObject();
            })
            return res.render('./warranty/warranty',{layout:'staff',warranty:warranty})
        })
        
    }
    // trang thay đổi trạng thái bảo hành
    warrantyChangeStatus(req, res, next) {
        warrantyModal.findOne({ _id: req.params.id}, function (err, warranty) {
            if(err){
                return console.error(err)
            } 
            else{
                warranty = warranty.toObject()
                return res.render('./warranty/warrantyChange',{layout:'staff',warranty:warranty})
            }
        });
    }
    warrantyChange(req , res, next){
        warrantyModal.updateOne({_id:req.params.id},{status:req.body.status},function(){
            res.redirect('/warranty-staff/warranty')
        })
    }
} 

module.exports = new Warranty;