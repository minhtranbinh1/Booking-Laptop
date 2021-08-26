const AccountModal = require('../modals/accountModal')
const productModal = require('../modals/productModal')
const orderModal = require('../modals/orderModal')
const warrantyModal = require('../modals/warrantyModal')
class Admin{
        // Login Page
    loginPage(req, res, next){
            if(req.cookies.key){
                return res.redirect('/admin/admin-page')
            }
            if(!req.cookies.key){
                return res.render('./admin/loginPage',{layout: false})
            }          
    }
    // Login Done
    adminLoginDone(req, res, next){
       return res.redirect('/admin/admin-page')
    }

    adminPage(req, res, next){
        var acc = req.data
        acc = acc.toObject()
        res.render('./admin/adminPage',{layout: 'admin',acc: acc})
    }
    //render User Controller
    userControllPage(req, res, next){
        AccountModal.find({isadmin: false})
        .then(function(account){
            account = account.map(function(account){
                return account.toObject();
            })
            var acc = req.data
            acc = acc.toObject()
            res.render('./admin/userControll',{layout:'admin', account: account, acc: acc})
        })
        
    }
    // Product manage page
    productManagePage(req, res, next){
        productModal.find()
        .then(function(products){
            products = products.map(function(products){
                return products.toObject();
            })
            var acc = req.data
            acc = acc.toObject()
            res.render('./admin/productManage', {layout:'admin',products: products,acc: acc})
        })
        
    }
    // Quản trị Đơn Hàng
    orderManage(req, res, next){
        var user = req.data
        user = user.toObject()
        var acc
        orderModal.find()
        .sort({date: -1})
        .then(function(orders){
            orders = orders.map(function(orders){
                return orders.toObject();
            })
            var orderDone = orders.filter(function(orders){
                return orders.status === 'Đã hoàn thành'
            })
            var money = orderDone.map(function(orderDone){
                return money = orderDone.totalMoney
            })
            money = money.reduce(function(total,num){
                return total+num
            },0)
            return res.render('./admin/orderManage',{layout:'admin',acc:user,orders:orders,allRevenue:money})
        })
        
    }
    // Form Add product
    formAddProduct(req, res, next){
        res.render('./admin/formAddProduct',{layout:'admin',})
    }
    //add Product
    addProduct(req, res, next){
        var formData = {
            name: req.body.name,
            price: req.body.price,
            introduce: req.body.introduce,
            image: req.body.image,
        }
        var product = new productModal(formData)
        product.save()
        .then(function(){
            res.redirect('/admin/product-manage')
        })
    }
    // form edit product
    formEditProduct(req, res, next){
        productModal.findOne({slug: req.params.slug})
        .then(function(product){
            product = product.toObject()
            res.render('./admin/formEditProduct',{layout:'admin',product:product})
        })

    }
    editProductDone(req, res, next){
        var formData = req.body
        productModal.findOne({slug: req.params.slug})
        .then(function(product){
            productModal.updateOne({_id: product._id},{
                name: formData.name,
                price: formData.price,
                introduce: formData.introduce,
                image: formData.image,
            })
            .then(function(){
                res.redirect('/admin/product-manage')
            })
            .catch(function(err){
                console.log(err)
            })
        })
        .catch(function(err){
            console.log(err)
        })
    }
    // delete product
    deleteProduct(req, res, next){
        productModal.findByIdAndRemove(req.params.id, function(err, product){
            return res.redirect('/admin/product-manage')    
        })
    }
    // danh sách đơn hàng chưa xác nhận
    unconfirmed (req, res, next){
        orderModal.find({status: 'Chưa xác nhận'})
        .then(function(orders){
            orders = orders.map(function(orders){
                return orders.toObject();
            })
            return res.render('./admin/unconfirmed',{layout:'admin',orders:orders})
        })
        
    }
    // danh sách đơn hàng đã xác nhận
    confirmed (req, res, next){
        orderModal.find({status: 'Xác nhận'})
        .then(function(orders){
            orders = orders.map(function(orders){
                return orders.toObject();
            })
            return res.render('./admin/confirmed',{layout:'admin',orders:orders})
        })
        
    }
    // danh sách đơn hàng đang giao
    shipping (req, res, next){
        orderModal.find({status:'Đang giao hàng'})
        .then(function(orders){
            orders = orders.map(function(orders){
                return orders.toObject();
            })
            return res.render('./admin/shipping',{layout:'admin',orders:orders})
        })
            
    }
    complete(req, res, next){
        orderModal.find({status:'Đã hoàn thành'})
        .then(function(orders){
            orders = orders.map(function(orders){
                return orders.toObject();
            })
            var money = orders.map(function(orders){
                return orders.totalMoney
            })
            money = money.reduce(function(total, amount){
                return total + amount;
            })
            return res.render('./admin/complete',{layout:'admin',orders:orders,money:money})
        })
            
    }
    // Xác nhận đơn Hàng
    confimOrder(req, res, next){
        var user = req.data
        user = user.toObject()
        var acc
        orderModal.findOne({_id: req.params.id})
        .then(function(order){
            order = order.toObject()
            return res.render('./admin/orderEdit',{layout:'admin',order:order,acc:user})
        })
    }
    confirmDone(req, res, next){
        var user = req.data
        var formData = req.body
        orderModal.updateOne({_id: req.params.id},{ status:formData.status,confirmBy:user.name },function(){
            res.redirect("/admin/order-manage")
        })
    }
    // quản trị yêu cầu bảo hành
    warrantyPage(req, res, next){
        warrantyModal.find({})
        .sort({date:-1})
        .then(function(data){
            data = data.map(function(data){
                return data = data.toObject()
            })
            return res.render('./admin/warrantyPage',{layout:'admin',data:data})
        })
        
    }
    // gửi yêu cầu bảo hành
    sendwarrantyPage(req, res, next){
        warrantyModal.findOne({_id:req.params.id})
        .then(function(warranty){
            warranty = warranty.toObject()
            AccountModal.find({role:'warranty staff'})
            .then(function(staff){
                staff = staff.map(function(staff){
                    return staff=staff.toObject();
                })
                return res.render('./admin/sendwarrantyPage',{layout:'admin',warranty:warranty,staff:staff})
            })
            

        })
    }
    sendwarrantyDone(req, res, next){
        warrantyModal.updateOne({_id:req.params.id},{staff:req.body.staff})
        .then(function(){
           return res.redirect('/admin/warranty-manage')
        })

    }
    // xem doanh thu 
    turnover(req, res, next){
        var month = req.body.month;
        var year = req.body.year;
        orderModal.find({month:req.body.month,status:"Đã hoàn thành",year:req.body.year})
        .then(function(orders){
            orders = orders.map(function(orders){
                return orders = orders.toObject()
            })
            orders = orders.map(function(orders){
                return orders = orders.totalMoney
            })
            var sum = orders.reduce(function(total, amount){
                return total + amount;
            },0)
            return  res.render('./admin/turnoverDetail',{layout: 'admin',month:month,year:year,sum:sum})
        })
        
    }
    // Log Out
    logOut(req, res, next){
        res.clearCookie('key')
        res.clearCookie('session')
        return res.redirect('/')
    }


} 

module.exports = new Admin;