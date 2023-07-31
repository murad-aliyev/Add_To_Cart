const productsData = [
    { id: 1, title: "Flower", image: "flower.jpg", desc: "This is some description of product", price: 39.90 },
    { id: 2, title: "House", image: "house.jpeg", desc: "This is some description of product", price: 139000.00 },
    { id: 3, title: "Car", image: "car.jpg", desc: "This is some description of product", price: 21999.90 },
    { id: 4, title: "Book (LoTR)", image: "book.jpg", desc: "This is some description of product", price: 59.90 },
    { id: 5, title: "Flower Title 5", image: "house.jpeg", desc: "This is some description of product", price: 139.90 },
    { id: 6, title: "Flower Title 6", image: "car.jpg", desc: "This is some description of product", price: 139.90 },
    { id: 7, title: "Flower Title 7", image: "flower.jpg", desc: "This is some description of product", price: 139.90 },
    { id: 8, title: "Flower Title 8", image: "house.jpeg", desc: "This is some description of product", price: 139.90 },
    { id: 9, title: "Flower Title 9", image: "car.jpg", desc: "This is some description of product", price: 139.90 },
    { id: 10, title: "Flower Title 10", image: "flower.jpg", desc: "This is some description of product", price: 139.90 }
]

const basketButton = document.querySelector('.login');
const sidebar = document.getElementById('sidebar');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
let cardsDiv = document.getElementById("cards");

function allCards() {
    productsData.forEach((element) => {

        let cardStr = `
            <div id="${element.id}" class="card">
                <div class="img-div">
                    <img class="card-img" src="./images/${element.image}" alt=${element.title}>
                </div>
                <div class="text">
                    <h3>${element.title}</h3>
                    <p>${element.desc}</p>
                    <p class="price">${element.price} $</p>
                </div>
                <button class="signup">Add to cart</button>
            </div>
            `
        cardsDiv.innerHTML += cardStr;
    })
}

allCards()

const cartData = [];

function updateCart() {
    cartItems.innerHTML = '';

    let total = 0;
    cartData.forEach(item => {
        total += item.price * item.count;
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="./images/${item.image}" alt="${item.title}">
            <span>${item.title} (${item.count}x)</span>
            <span>$${item.price}</span>
        `;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;
}

basketButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

function addToCart(product) {

    const contain = cartData.find(element => element.id == product.id);
    if (contain) {
        contain.count++
    }
    else {
        cartData.push(product);
        product.count = 1;
    }

    updateCart();
    localStorage.setItem('cartData', JSON.stringify(cartData));
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('signup')) {
        const cardId = event.target.parentNode.id;
        const selectedProduct = productsData.find(product => product.id.toString() === cardId);
        if (selectedProduct) {
            addToCart(selectedProduct);
        }
    }
});

const savedCartData = localStorage.getItem('cartData');
if (savedCartData) {
    cartData = JSON.parse(savedCartData);
    updateCart();
}
