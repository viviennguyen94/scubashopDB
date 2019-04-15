module.exports = {
    getAdminPage: (req, res) => {
        let query = "SELECT * FROM products ORDER BY id ASC"; // query database to get all the products

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                // res.redirect('/');
                console.log(err)
                return;
            }
            res.render('admin.ejs', {
                title: 'Administrator Page',
                products : result
            });
        });
    },
    addProductPage: (req, res) => {
        res.render('productAdd.ejs', {
            title: 'Welcome to Socka | Add a new product'
            ,message: ''
        });
    },
    addProduct: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }


        let message = '';
        let product_ID = req.body.product_ID;
        let product_name = req.body.product_name;
        let price = req.body.price;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        // let fileExtension = uploadedFile.mimetype.split('/')[1];
        // image_name = image_name + '.' + fileExtension;

        let pID_Query = "SELECT * FROM `products` WHERE id = '" + product_ID + "'";

        db.query(pID_Query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Product ID already exists';
                res.render('productAdd.ejs', {
                    message,
                    title: 'Welcome to Socka | Add a new product'
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the product's details to the database
                        let query = "INSERT INTO `products` (id, product_name, image, price) VALUES ('" +
                            product_ID + "', '" + product_name + "', '" + image_name + "', '" + price + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('productAdd.ejs', {
                        message,
                        title: 'Welcome to Socka | Add a new product'
                    });
                }
            }
        });
    },
    editProductPage: (req, res) => {
        let productId = req.params.id;
        let query = "SELECT * FROM `products` WHERE id = '" + productId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('productEdit.ejs', {
                title: 'Edit Product'
                ,product: result[0]
                ,message: ''
            });
        });
    },
    editProduct: (req, res) => {
        let productId = req.params.id;
        // let product_ID = req.body.first_name;
        let product_name = req.body.product_name;
        let price = req.body.price;

        let query = "UPDATE `products` SET `product_name` = '" + product_name + "', `price` = '" + price + "' WHERE `products`.`id` = '" + productId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProduct: (req, res) => {
        let productId = req.params.id;
        // let getImageQuery = 'SELECT image from `products` WHERE id = "' + productId + '"';
        let deleteUserQuery = 'DELETE FROM products WHERE id = "' + productId + '"';

        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};