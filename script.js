// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // Get and trim input value

    if (taskText !== '') {
        const li = document.createElement('li'); // Create a new list item

        li.innerHTML = `
            <span>${taskText}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;

        // Mark task as completed when clicked
        li.querySelector('span').addEventListener('click', function () {
            li.classList.toggle('completed');
        });

        // Edit task when edit button is clicked
        li.querySelector('.edit').addEventListener('click', function () {
            editTask(li);
        });

        // Delete task when delete button is clicked
        li.querySelector('.delete').addEventListener('click', function () {
            li.remove();
        });

        taskList.appendChild(li); // Add the new task to the list
        taskInput.value = ''; // Clear the input
    }
}

// Function to edit a task
function editTask(taskItem) {
    const taskTextElement = taskItem.querySelector('span');
    const currentText = taskTextElement.textContent; // Get the current task text
    const newTextInput = document.createElement('input'); // Create a new input field
    newTextInput.type = 'text';
    newTextInput.value = currentText;
    taskItem.insertBefore(newTextInput, taskTextElement); // Insert the input before the task text
    taskTextElement.style.display = 'none'; // Hide the original task text

    newTextInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            taskTextElement.textContent = newTextInput.value; // Update task text
            taskTextElement.style.display = ''; // Show the updated task text
            newTextInput.remove(); // Remove the input field
        }
    });

    newTextInput.addEventListener('blur', function () {
        taskTextElement.style.display = ''; // Show the original task text
        newTextInput.remove(); // Remove the input field
    });

    newTextInput.focus(); // Focus on the input field
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);

// Allow pressing 'Enter' to add a task
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
