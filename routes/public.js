let Cart = require('./cart');
module.exports = {
    getHomePage: (req, res) => {

        if(!req.session.test) {
            req.session.test = 'OK';
            // res.send('OK');
        }
        
        let query = "SELECT * FROM products ORDER BY id ASC"; // query database to get all the products

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                // res.redirect('/');
                console.log(err)
                return;
            }
            res.render('index.ejs', {
                title: 'Home Page',
                products : result,
                // session: req.session,
            });
        });
    },
    getProductPage: (req, res) => {
        let query = "SELECT * FROM products ORDER BY id ASC"; // query database to get all the products

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                // res.redirect('/');
                console.log(err)
                return;
            }
            res.render('productPage.ejs', {
                title: 'Product Page',
                products : result,
            });
        });
    },
    addToCart: (req, res) => {

        let product_ID = req.body.product_ID;
        console.log(product_ID);
        let cart = new Cart(req.session.cart ? req.session.cart : {})
    
        let pID_Query = "SELECT * FROM `products` WHERE id = '" + product_ID + "'";
    
        // finds object from database by id (cliked on)
        db.query(pID_Query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            cart.add(result, product_ID);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/products')
        });
    },
    getCartPage: (req, res) => {
        if(!req.session.cart) {
            return res.render('viewCart.ejs', {products: null});
        }
        let cart = new Cart(req.session.cart);
        res.render('viewCart.ejs', {
            title: 'Shopping Cart',
            products : cart.generateArray(), 
            totalPrice: cart.totalPrice,
        });
    },
    addBy1: (req, res) => {
        let productId = req.params.id;
        let cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.addBy1(productId);
        req.session.cart = cart;
        res.redirect('/viewcart');
    },
    reduceBy1: (req, res) => {
        let productId = req.params.id;
        let cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.reduceBy1(productId);
        req.session.cart = cart;
        res.redirect('/viewcart');
    },
    removeItem: (req, res) => {
        let productId = req.params.id;
        let cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.removeItem(productId);
        req.session.cart = cart;
        res.redirect('/viewcart');

    },
    fillBillingInfo: (req, res) => {
        // does not allow user to checkout unless cart has stuff
        if(!req.session.cart) {
            return res.render('viewCart.ejs', {products: null});
        }

        let cart = new Cart(req.session.cart);

        // guest
        if (req.session.user == null) {
            res.render('billingInfo', {
                messagetitle: 'Finalize products'
                ,message: '',
                products: cart.generateArray(),
                totalPrice: cart.totalPrice
            })
        }
        // user login
        else {
            res.render('userSkipBillingInfo', {
                messagetitle: 'Confirm Shipping Info / Cart'
                ,message: '',
                products: cart.generateArray(),
                totalPrice: cart.totalPrice
            })
        }
    }, 
    checkOut: (req, res) => {
        let full_cname = req.body.firstname;
        let email = req.body.email;
        let address = req.body.address;
        // let city = req.body.city;
        // let state = req.body.state;
    
        let cardnum = req.body.cardnumber;

        if (req.session.user == null) {
            guestCheckOut();
            // query to extract orderID from orders table to put into orders_items
        } else {
            userCheckOut();
            // query to extract orderID from orders table to put into orders_items
        }

        function OrderIDAutoQuery() {
            let query22 = "SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'scubashop' AND TABLE_NAME = 'orders'"
            db.query(query22, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                console.log('orderID: ', result);
                extractOrderID(result);
            });
        }
        
        function extractOrderID(result) {
            let orderID = result[0].AUTO_INCREMENT - 1;
            console.log(orderID);
            if(!req.session.cart) {
                return res.render('orderCompleted', {
                    messagetitle: 'Order Failed'
                    ,message: 'Order failed'
                });
            }
    
            let cart = new Cart(req.session.cart);
            let products = cart.generateArray();
            console.log('products')
            products.forEach((x, index) => {
                let pid = x.item[0].id;
                let qty = x.qty;
                let ship_status = '-'

                console.log("qty: ", qty);
    
                let query33 = "INSERT INTO `order_items` (orderID, pid, qty, ship_status) VALUES ('" +
                    orderID + "', '" + pid + "', '" + qty + "', '" + ship_status + "')";
    
                db.query(query33, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    console.log("added to order_items (list)!");
                });


                // subtract bought quantity from product quantity
                let querySubtract = "UPDATE `products` SET `qty_in_stock` = (SELECT `qty_in_stock` WHERE `id` = " + pid + ") - " + qty + " WHERE `id` = " + pid;
                db.query(querySubtract, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    console.log("successfully updated values!")

                })
            })
            // DONE!
            res.redirect('/orderCompleted'); 
        }

        function userCheckOut() {
            let query = "INSERT INTO `orders` (cid, card_num) VALUES ('" +
            req.session.user.cid + "', '" + cardnum + "')";
            db.query(query, (err, result) => {
                if(err) {
                    return res.status(500).send(err);
                }
                console.log("added user to orders!");
                OrderIDAutoQuery();
            })
        }
    
        function guestCheckOut() {
            let query = "INSERT INTO `customers` (full_cname, email, address) VALUES ('" +
            full_cname + "', '" + email + "', '" + address + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                console.log("added to customers!");
            });
        
            // another query to extract previously inserted cid to input into orders table
            let query2 = "SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'scubashop' AND TABLE_NAME = 'customers'"
        
            db.query(query2, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                console.log('cid', result);
                extractCID(result);
            });
            function extractCID(result) {
                let cid = result[0].AUTO_INCREMENT - 1;
                let query3 = "INSERT INTO `orders` (cid, card_num) VALUES ('" +
                    cid + "', '" + cardnum + "')";
                db.query(query3, (err, result2) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    console.log("added to orders!");
                    OrderIDAutoQuery();
                });
            }
        }
    }
        
};