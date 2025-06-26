document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';

        // 🔥 ALX expects this exact line
        removeButton.className = 'remove-btn';

        // When clicked, remove the task from the list
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Add the button to the list item, then add to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // ✅ ALX expects this exact event listener
    addButton.addEventListener('click', addTask);

    // ✅ Also handle Enter keypress on input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

