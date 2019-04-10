const fs = require('fs');

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
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `products` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
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
                        let query = "INSERT INTO `products` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
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
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `products` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `products`.`id` = '" + productId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProduct: (req, res) => {
        let productId = req.params.id;
        let getImageQuery = 'SELECT image from `products` WHERE id = "' + productId + '"';
        let deleteUserQuery = 'DELETE FROM products WHERE id = "' + productId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};