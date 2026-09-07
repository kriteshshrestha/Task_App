window.onload = function () {
    getTasks();
};

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ---------------- Create Task ----------------

async function createTask() {

    const tasktitle = document.getElementById("title").value;
    const taskdescription = document.getElementById("description").value;

    const response = await fetch(
        "http://localhost:8080/api/v1/task/createtask",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization":
                    "Bearer " + localStorage.getItem("token")
            },

            body: JSON.stringify({
                tasktitle,
                taskdescription
            })
        }
    );

    const data = await response.json();

    if (data.success) {

        alert(data.message);

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        getTasks();

    } else {

        alert(data.message);

    }

}

// ---------------- View Tasks ----------------

async function getTasks() {

    const response = await fetch(
        "http://localhost:8080/api/v1/task/gettask",
        {
            headers: {
                "Authorization":
                    "Bearer " + localStorage.getItem("token")
            }
        }
    );

    const data = await response.json();

    const taskDiv = document.getElementById("tasks");

    taskDiv.innerHTML = "";

    data.task.forEach(task => {

      taskDiv.innerHTML += `
<div class="task">

    <div onclick="completeTask('${task._id}')">
        <h3 class="${task.iscompleted ? "completed" : ""}">
            ${task.tasktitle}
        </h3>

        <p>${task.taskdescription}</p>
    </div>

    <button class="delete-btn" onclick="deleteTask('${task._id}')">
        Delete
    </button>

</div>
`;
    });

}

// ---------------- Complete Task ----------------

async function completeTask(id) {

    const response = await fetch(
        `http://localhost:8080/api/v1/task/updatetask/${id}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization":
                    "Bearer " + localStorage.getItem("token")
            },

            body: JSON.stringify({
                status: true
            })
        }
    );

    const data = await response.json();

    if (data.success) {

        getTasks();

    } else {

        alert(data.message);

    }

}

async function deleteTask(id) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    const response = await fetch(
        `http://localhost:8080/api/v1/task/deletetask/${id}`,
        {
            method: "DELETE",

            headers: {
                "Authorization":
                    "Bearer " + localStorage.getItem("token")
            }
        }
    );

    const data = await response.json();

    if (data.success) {

        alert(data.message);

        getTasks();

    } else {

        alert(data.message);

    }

}

async function logout() {

    const response = await fetch(
        "http://localhost:8080/api/v1/auth/logout",
        {
            method: "POST",
            headers: {
                "Authorization":
                    "Bearer " + localStorage.getItem("token")
            }
        }
    );

    const data = await response.json();

    if (data.success) {
        localStorage.removeItem("token");

        alert(data.message);

        window.location.href = "login.html";
    }
}