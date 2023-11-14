
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName('btn-danger');
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', cartRemove);
    }
    let quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    let addToCart = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCart.length; i++) {
        let button = addToCart[i];
        button.addEventListener('click', addToCartButton);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase)
}

function purchase(){
    alert('Thank you for your purchase');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    cartTotal();
}

function cartRemove(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    cartTotal();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    cartTotal();
}

function addToCartButton(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let src = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title, price, src);
    cartToAdd(title, price, src);
    cartTotal();
}

function cartToAdd(title, price, src) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartNames.length; i++) {
        if (cartNames[i].innerText == title) {
            alert('Item already added to the cart.');
            return;
        }
    }
    let cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${src}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContent;
    cartItems.appendChild(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', cartRemove);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function cartTotal() {
    let cartUpdate = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartUpdate.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let price = cartRow.getElementsByClassName('cart-price')[0];
        let quantity = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let priceTag = parseFloat(price.innerText.replace('$', ''));
        let quantityTag = quantity.value;
        total += priceTag * quantityTag;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
