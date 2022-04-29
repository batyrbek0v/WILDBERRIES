const $userName = document.querySelector('.user')
const $password = document.querySelector('.password')
const $email = document.querySelector('.email')
const $btn = document.querySelector('.regist_btn')

const BASE_URL = 'https://pbasics.pythonanywhere.com'

$btn.addEventListener('click', e => {
    e.preventDefault()
    fetch(`${BASE_URL}/auth/users/` , {
        method: 'POST',
        body:JSON.stringify({
            username:$userName.value.trim(),
            password:$password.value.trim(),
            email:$email.value.trim()
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(r => {
        if(r.status < 400){
            window.open('./auth.html' , '_self')
        }
        return r.json()
    })
    .then(res => {
        console.log(res);
    })
})

