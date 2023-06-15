import './styles/style.css';

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
  const { index, description } = tasks[i];
  target.innerHTML += `
      <li id="L${index}" class ="common">
      <input for ="P${index}" id="input" type="checkbox" class ="checkbox">
      <p id ="P${index}" class="li-p">${description}</p>
      <button id="edit-remove${index}"  class="btn dots list-item">
       <i class="fa fa-ellipsis-v"></i>
      </button>
      </li>
    `;
}

function deleteList() {
  const button = document.querySelectorAll('.newButton');
  const element = button[0].parentNode;
  const liItem = element.parentNode;
  liItem.removeChild(element);
  const listId = element.getAttribute('id');
  const index = parseInt(listId.substring(1), 10);
  tasks = tasks.filter((task) => task.index !== index);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  window.location.reload();
}

function addTrash(event) {
  const eventCatcher = event.target.closest('button');
  eventCatcher.style.display = 'none';
  const liItem = event.target.closest('li');
  const nodeList = liItem.querySelectorAll('p');
  const parentLi = nodeList[0].parentNode;
  const parentId = parentLi.getAttribute('id');
  const parentElement = document.getElementById(parentId);
  const newBtn = document.createElement('button');
  newBtn.className = 'newButton';
  newBtn.innerHTML = '<i class="fa fa-trash-alt"></i>';
  parentElement.append(newBtn);
  liItem.style.backgroundColor = '#ffe6ee';
  const textElem = liItem.querySelector('p');
  textElem.setAttribute('contenteditable', true);
  textElem.focus();
  const trash = document.getElementsByClassName('newButton');
  trash[0].addEventListener('click', deleteList);
}

const deleteBtn = document.querySelectorAll('.list-item');
deleteBtn.forEach((button) => {
  button.addEventListener('click', addTrash);
});
