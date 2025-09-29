alert("JavaScript file is linked!");

const btn= document.getElementById("registration_button") as HTMLElement;
const input_name= document.getElementById("username") as HTMLInputElement;
const input_email= document.getElementById("email") as HTMLInputElement;
const input_password= document.getElementById("password") as HTMLInputElement;
const name_correction= document.getElementById("name_correction");
const email_correction= document.getElementById("email_correction");
const password_correction= document.getElementById("password_correction");
input_name?.addEventListener('input', () => {
    console.log('Typing name', input_name.value);
    const namereges: RegExp = /^[a-zA-Z_ ]*$/;

    if (!namereges.test(input_name.value.trim()) && input_name.value.length !== 0) {
        if (name_correction) {
            name_correction.innerHTML = "Insert Correct name";
        }
    } else if (input_name.value.trim().length <= 2 || input_email.value.trim().length > 50) {
        if (name_correction) {
            name_correction.innerHTML = "Name length must be greater than 2 and less than 50";
        }
    } else {
        if (name_correction) {
            name_correction.innerHTML = " ";
        }
    }
});

input_email?.addEventListener('input', () => {
    console.log('Typing email', input_email.value);
    const emailreges: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailreges.test(input_email.value.trim()) && input_email.value.length !== 0) {
        if (email_correction) {
            email_correction.innerHTML = "Insert Correct Email";
        }
    } else if (input_email.value.trim().length <= 5 || input_email.value.trim().length > 50) {
        if (email_correction) {
            email_correction.innerHTML = "Email length must be greater than 5 and less than 50";
        }
    } else {
        if (email_correction) {
            email_correction.innerHTML = " ";
        }
    }
});

input_password?.addEventListener('input', () => {
    console.log('Typing password', input_password.value);
    const passwordreges: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordreges.test(input_password.value.trim()) && input_password.value.length !== 0) {
        if (password_correction) {
            password_correction.innerHTML = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
    } else if (input_password.value.trim().length < 8 || input_password.value.trim().length > 20) {
        if (password_correction) {
            password_correction.innerHTML = "Password length must be greater than 8 and less than 20";
        }
    } else {
        if (password_correction) {
            password_correction.innerHTML = " ";
        }
    }
});


btn?.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    
    const namevalue: string = input_name?.value.trim() || '';
    const emailvalue: string = input_email?.value.trim() || '';
    const passwordvalue: string = input_password?.value.trim() || '';

    if (!emailvalue.includes("@gmail.com") || emailvalue.includes(" ")) { 
        alert("Give me correct email");
        return; 
    }

    if (namevalue.length < 2 || namevalue.length > 50) { 
        alert('Name Length must be between 2 to 50 characters'); 
        return; 
    }

    const namereges: RegExp = /^[a-zA-Z_ ]+$/; 
   
    if (!namereges.test(namevalue)) { 
       alert("Correct your name"); 
       return; 
   }

   const specialreges: RegExp = /[!@#$%^&*(),.?":{}|<>0-9]/; 

   console.log(passwordvalue, passwordvalue.length, input_password, "Khalid");

   if (!specialreges.test(passwordvalue) || passwordvalue.length < 8) { 
       alert("Strengthen your password or increase password length"); 
       return; 
   }

   const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
   const emailExists = existingUsers.some((user: { email: string; }) => user.email === emailvalue);
   
   if (emailExists) {
       alert('Email already exists. Please use a different email.');
       return;
   }

    existingUsers.push({name:namevalue,email:emailvalue,password:passwordvalue})
    localStorage.setItem("users",JSON.stringify(existingUsers));
    console.log(existingUsers);
    alert("Registration Successful");
    window.location.href = '/kandon.html';
  
});