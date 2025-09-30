"use strict";
// alert('JavaScript file is linked to kandon.html');
Object.defineProperty(exports, "__esModule", { value: true });
const add_task_btn = document.getElementById("add_task"), title_input = document.getElementById("title"), description_input = document.getElementById("description"), assigned_user_input = document.getElementById("assigned_user"), created_by_input = document.getElementById("created_by"), email_correction = document.getElementById("email_correction"), status_input = document.getElementById("status"), todo = document.getElementById("todo"), inprogress = document.getElementById("in-progress"), testing = document.getElementById("testing"), finished = document.getElementById("finished"), logout_btn = document.getElementById('logout_btn'), currentUser = JSON.parse(localStorage.getItem('currentuser') || 'null');
(function () {
    // IIFE code block
    if (currentUser === null) {
        alert('Please Login');
        window.location.href = 'index.html';
        return;
    }
})();
logout_btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked logout');
    localStorage.setItem('currentuser', '');
    window.location.href = 'index.html';
});
function loadTasks() {
    const existTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    console.log("Loading tasks", existTasks);
    todo.innerHTML = '';
    inprogress.innerHTML = '';
    testing.innerHTML = '';
    finished.innerHTML = '';
    let i = 0;
    existTasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `<div class='test'>
                                <b>Title:</b> ${task.title} <br>
                                <b>Description:</b> ${task.description} <br> 
                                <b>Assigned User:</b> ${task.assigned_user} <br> 
                                <b>Created By:</b> ${task.created_by} <br> 
                                <b>Status:</b> ${task.status} <br>
                                <span> <button id="moveleft${i}">Move Left</button>

                                <button id="moveright${i}">Move Right</button><br>
                                </span>
                                <button id="delete${i}" style="background-color: red;">Delete</button><br>
                                <hr>
                                </div> `;
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
        i += 1;
    });
}
loadTasks();
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
function movetask(index) {
    const existtasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    const task = existtasks[index];
    if (task.status === 'todo') {
        task.status = 'in-progress';
    }
    else if (task.status === 'in-progress') {
        task.status = 'testing';
    }
    else if (task.status === 'testing') {
        task.status = 'finished';
    }
    else if (task.status === 'finished') {
        alert('No space in right');
        return;
    }
    existtasks[index] = task;
    localStorage.setItem('todoTasks', JSON.stringify(existtasks));
    loadTasks();
}
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
function deletetask(ind) {
    const existtasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    const task = existtasks[ind];
    existtasks.splice(ind, 1);
    localStorage.setItem('todoTasks', JSON.stringify(existtasks));
    loadTasks();
}
function movetaskleft(ind) {
    const existtasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    const task = existtasks[ind];
    if (task.status === 'in-progress') {
        task.status = 'todo';
    }
    else if (task.status === 'testing') {
        task.status = 'in-progress';
    }
    else if (task.status === 'finished') {
        task.status = 'testing';
    }
    else if (task.status === 'todo') {
        alert('no space in left');
        return;
    }
    existtasks[ind] = task;
    localStorage.setItem('todoTasks', JSON.stringify(existtasks));
    loadTasks();
}
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.id.startsWith('moveright')) {
        const ind = parseInt(target.id.replace('moveright', ''), 10);
        movetask(ind);
    }
    if (target && target.id.startsWith('moveleft')) {
        const ind = parseInt(target.id.replace('moveleft', ''), 10);
        movetaskleft(ind);
    }
    if (target && target.id.startsWith('delete')) {
        const ind = parseInt(target.id.replace('delete', ''), 10);
        deletetask(ind);
    }
});
//# sourceMappingURL=kandon.js.map