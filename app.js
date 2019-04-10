const express = require('express'),
    path = require('path')
const mysql = require('mysql'),
    bodyParser = require('body-parser')

// Create connection
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'scubashop'
})

const app = express();

// 
const {getHomePage, getProductPage} = require('./routes/public');
const {getAdminPage, addProductPage, addProduct, deleteProduct, editProduct, editProductPage} = require('./routes/admin');

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql Connected ... ');
})

global.db = db;

// home page (or index)
app.get('/', getHomePage);
// product page
app.get('/products', getProductPage);
// all admin page privileges
app.get('/admin', getAdminPage);
app.get('/add', addProductPage);
app.get('/edit/:id', editProductPage);
app.get('/delete/:id', deleteProduct);
app.post('/add', addProduct);
app.post('/edit/:id', editProduct);


// configure middleware
app.set('port', process.env.port || 3000); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

let port = 3000;

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