document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim(); // Trim whitespace

        if (taskText === '') {
            alert('Please enter a task.');
            return; // Stop if the input is empty
        }

        // Create a list item
        const li = document.createElement('li');
        li.textContent = taskText; // Set task text

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add an event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li); // Remove the list item
        };

        // Add the button to the list item and list item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input
        taskInput.value = '';
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing "Enter" in the task input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
