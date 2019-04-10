module.exports = {
    getHomePage: (req, res) => {
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
                products : result
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
                products : result
            });
        });
    },
    
};