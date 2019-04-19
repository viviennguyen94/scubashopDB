const express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    session = require('express-session');
// const router = express.Router();

// Create connection
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'scubashop'
})

const app = express();

const {getHomePage, getProductPage, addToCart, getCartPage, addBy1, reduceBy1, removeItem, fillBillingInfo, checkOut} = require('./routes/public');
const {getAdminPage, addProductPage, addProduct, deleteProduct, editProduct, editProductPage, orderDetails, orderShippingStatus} = require('./routes/admin');

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql Connected ... ');
})

global.db = db;

let port = 3000;
// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

'use strict';
// using sessions for shopping cart purposes
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 1000000 }
}));
// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
    // if (!req.user)
    //     res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.locals.session = req.session;
    next();
});

app.get('/test', (req, res) => {
    res.send(req.session.test); // 'OK'
});

// home page (or index)
app.get('/', getHomePage);
// // product page
app.get('/products', getProductPage);
// all admin page privileges
app.get('/admin', getAdminPage);
app.get('/add', addProductPage);
app.get('/edit/:id', editProductPage);
app.get('/delete/:id', deleteProduct);
app.post('/add', addProduct);
app.post('/edit/:id', editProduct);

// shopping cart page and options
app.post('/products', addToCart)

// view cart page
app.get('/viewcart', getCartPage)
app.get('/add1/:id', addBy1);
app.get('/reduce1/:id', reduceBy1);
app.get('/removeCart/:id', removeItem)

// billing and checkout
app.get('/billing', fillBillingInfo)
app.post('/billing', checkOut)

// bought success (loaded into order list of database)
app.get('/orderCompleted', function(req, res) {
    // clears cart after insertion into query
    req.session.cart = null;
    res.render('orderCompleted', {
        messagetitle: 'Order Success'
        ,message: 'Order succeeded'
    })
})

// order details for admin only
app.get('/orderDetails', orderDetails);
app.get('/orderShippingStatus', orderShippingStatus);

// testing out login
app.get('/login', function(req, res) {
    // res.sendFile(path.join(__dirname+'/login.html'));
    let message = '';
    res.render('login', {message: message})
})

app.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		db.query('SELECT * FROM customers WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
                req.session.username = username;
                req.session.user = results[0];
                console.log(results[0].cid);
				res.redirect('/');
			} else{
                message = 'Incorrect username and/or password!';
                res.render('login',{message: message});
            }			
			res.end();
		});
	} else {
		res.render('login',{message: message});
	}
});

app.get('/logout', function(req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            } else {
                req.session = null;
                res.redirect('/');
            }
        });
    }
})

app.get('/signup', function(req, res) {
    message = '';
    res.render('signUp', {message: message});
})

app.post('/signup', function(req, res) {
    message = '';
    if(req.method == "POST"){
        let post  = req.body;
        let fname= post.full_name;
        let address = post.address;
        let email = post.email;
        let name= post.user_name;
        let pass= post.password;
        
    
        let sql = "INSERT INTO `customers`(`full_cname`,`email`,`address`,`username`, `password`) VALUES ('" + fname + "','" + email + "','" + address + "','" + name + "','" + pass + "')";
    
        db.query(sql, function(err, result) {
    
            message = "Succesfully! Your account has been created.";
            res.render('signUp',{message: message});
        });
    
    } else {
        res.render('signUp');
    }
})
// connect to port
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})

// Entered onto phpmyadmin
// CREATE DATABASE scubashop;
// CREATE TABLE IF NOT EXISTS `products` (
//   `id` int(5) NOT NULL AUTO_INCREMENT,
//   `product_name` varchar(255) NOT NULL,
//   `price` double NOT NULL,
//   `image` varchar(255) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;