"use strict";
// alert('JavaScript file is linked to kandon.html');
Object.defineProperty(exports, "__esModule", { value: true });
const add_task_btn = document.getElementById("add_task"), title_input = document.getElementById("title"), description_input = document.getElementById("description"), assigned_user_input = document.getElementById("assigned_user"), created_by_input = document.getElementById("created_by"), email_correction = document.getElementById("email_correction"), status_input = document.getElementById("status"), todo = document.getElementById("todo"), inprogress = document.getElementById("in-progress"), testing = document.getElementById("testing"), finished = document.getElementById("finished");
function loadTasks() {
    const existTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    console.log("Loading tasks", existTasks);
    todo.innerHTML = '';
    inprogress.innerHTML = '';
    testing.innerHTML = '';
    finished.innerHTML = '';
    existTasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `<div class='test'><strong>Title:</strong> ${task.title} <br> <strong>Description:</strong> ${task.description} <br> <strong>Assigned User:</strong> ${task.assigned_user} <br> <strong>Created By:</strong> ${task.created_by} <br> <strong>Status:</strong> ${task.status} <br><button id="move">Move</button><br></div>`;
        if (task.status === 'todo') {
            todo.appendChild(li);
        }
        else if (task.status === 'in-progress') {
            inprogress.appendChild(li);
        }
        else if (task.status === 'testing') {
            testing.appendChild(li);
        }
        else if (task.status === 'finished') {
            finished.appendChild(li);
        }
    });
}
window.onload = loadTasks;
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
    const status_value = status_input?.value.trim() || '';
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
    const existTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    console.log("todo Tasks", existTasks);
    console.log(currentUser.email, existingUsers, existTasks);
    const emailExists = existingUsers.some((user) => user.email === assigned_user_input.value);
    console.log(emailExists);
    if (!emailExists) {
        alert("Assigned user email does not exist");
        console.log("Assigned user email does not exist");
        return;
    }
    existTasks.push({
        title: titlevalue,
        description: descriptionvalue,
        assigned_user: assigned_user_value,
        created_by: currentUser.email,
        status: status_value,
    });
    localStorage.setItem("todoTasks", JSON.stringify(existTasks));
    console.log("todo Tasks after push", existTasks);
    console.log(status_input.value);
    alert("Task Added Successfully");
    // existingUsers.push({name:namevalue,email:emailvalue,password:passwordvalue})
    // localStorage.setItem("users",JSON.stringify(existingUsers));
    // console.log(existingUsers);
    // alert("Registration Successful");
    // window.location.href = '/kandon.html';
});
//# sourceMappingURL=kandon.js.map