import './styles/style.css';

function component() {
  const element = document.createElement('h1');

  // Lodash, now imported by this script
  element.innerHTML = 'Hello Webpack';
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
