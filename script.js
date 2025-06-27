// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Store references in constants named taskInput and taskList, respectively
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const addButton = document.getElementById('add-task-btn');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to avoid saving again on load
    }

    // Define a function named addTask. This function will be responsible for adding new tasks to the list
    function addTask(taskText, save = true) {
        // Inside addTask, retrieve and trim the value from the task input field. Store this value in a variable named taskText (passed as parameter for loadTasks)
        const trimmedTaskText = typeof taskText === 'string' ? taskText.trim() : taskInput.value.trim();

        // Check if taskText is not empty (""). If it is empty, use alert to prompt the user to enter a task
        if (trimmedTaskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Within the addTask function, if taskText is not empty:
        // Create a new li element. Set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = trimmedTaskText;

        // Create a new button element for removing the task. Set its textContent to "Remove", and give it a class name of 'remove-btn' using classList.add
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Assign an onclick event to the remove button that, when triggered, removes the li element from taskList and updates Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(li);
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== trimmedTaskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append the remove button to the li element, then append the li to taskList
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the task input field by setting taskInput.value to an empty string (only if adding new task via input)
        if (typeof taskText !== 'string') {
            taskInput.value = '';
        }

        // If save is true, update the tasks array and save to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(trimmedTaskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Add an event listener to addButton that calls addTask when the button is clicked
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event to allow tasks to be added by pressing the “Enter” key. Inside this event listener, check if event.key is equal to 'Enter' before calling addTask
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke loadTasks to populate the list from Local Storage on page load
    loadTasks();
});