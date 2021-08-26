const adminRoute = require('./admin')
const siteRoute = require('./singlePage')
const userRoute = require('./user')
const warranty = require('./warrantystaff')
const seller = require('./seller')
const cart = require('./cart')

function router(app){
    app.use('/admin',adminRoute);
    app.use('/user',userRoute);
    app.use('/warranty-staff',warranty);
    app.use('/seller',seller);
    app.use('/cart',cart);
    app.use('/',siteRoute);
}
module.exports = { router };