const refresh = () => {
  localStorage.removeItem('tasks');
  window.location.reload();
};

document.querySelector('.fa-rotate').addEventListener('click', refresh);

export { refresh };
