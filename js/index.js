let regBtn = document.querySelectorAll(".registration span");
let loginForm = document.querySelector(".login-form");

let userNameReg = document.querySelector('#user-name-reg');
let userPassReg = document.querySelector('#user-password-reg');

let userName = document.querySelector('#user-name');
let userPass = document.querySelector('#user-password');

let registerBtn = document.querySelector(".register-btn");
let enterBtn = document.querySelector(".enter-btn");

let errorMesReg = document.querySelector(".reg .error-mes");
let errorMesEn = document.querySelector(".enter .error-mes");

for(let el of regBtn){
    el.addEventListener("click", function (){
        loginForm.classList.toggle("toggle-reg");
    })
}

let errMes = (err) => {
    err.classList.add("error-brd");
    err.setAttribute("placeholder", "пустое поле")
}

let removeErrMes = (remove) => {
    remove.classList.remove("error-brd");
    remove.removeAttribute("placeholder")
}

let cleanUpFieldsReg = [userNameReg, userPassReg];
let cleanUpFieldsLog = [userName, userPass]

let cleanUpErrors = (cleanUpFields) => {
    for(let el of cleanUpFields) {
        removeErrMes(el);
    }
}

let isEmpty = (name, pass) => {
    let emptyField = false;
    if(name.value === "") {
        errMes(name)
        emptyField = true
    }
    if(pass.value === "") {
        errMes(pass)
        emptyField = true
    }
    return emptyField
}

registerBtn.addEventListener("click", function (e){
    e.preventDefault();
    let loginFormWrap = document.querySelector(".form-wrapper");
    cleanUpErrors(cleanUpFieldsReg)
    if(isEmpty(userNameReg, userPassReg)) {
        return
    }

    let storedData = localStorage.getItem(userNameReg.value);
    if(storedData) {
        errorMesReg.classList.add("show");
    } else {
        let storedObj = {
            "userName": userNameReg.value,
            "userPassword": userPassReg.value
        }
        localStorage.setItem(userNameReg.value, JSON.stringify(storedObj));
        loginFormWrap.classList.add("hide");
        if (loginFormWrap.classList.contains("hide")) {
            setTimeout(function () {
                window.location.href = 'main.html';
            }, 3000);
        }
    }
})

enterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanUpErrors(cleanUpFieldsLog)
    if(isEmpty(userName, userPass)) {
        return
    }
    let storedData = localStorage.getItem(userName.value);
    if(storedData) {
        if(userPass.value === JSON.parse(storedData).userPassword) {
            window.location.href = 'main.html';
            return
        }
    }
    errorMesEn.classList.add("show");
})
//
// window.addEventListener('DOMContentLoaded', function(){
//     let checkbox = document.querySelector('#remember');
//     if(localStorage.getItem('onChecked') === 'true'){
//         checkbox.checked = true;
//     }
//     checkbox.addEventListener('click', function(){
//         localStorage.setItem('onChecked', 'true');
//     });
//
// })




