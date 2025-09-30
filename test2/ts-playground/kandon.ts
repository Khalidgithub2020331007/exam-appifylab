// alert('JavaScript file is linked to kandon.html');

const add_task_btn = document.getElementById("add_task") as HTMLButtonElement,
    title_input = document.getElementById("title") as HTMLInputElement,
    description_input = document.getElementById("description") as HTMLInputElement,
    assigned_user_input = document.getElementById("assigned_user") as HTMLInputElement,
    created_by_input = document.getElementById("created_by") as HTMLInputElement,
    email_correction = document.getElementById("email_correction") as HTMLParagraphElement,
    status_input = document.getElementById("status") as HTMLInputElement,
    todo=document.getElementById("todo") as HTMLUListElement,
    inprogress=document.getElementById("in-progress") as HTMLUListElement,
    testing=document.getElementById("testing") as HTMLUListElement,
    finished=document.getElementById("finished") as HTMLUListElement;
    
function loadTasks() {  
    const existTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    console.log("Loading tasks", existTasks);
    todo.innerHTML = '';
    inprogress.innerHTML = '';
    testing.innerHTML = '';
    finished.innerHTML = '';
    existTasks.forEach((task: { title: string; description: string; assigned_user: string; created_by: string; status: string; }) => {
        const li = document.createElement('li');
        li.innerHTML = `<div class='test'><strong>Title:</strong> ${task.title} <br> <strong>Description:</strong> ${task.description} <br> <strong>Assigned User:</strong> ${task.assigned_user} <br> <strong>Created By:</strong> ${task.created_by} <br> <strong>Status:</strong> ${task.status} <br><button id="move">Move</button><br></div>`;
        if (task.status === 'todo') {
            todo.appendChild(li);
        } else if (task.status === 'in-progress') {
            inprogress.appendChild(li);
        } else if (task.status === 'testing') {
            testing.appendChild(li);
        } else if (task.status === 'finished') {
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
    else{
        email_correction.innerHTML=" ";
    }

});
add_task_btn?.addEventListener('click', (e: MouseEvent) => {
    // console.log('Add task button clicked 2');
    e.preventDefault();
    
    const titlevalue: string = title_input?.value.trim() || '';
    const descriptionvalue: string = description_input?.value.trim() || '';
    const assigned_user_value: string = assigned_user_input?.value.trim() || '';
    const created_user_value: string = created_by_input?.value.trim() || '';
    const status_value: string = status_input?.value.trim() || '';

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
    console.log("todo Tasks",existTasks);
   console.log(currentUser.email,existingUsers,existTasks)
   const emailExists = existingUsers.some((user: { email: string; }) => user.email === assigned_user_input.value);
   console.log(emailExists);
   if (!emailExists)
   {
    alert("Assigned user email does not exist");
    console.log("Assigned user email does not exist");
    return;
   
   }

    existTasks.push({
        title: titlevalue,
        description: descriptionvalue,
        assigned_user: assigned_user_value,
        created_by: currentUser.email,
        status:status_value,
    });
    localStorage.setItem("todoTasks",JSON.stringify(existTasks));
   
    console.log("todo Tasks after push",existTasks);
    console.log(status_input.value)
    alert("Task Added Successfully");

    // existingUsers.push({name:namevalue,email:emailvalue,password:passwordvalue})
    // localStorage.setItem("users",JSON.stringify(existingUsers));
    // console.log(existingUsers);
    // alert("Registration Successful");
    // window.location.href = '/kandon.html';
  
});