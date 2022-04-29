const $userName = document.querySelector('.user')
const $password = document.querySelector('.password')
const $email = document.querySelector('.email')
const $btn = document.querySelector('.regist_btn')

const BASE_URL = 'https://pbasics.pythonanywhere.com'


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
    .then(r => r.json())
    .then(res => {
        localStorage.setItem('authToken', res.auth_token)
        const token = localStorage.getItem('authToken')
        console.log(token);
        if(token === 'undefined'){
        }else{
            window.open('./index.html' , '_self')
            console.log(token)
        }   
        console.log(res);
    })
})
