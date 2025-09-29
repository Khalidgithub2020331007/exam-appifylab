alert("JavaScript file is linked!");
const login_btn  = document.getElementById('login_button') as HTMLElement;
const inputemail  = document.getElementById('email') as HTMLInputElement;
const inputpassword  = document.getElementById('password') as HTMLInputElement;
const email_correction = document.getElementById('email_correction');
const password_correction = document.getElementById('password_correction');

if (inputemail) {
    inputemail.addEventListener('input', () => {
        console.log('Typing email', inputemail.value);
        if (!inputemail.value.trim().includes("@gmail.com") || inputemail.value.trim().includes(" ")) {
            if (email_correction) {
                email_correction.innerHTML = "Insert Correct Email";
            }
        } else {
            if (email_correction) {
                email_correction.innerHTML = " ";
            }
        }
    });
}



if (login_btn) {
    login_btn.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        const emailvalue: string = inputemail ? inputemail.value.trim() : '';
        const passwordvalue: string = inputpassword ? inputpassword.value.trim() : '';
        
        console.log(emailvalue, passwordvalue);
        const existinguser=JSON.parse(localStorage.getItem('users') as string)
        
        for (let i: number = 0; existinguser && i < existinguser.length; i += 1) {
            if (existinguser[i].email === emailvalue && existinguser[i].password === passwordvalue) {
                const currentUser: { name: string; email: string; } = {
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