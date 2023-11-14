if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready ();
}

function ready(){
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons; i++) {
        let button = removeCartItemButtons[i] 
        button.addEventListener('click', addToCart)
    }
}