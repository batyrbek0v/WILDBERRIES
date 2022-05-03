const $userName = document.querySelector('.user')
const $password = document.querySelector('.password')
const $email = document.querySelector('.email')
const $btn = document.querySelector('.regist_btn')

const BASE_URL = 'https://pbasics.pythonanywhere.com'
const token = localStorage.getItem('authToken')

window.addEventListener('load' , () => {
    if(token){
        window.open('./index.html' , '_self')
    }
})
$btn.addEventListener('click', e => {
    e.preventDefault()
    fetch(`${BASE_URL}/auth/token/login` , {
        method: 'POST',
        body:JSON.stringify({
            username:$userName.value.trim(),
            password:$password.value.trim(),
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(res => {
        if(res.status < 400){
            return res
        }
    })
    .then(r => r.json())
    .then(res => {
        setToken = localStorage.setItem('authToken', res.auth_token)
        window.open('./index.html' , '_self')
    })
})
