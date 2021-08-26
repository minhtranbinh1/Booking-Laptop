const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// cookie parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// Body parser
const bodyParser = require('body-parser')
app.use(express.urlencoded());
// Database 
const db = require('./app/config/database/index')
db.connect();
// seting Router
const router = require('./app/Router/index');
router.router(app);
// View engine
var exphbs  = require('express-handlebars');
app.engine('hbs', exphbs(
        {
        extname: '.hbs',
        defaultLayout: 'main',
        helpers: {
            index: function (a,b) { 
                 return a+b
            },
            if_eq: function (a,b,opts){
                if (a == b) {
                    return opts.fn(this);
                } else {
                    return opts.inverse(this);
                }
            },
            mutil: function (a,b) { 
                return a*b
            },
            int: function (a){ 
                const y = a.split(".");
                const result =Number(y.join(""));
                return result
            }
            }
        }
        
));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app/views'));
// set static folder 
app.use(express.static(__dirname + '/public'));

app.listen(port , function(){
    console.log(`listening on  http://localhost:${port}`);
});