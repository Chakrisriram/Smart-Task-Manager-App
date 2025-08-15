document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('search-task').addEventListener('input', displayTasks);
document.getElementById('filter-category').addEventListener('change', displayTasks);

function addTask() {
    let taskText = document.getElementById('task-input').value.trim();
    let taskDate = document.getElementById('task-date').value;
    let taskCategory = document.getElementById('task-category').value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        text: taskText,
        date: taskDate,
        category: taskCategory,
        completed: false
    };

    saveTask(task);
    displayTasks();
    clearForm();
}

function clearForm() {
    document.getElementById('task-input').value = "";
    document.getElementById('task-date').value = "";
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    displayTasks();
}

function displayTasks() {
    let tasks = getTasks();
    let searchText = document.getElementById('search-task').value.toLowerCase();
    let selectedCategory = document.getElementById('filter-category').value;

    let taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (task.text.toLowerCase().includes(searchText) &&
            (selectedCategory === "All" || task.category === selectedCategory)) {

            let li = document.createElement('li');
            li.classList.add('added');

            let taskText = document.createElement('span');
            let taskDisplay = ${task.text} (${task.category}) - ${task.date || "No due date"};
            taskText.textContent = taskDisplay;

            if (task.completed) {
                taskText.classList.add('completed');
            }

            if (task.date && new Date(task.date) < new Date() && !task.completed) {
                taskText.classList.add('overdue');
            }

            taskText.addEventListener('click', () => toggleTask(index));

            let delBtn = document.createElement('button');
            delBtn.textContent = "Delete";
            delBtn.classList.add('delete');
            delBtn.addEventListener('click', () => deleteTask(index));

            li.appendChild(taskText);
            li.appendChild(delBtn);
            taskList.appendChild(li);
        }
    });
}

function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}