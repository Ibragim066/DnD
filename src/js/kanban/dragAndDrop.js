export default function dragAndDrop(main) {
  main.addEventListener('dragleave', (e) => {
    if (e.target.classList.contains('dragged')) {
      e.target.classList.remove('dragged');
    }
  });

  main.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('main-kanban-item')) {
      e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }
  });

  main.addEventListener('dragenter', (e) => {
    if (e.target.classList.contains('main-kanban-column-items')) {
      e.target.classList.add('dragged');
    }
  });

  let elemBelow = '';

  main.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    elemBelow = e.target;
  });

  main.addEventListener('drop', (e) => {
    const todo = main.querySelector(`[data-id="${e.dataTransfer.getData('text/plain')}"]`);

    if (elemBelow === todo) {
      return;
    }

    if (elemBelow.tagName === 'span' || elemBelow.className === 'tasks-kanban-item-text' || elemBelow.className === 'tasks-kanban-item') {
      elemBelow = elemBelow.closest('.main-kanban-item');
    }

    if (elemBelow.classList.contains('main-kanban-item')) {
      const center = elemBelow.getBoundingClientRect().y
                + elemBelow.getBoundingClientRect().height / 2;

      if (e.clientY > center) {
        if (elemBelow.nextElementSibling !== null) {
          elemBelow = elemBelow.nextElementSibling;
        } else {
          return;
        }
      }

      elemBelow.parentElement.insertBefore(todo, elemBelow);
      todo.className = elemBelow.className;
    }

    if (e.target.classList.contains('main-kanban-column-body')) {
      const columsLocal = JSON.parse(localStorage.columns);
      const keyForTodo = todo.closest('.main-kanban-column').dataset.id;
      const index = columsLocal[keyForTodo].findIndex((item) => item.id === +todo.dataset.id);
      const todoLocal = columsLocal[keyForTodo].splice(index, 1);
      const columnItems = e.target.querySelector('.main-kanban-column-items');

      const keyForColumnItems = columnItems.closest('.main-kanban-column').dataset.id;
      // eslint-disable-next-line no-prototype-builtins
      if (!columsLocal.hasOwnProperty(keyForColumnItems)) columsLocal[keyForColumnItems] = [];

      columsLocal[keyForColumnItems].push(todoLocal[0]);
      localStorage.setItem('columns', JSON.stringify(columsLocal));

      columnItems.append(todo);

      if (e.target.classList.contains('dragged')) {
        e.target.classList.remove('dragged');
      }
    }
  });
}
