import './styles/style.css';
import addTrash from './modules/function.js';

const clearButton = document.querySelector('.btnComplete');

const input = document.getElementById('input');

const target = document.getElementById('list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToLocalStorage(data) {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(data);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const inputValue = input.value;
    const newObj = {
      description: inputValue,
      completed: false,
      index: tasks.length + 1,
    };
    saveToLocalStorage(newObj);
    window.location.reload();
    input.value = '';
  }
});

for (let i = 0; i < tasks.length; i += 1) {
  const { index, description, completed } = tasks[i];
  target.innerHTML += `
      <li id="L${index}" class ="common">
      <input for ="P${index}" id="${index}" type="checkbox" ${
  completed && 'checked'
}  class ="checkbox">
      <p id ="P${index}" class="li-p">${description}</p>
      <button id="edit-remove${index}"  class="btn dots list-item">
       <i class="fa fa-ellipsis-v"></i>
      </button>
      </li>
    `;
}

const deleteBtn = document.querySelectorAll('.list-item');
deleteBtn.forEach((button) => {
  button.addEventListener('click', addTrash);
});

const checkboxs = document.querySelectorAll('.checkbox');
checkboxs.forEach((el) => {
  el.addEventListener('click', () => {
    const list = JSON.parse(localStorage.getItem('tasks'));
    const findIndex = list.findIndex(
      (listEl) => listEl.index.toString() === el.id.toString(),
    );

    list[findIndex].completed = !list[findIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(list));
    tasks = JSON.parse(localStorage.getItem('tasks'));
  });
});

clearButton.addEventListener('click', () => {
  const list = JSON.parse(localStorage.getItem('tasks'));
  const filteredItems = list.filter((el) => el.completed === false);

  localStorage.setItem('tasks', JSON.stringify(filteredItems));
  window.location.reload();
});
