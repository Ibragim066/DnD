import KanbanColumn from './KanbanColumn';

export default class Board {
  constructor(container) {
    this.container = container;
    this.board = null;
  }

  bindToDOM() {
    this.board = document.createElement('div');
    this.board.classList.add('tasks-kanban-border');
    this.board.setAttribute('id', 'task_kanban');
    this.board.innerHTML = `
      <div class="main-kanban">
        <div class="main-kanban-inner">
          <div class="main-kanban-grid"></div>
        </div>
      </div>
      `;

    this.addColumn();
    this.container.append(this.board);
  }

  addColumn() {
    const containerForColumn = this.board.querySelector('.main-kanban-grid');
    const columnLeft = new KanbanColumn(containerForColumn);
    const columnCenter = new KanbanColumn(containerForColumn);
    const columnRight = new KanbanColumn(containerForColumn);

    columnLeft.bindToDOM({ classColor: '', title: 'TODO', id: 'left' });
    columnCenter.bindToDOM({ classColor: 'main-kanban-column-empty', title: 'In progress', id: 'center' });
    columnRight.bindToDOM({ classColor: 'main-kanban-column-right', title: 'Done', id: 'right' });
  }
}
