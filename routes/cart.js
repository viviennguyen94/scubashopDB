module.exports = function Cart(oldCart) {

    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        let storedItem = this.items[id];
        // if shopping cart is empty, initilize array
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        // else continue adding
        storedItem.qty++;
        storedItem.price = parseFloat(storedItem.item[0].price) * storedItem.qty;
        this.totalQty++;
        this.totalPrice += parseFloat(storedItem.item[0].price);
    };
    this.generateArray = function() {
        this.totalPrice = this.totalPrice.toFixed(2);
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        console.log('arr******: ', arr)
        return arr;
    }
    this.addBy1 = function(id) {
        // clears from shopping cart when not in cart
        if(this.items[id].qty == this.items[id].item[0].qty_in_stock) {
            console.log('max quantity');
        } else {
            this.items[id].qty++;
            this.items[id].price += this.items[id].item[0].price;
            this.totalQty++;
            this.totalPrice += this.items[id].item[0].price;
        }
    }
    this.reduceBy1 = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item[0].price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item[0].price;

        // clears from shopping cart when not in cart
        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    }
    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    }

}
