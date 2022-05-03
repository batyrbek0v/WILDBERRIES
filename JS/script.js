


// DOM-ELEMENTS
const $container = document.querySelector('.container')
const $row = document.querySelector('.row')
const $create = document.querySelector('.create')
const $signout = document.querySelector('.signout')

// DOM-ELEMENTS-END
const BASE_URL = 'https://pbasics.pythonanywhere.com'

const auth_token = localStorage.getItem('authToken')

window.addEventListener('load', () => {
    getRequest()
    if(!auth_token){
        window.open('./auth.html' , '_self')
    }
})

function getRequest() {
    fetch(`${BASE_URL}/products`)
    .then(r => r.json())
    .then(res => cardTemplate(res))
}

function cardTemplate(base) {
    const newBase = base.map(({id,description,title,price,image,image_url}) => {
        return `
            <div class="card">
                <div class="сard_title">
                    <h2>
                        <span class="id">ID${id}</span> 
                        /
                        ${title}
                    </h2>
                </div>
                <div class="card_body">
                    <img src="${image ? image : image_url}">
                </div>
                <div class="card_footer">
                    <div class="price">
                        <p>${description} / ${price}$</p>
                    </div>                    
                    <div class="buttons">
                        <button class="footer_btn" onclick="deleteCards('${id}')">Delete</button>
                        <button class="footer_btn" onclick="editCards('${id}')">Edit</button>
                    </div>
                </div>
            </div>
        `
    }).reverse().join('')
    $container.innerHTML = newBase
}

// ----------------------------------------------------- DELETE CARDS-----------------------------------------

function deleteCards(id) {
    fetch(`${BASE_URL}/products/delete/${id}`, {
        method:'DELETE',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Token ${auth_token}`
        }
    })
    .then(getRequest)
}

// ----------------------------------------------------- EDIT CARDS-----------------------------------------

function editCards(id) {
    fetch(`${BASE_URL}/products/update/${id}`, {
        method:"PATCH",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${auth_token}`
        },
        body:JSON.stringify({
            title: prompt('Title'),
            description: prompt('Desc'),
            price: +prompt('price'),
            image_url:prompt('image_url'),
            category: +prompt('category'),
        }),
    })
    .then(res => res.json())
    .then(getRequest)
}

// ----------------------------------------------------- CREATE CARDS-----------------------------------------

$create.addEventListener('click' , e => {
    e.preventDefault()
    fetch(`${BASE_URL}/products/create/`, {
        method:"POST",
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Token ${auth_token}`
        },
        body:JSON.stringify({
            title: prompt('Title'),
            description: prompt('Desc'),
            price: +prompt('price'),
            image_url:prompt('image_url'),
            category: +prompt('category'),
        }),
    })
    .then(res => res.json())
    .then(getRequest)
})

// ----------------------------------------------------- SIGN OUT-----------------------------------------

$signout.addEventListener('click', e => {
    e.preventDefault()
    localStorage.clear()    
    window.open('./auth.html' , '_self')
})

// ===================================================================================================================================================