const input = document.getElementById('chapterInput');
const addButton = document.getElementById('addButton');
const chapterList = document.getElementById('chapterList');

addButton.addEventListener('click', () => {
  const chapterName = input.value.trim();

  if (chapterName === '') {
    input.focus();
    return;
  }

  const li = document.createElement('li');
  li.textContent = chapterName;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.classList.add('delete');
  li.appendChild(deleteBtn);

  chapterList.appendChild(li);

  input.value = '';
  input.focus();
});

// Event Delegation for delete buttons
chapterList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement;
    chapterList.removeChild(li);
  }
});
