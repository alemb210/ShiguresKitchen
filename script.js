let cart = JSON.parse(localStorage.getItem("cart")) || {items: [], total: 0}; //initialize cart from local storage or new object if null

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart)); //write to browser storage
}

function AddToCart(item) { 
    cart = GetCart();
    let index = cart.items.findIndex(cartItem => cartItem.name === item.name); //find index of item in cart
    if(index !== -1) {
        cart.items[index].quantity++;
    }
    else {
        cart.items.push(item);
    }
    cart.total = parseFloat((cart.total + item.price).toFixed(2));
    saveCart();
    UpdateCartLink();
    //alert(`${item.name} ${item.image} ${item.price} ${item.quantity} added to cart!`);
    //UpdateCartDisplay();
}

function RemoveFromCart(item) { 
    cart = GetCart();
    let index = cart.items.findIndex(cartItem => cartItem.name === item.name); //find index of item in cart
    if(index === -1) {
        return;
    }
    if(cart.items[index].quantity > 1) { 
        cart.items[index].quantity--;
    }
    else { 
        cart.items.splice(index, 1);
    }
    cart.total = parseFloat((cart.total - item.price).toFixed(2));
    saveCart();
    console.log(cart);
    UpdateCartDisplay();
    UpdateCartLink();
}

function GetCart() {
    return JSON.parse(localStorage.getItem("cart")) || {items: [], total: 0} 
}

function GetCartTotal() { 
    cart = GetCart();
    return cart.total;
}

function GetCartQuantity() { 
    cart = GetCart();
    let sum = 0;
    for(let i = 0; i < cart.items.length; i++) { 
        sum += cart.items[i].quantity;
    }
    return sum;
}

function ClearCart() {
    cart = { items: [], total: 0 };
    saveCart();
    UpdateCartDisplay();
}