"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// alert("JavaScript file is linked!");
const login_btn = document.getElementById('login_button');
const inputemail = document.getElementById('email');
const inputpassword = document.getElementById('password');
const email_correction = document.getElementById('email_correction');
const password_correction = document.getElementById('password_correction');
if (inputemail) {
    inputemail.addEventListener('input', () => {
        console.log('Typing email', inputemail.value);
        if (!inputemail.value.trim().includes("@gmail.com") || inputemail.value.trim().includes(" ")) {
            if (email_correction) {
                email_correction.innerHTML = "Insert Correct Email";
            }
        }
        else {
            if (email_correction) {
                email_correction.innerHTML = " ";
            }
        }
    });
}
if (login_btn) {
    login_btn.addEventListener('click', (e) => {
        e.preventDefault();
        const emailvalue = inputemail ? inputemail.value.trim() : '';
        const passwordvalue = inputpassword ? inputpassword.value.trim() : '';
        console.log(emailvalue, passwordvalue);
        const existinguser = JSON.parse(localStorage.getItem('users'));
        for (let i = 0; existinguser && i < existinguser.length; i += 1) {
            if (existinguser[i].email === emailvalue && existinguser[i].password === passwordvalue) {
                const currentUser = {
                    'name': existinguser[i].name,
                    'email': existinguser[i].email,
                };
                localStorage.setItem('currentuser', JSON.stringify(currentUser));
                alert('Login Successful');
                window.location.href = "kandon.html";
                return;
            }
        }
        alert('No User');
    });
}
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
//# sourceMappingURL=index.js.map