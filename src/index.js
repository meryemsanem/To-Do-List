import './styles/style.css';

const tasks = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'complete To Do List project',
    completed: false,
    index: 1,
  },
  {
    description: 'fix car',
    completed: false,
    index: 2,
  },
  {
    description: 'go shopping',
    completed: false,
    index: 3,
  },
];

const showTasks = () => {
  const list = document.querySelector('.list');
  for (let i = 0; i < tasks.length; i += 1) {
    const listItems = document.createElement('div');
    listItems.classList.add('to-do--');
    listItems.innerHTML = `<div class="lists">
    <input type="checkbox">
    ${tasks[i].description} 
  </div><div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
    </div>
  `;
    list.appendChild(listItems);
  }
};

showTasks();
