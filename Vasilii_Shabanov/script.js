document.addEventListener("DOMContentLoaded", () => {

    const todo = (() => {

        const input = document.querySelector('.todo-input__text');
        const deadline = document.querySelector('.todo-input__date');
        const addButton = document.querySelector('.todo-input__button');
        const allFilter = document.getElementById('allFilter');
        const activeFilter = document.getElementById('activeFilter');
        const completedFilter = document.getElementById('completedFilter');
        const tomorrowFilter = document.getElementById('tomorrowFilter');
        const weekFilter = document.getElementById('weekFilter');
        const todoInput = document.querySelector('.todo-input');

        const addItem = (text, date) => {
            const list = document.querySelector('.todo-output__list');
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            const deadline = document.createElement('div');
            const taskText = document.createElement('p');
            const removeIcon = document.createElement('div');
            li.classList.add('task');
            list.append(li);
            checkbox.classList.add('task__checkbox');
            checkbox.setAttribute('type', 'checkbox');
            deadline.classList.add('task__deadline');
            deadline.textContent = date;
            taskText.classList.add('task__text');
            taskText.textContent = text;
            removeIcon.classList.add('task__remove-icon');
            removeIcon.textContent = 'X';

            li.append(checkbox, deadline, taskText, removeIcon);

            removeIcon.addEventListener('click', (event) => {
                list.removeChild(event.target.parentNode);
            });

            checkbox.addEventListener('click', (event) => {
                event.target.parentNode.classList.toggle('completed');
            });
        };

        todoInput.addEventListener("keypress", (event) => {
            if ('Enter' === event.key) {
                if (input.value || deadline.value) {
                    todo.addItem(input.value, deadline.value);
                    input.value = "";
                    deadline.value = "";
                } else {
                    alert('Please enter your task');
                }
            }
        });

        addButton.addEventListener("click", () => {
            if (input.value || deadline.value) {
                todo.addItem(input.value, deadline.value);
                input.value = "";
                deadline.value = "";
            }
        });

        completedFilter.addEventListener("click", () => {
            let tasks = document.querySelectorAll('.task');
            tasks.forEach((event) => {
                if (!event.classList.contains('completed')) {
                    event.classList.add('hidden');
                } else {
                    event.classList.remove('hidden');
                }
            });
        });

        activeFilter.addEventListener("click", () => {
            let tasks = document.querySelectorAll('.task');
            tasks.forEach((event) => {
                if (event.classList.contains('completed')) {
                    event.classList.add('hidden');
                } else {
                    event.classList.remove('hidden');
                }
            });
        });

        allFilter.addEventListener("click", () => {
            let tasks = document.querySelectorAll('.task');
            tasks.forEach((event) => {
                if (event) {
                    event.classList.remove('hidden');
                } else {
                    event.classList.add('hidden');
                }
            });
        });

        tomorrowFilter.addEventListener('click', () => {
            let deadlineList = document.getElementsByClassName('task__deadline');
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            for (let i = 0; i < deadlineList.length; i++) {
                let deadline = new Date(deadlineList[i].innerText);
                deadline.getTime() < tomorrow.getTime() ?
                    deadlineList[i].parentNode.classList.remove('hidden') :
                    deadlineList[i].parentNode.classList.add('hidden');
            }
        });

        weekFilter.addEventListener('click', () => {
            let deadlineList = document.getElementsByClassName('task__deadline');
            let nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            for (let i = 0; i < deadlineList.length; i++) {
                let deadline = new Date(deadlineList[i].innerText);
                deadline.getTime() < nextWeek.getTime() ?
                    deadlineList[i].parentNode.classList.remove('hidden') :
                    deadlineList[i].parentNode.classList.add('hidden');
            }
        });

        return {
            addItem
        };
    })();
});