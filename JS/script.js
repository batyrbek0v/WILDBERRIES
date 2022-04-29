


// DOM-ELEMENTS
const $container = document.querySelector('.container')
const $row = document.querySelector('.row')
// DOM-ELEMENTS-END
const BASE_URL = 'https://pbasics.pythonanywhere.com'

const auth_token = localStorage.getItem('authToken')

window.addEventListener('load', () => {
    fetch(`${BASE_URL}/products`)
    .then(r => r.json())
    .then(res => cardTemplate(res))
})

function getRequest(cb) {
    fetch(`${BASE_URL}/products`)
       .then(r => r.json())
}
 
const requests = {
    delete:(url, auth_token) => {
        return fetch(url, {
            method:'DELETE',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Token ${auth_token}`
            }
        })
        .then(res => res.json())
    }
}


function cardTemplate(base) {
    const newBase = base.map(({id,description,title,price,image,image_url}) => {
        return `
            <div class="card">
                <div class="сard_title">
                    <h2>
                        <span class="id">ID${id}</span> 
                        /
                        ${description}
                    </h2>
                </div>
                <div class="card_body">
                    <img src="${image ? image : image_url}">
                </div>
                <div class="card_footer">
                    <div class="price">
                        <p>${title} / ${price}$</p>
                    </div>                    
                    <div class="buttons">
                        <button class="footer_btn" onclick="deleteCards('${id}')">Delete</button>
                        <button class="footer_btn">Create</button>
                        <button class="footer_btn">Update</button>
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
    .then(requests.delete)
}
// ----------------------------------------------------- DELETE CARDS-END-----------------------------------------