"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
alert('JavaScript file is linked to kandon.html');
const add_task_btn = document.getElementById("add_task"), title_input = document.getElementById("title"), description_input = document.getElementById("description"), assigned_user_input = document.getElementById("assigned_user"), created_by_input = document.getElementById("created_by"), email_correction = document.getElementById("email_correction");
assigned_user_input?.addEventListener('input', () => {
    console.log('Typing email', assigned_user_input.value);
    if (!assigned_user_input.value.includes("@gmail.com") || assigned_user_input.value.includes(" ")) {
        if (email_correction) {
            email_correction.innerHTML = "Insert Correct Email";
        }
        return;
    }
    else {
        email_correction.innerHTML = " ";
    }
});
add_task_btn?.addEventListener('click', (e) => {
    // console.log('Add task button clicked 2');
    e.preventDefault();
    const titlevalue = title_input?.value.trim() || '';
    const descriptionvalue = description_input?.value.trim() || '';
    const assigned_user_value = assigned_user_input?.value.trim() || '';
    const created_user_value = created_by_input?.value.trim() || '';
    if (!assigned_user_value.includes("@gmail.com") || assigned_user_value.includes(" ")) {
        alert("Give me correct email");
        return;
    }
    if (titlevalue.length < 2 || titlevalue.length > 50) {
        alert('Title must be between 2 to 50 characters');
        return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentuser') || 'null');
    const todoTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    console.log("todo Tasks", todoTasks);
    console.log(currentUser.email, existingUsers);
    const emailExists = existingUsers.some((user) => user.email === assigned_user_input.value);
    console.log(emailExists);
    if (emailExists) {
        todoTasks.push({
            title: titlevalue,
            description: descriptionvalue,
            assigned_user: assigned_user_value,
            created_by: currentUser.email,
            status: 'todos',
        });
        alert("Task Added Successfully");
    }
    else {
        alert("Assigned user email does not exist");
        console.log("Assigned user email does not exist");
        return;
    }
    // existingUsers.push({name:namevalue,email:emailvalue,password:passwordvalue})
    // localStorage.setItem("users",JSON.stringify(existingUsers));
    // console.log(existingUsers);
    // alert("Registration Successful");
    // window.location.href = '/kandon.html';
});
//# sourceMappingURL=kandon.js.map