// INICIALIZACION DE CARRITO 
let total = 0; // Inicilizo una variable para calcular el total del carrito
let cart = []; // Inicializo un array de carrito
let productFeatured = [];
const productContainer = document.getElementById('product-container'); // OBTENGO EL ELEMENTO DEL CATALOGO
const trolleyContainer = document.getElementById('trolley-container'); //
const productContainerMain = document.getElementById('product-container-main');
const totalPrice = document.getElementById('total-price');
const stockProducts = []; // guardo los productos en una varibale

function recoverStock() {
    let stock = JSON.parse(localStorage.getItem("stock"));
    if (stock) {
        stock.forEach(objeto => stockProducts.push(objeto)); // Por cada objeto que tenga el stockguardarmelo en el array 
    }
}
$.getJSON(`products.json`, function (data) { // Obtengo los datos del archiv JSONS
    localStorage.setItem("stock", JSON.stringify(data));
    recoverStock();

    if (window.location.pathname === "/productos.html") {
        showProducts(data);
    } else {
        const productFeatured = data.filter(prod => prod.destacado === "true");
        showProductsMain(productFeatured);
    }
});
//showProducts(stockProducts); // Muestro los productos en el html 

// FUNCION PARA MOSTRAR PRODUCTOS
function showProducts(array) {
    for (const product of array) {
        let div = document.createElement('div');
        div.classList.add("product");
        div.innerHTML += `<div class="card">
                            <img src=${product.image} class="card-img-top" alt=""/>
                            <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price}</p>
                            <div class="button-properties">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#showModal" id="button${product.id}" class="btn btn-primary mb-2 px-5 text-uppercase w-100">Comprar ahora</button>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#showModal" id="addProductmore"${product.id}" class="btn btn-outline-primary px-5 text-uppercase">Agregar al carrito</button>
                            </div>
                            </div>
                    </div>`
        productContainer.appendChild(div);
        let button = document.getElementById(`button${product.id}`);
        button.addEventListener(`click`, () => {
            addToCart(product.id);
        })
    }
}
//FUNCION PARA MOSTRAR PRODUCTOS EN EL MAIN
function showProductsMain(array) {
    for (const prod of array) {
        let div = document.createElement('div');
        div.classList.add("product");
        div.innerHTML += `<div class="card">
                            <img src=${prod.image} class="card-img-top" alt=""/>
                            <div class="card-body">
                            <h5 class="card-title">${prod.name}</h5>
                            <p class="card-text">$${prod.price}</p>
                            <div class="button-properties">
                            <button type="button" id="button${prod.id}" class="btn btn-primary mb-2 px-5 text-uppercase w-100">Comprar ahora</button>
                            <button type="button" id="addProductmore"${prod.id}" class="btn btn-outline-primary px-5 text-uppercase fs-">Agregar al carrito</button>
                            </div>
                            </div>
                    </div>`
        productContainerMain.appendChild(div);
        let button = document.getElementById(`button${prod.id}`);
        button.addEventListener(`click`, () => {
            addToCartMain(prod.id);
        })
    }
}
// funcion de agregar al carrito en Productos
function addToCart(id) {
    // SE FRENA EL OBJETO A QUE SE REPITIERA
    let repeated = cart.find(prodRepeated => prodRepeated.id == id);
    if (repeated) {
        repeated.stock = repeated.stock + 1;
        document.getElementById(`stock${repeated.id}`).innerHTML = `<p id="stock${repeated.id}"> Cantidad: ${repeated.stock}</p>`
        updateCart();
    } else {
        let addToProduct = stockProducts.find(prod => prod.id == id);
        cart.push(addToProduct);
        addToProduct.stock = 1;
        updateCart();
        let div = document.createElement(`div`);
        div.classList.add('productInCart');
        div.innerHTML = `<p>${addToProduct.name}</p>
                        <p>Precio: $${addToProduct.price}</p>
                        <p id="stock${addToProduct.id}"> Cantidad: ${addToProduct.stock}</p>
                        <button id="remove${addToProduct.id}" class="button-remove"> <i class="fas fa-backspace"></i></button>`
        trolleyContainer.appendChild(div);

        //BOTON ELIMINAR DONDE VA A ELIMINAR LO QUE SE ESTE HACIENDO CLICK

        let buttonRemove = document.getElementById(`remove${addToProduct.id}`);

        buttonRemove.addEventListener(`click`, () => {
            buttonRemove.parentElement.remove();
            cart = cart.filter(prodE => prodE.id != addToProduct.id);
            updateCart();
        });
    }

}

// funcion de agregar al carrito en el Main
function addToCartMain(id) {
    let addToProductMain = productFeatured.find(prod => prod.id == id);
    cart.push(addToProductMain);
    console.log(cart);
    let div = document.createElement(`div`);
    div.classList.add('productInCart');
    div.innerHTML = `<p>${addToProductMain.name}</p>
                        <p>$${addToProductMain.price}</p>   
                        <button id="remove${addToProductMain.id}" class="button-remove"> <i class="fas fa-backspace"></i></button>`
    trolleyContainer.appendChild(div);
}

function updateCart() {
    totalPrice.innerText = cart.reduce((acc, el) => acc + (el.price * el.stock), 0).toFixed(3);
}

/*
// FUNCION PARA REMOVER PRODUCTO DEL CARRITO

function removeProduct(array, product){

    array.splice(product,1)
}
removeProduct(cart,stockProducts[3])

// FUNCION PARA CALCULAR EL TOTAL DEL CARRITO

function calculateTotal(){

    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price 
    }
    console.log(total.toFixed(2))
}
calculateTotal();
*/