const cart_items = document.querySelector('#cart .cart-items');


const parentContainer = document.getElementById('EcommerceContainer');
parentContainer.addEventListener('click',(e)=>{

    if (e.target.className=='shop-item-button'){
        const id = e.target.parentNode.parentNode.id
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
        let total_cart_price = document.querySelector('#total-value').innerText;
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return
        }
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`in-cart-${id}`);
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column'>
        <input type="text" value="1">
        <button>REMOVE</button>
    </span>`
        cart_items.appendChild(cart_item)

        const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)
    }
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
})


window.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:3000/products").then((data) =>{
        console.log(data)
        if(data.request.status === 200){
            const products = data.data.products;
            const parentSection = document.getElementById('Products')
            products.forEach(product => {
                const productHTML = `
                <div>
                    <h1>${product.title}</h1>
                    <img src=${product.imageUrl}></img>
                    <button onClick="addToCart(${product.id})">Add To Cart</button>
                </div>`

                parentSection.innerHTML += productHTML

                
            });
        }

    })
})

function addToCart(productId){
    axios.post("http://localhost:3000/cart",{productId : productId})
        .then((response) => {
            if(response.status === 200){
                notifyUsers(response.data.message)
            }
        })
        .catch((err) => console.log(err))
}

function notifyUsers(message){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>Your Product : <span>${message.title}</span> is added to the cart<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)

}