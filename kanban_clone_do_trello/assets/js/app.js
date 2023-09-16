/* */
const tasks = document.querySelectorAll('.tasks li');
const columns = document.querySelectorAll('.tasks');
let dragged_task = null;

/* */
for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    task.addEventListener('dragstart', function (event) {
        dragged_task = task;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', task.innerHTML);
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', function () {
        dragged_task.classList.remove('dragging');
        dragged_task = null;
    });
};

/* */
for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    column.addEventListener('dragover', function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        column.classList.add('dragover');
    });

    column.addEventListener('dragleave', function () {
        column.classList.remove('dragover');
    });

    column.addEventListener('drop', function (event) {
        event.preventDefault();

        const task = document.createElement('li');
        task.innerHTML = event.dataTransfer.getData('text/html');
        task.setAttribute('draggable', 'true');

        task.addEventListener('dragstart', function (event) {
            dragged_task = task;
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/html', task.innerHTML);
            task.classList.add('dragging');
        });

        column.appendChild(task);
        column.classList.remove('dragover');

        const previous_column = dragged_task.parentNode;
        previous_column.removeChild(dragged_task);
    });
};