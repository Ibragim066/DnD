import Item from './Item';
import ItemsForm from './ItemsForm';

export default class KanbanColumn {
  constructor(container) {
    this.container = container;
    this.column = null;
    this.itemCount = 0;
  }

  bindToDOM(o) {
    this.column = document.createElement('div');
    this.column.classList.add('main-kanban-column');
    this.column.classList.add('main-kanban-column-droppable');
    this.column.setAttribute('data-id', o.id);

    if (o.classColor !== '') this.column.classList.add(o.classColor);
    this.column.innerHTML = `
      <div class="main-kanban-column-header">
        <div class="main-kanban-column-title">
          <div class="main-kanban-column-title-wrapper main-kanban-column-title-dark">
            <div class="main-kanban-column-title-bg"></div>
            <div class="main-kanban-column-title-info">
              <div class="main-kanban-column-title-text">
                <div class="main-kanban-column-title-text-inner">${o.title}</div>
                <div class="main-kanban-column-total-item" data-count="${this.itemCount}">${this.itemCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-kanban-column-subtitle">
          <div class="main-kanban-column-subtitle-box">
            <div class="main-kanban-column-add-item-button">
              <div class="main-kanban-column-add-item-button-text">Быстрая задача</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-kanban-column-body" data-type="column">
        <div class="main-kanban-column-items"></div>
      </div>
    `;
    this.container.append(this.column);
    this.drawUi(o.id);
    this.events();
  }

  events() {
    const addBtn = this.column.querySelector('.main-kanban-column-subtitle-box');
    addBtn.addEventListener('click', () => this.addItem());
  }

  drawUi(id) {
    if (localStorage.columns) {
      const columnsLocal = JSON.parse(localStorage.columns);
      if (columnsLocal) {
        if (columnsLocal[id]) {
          columnsLocal[id].forEach((el) => {
            const item = new Item(this.column.querySelector('.main-kanban-column-items'));
            item.bindToDom(el);
          });

          this.itemCount = columnsLocal[id].length;
          const itemCount = this.column.querySelector('.main-kanban-column-total-item');
          itemCount.dataset.count = this.itemCount;
          itemCount.innerText = itemCount.dataset.count;
        }
      }
    }
  }

  addItem() {
    if (!this.column.querySelector('form') && !document.querySelector('.dragged')) {
      const itemsForm = new ItemsForm();
      itemsForm.bindToDOM(this.column);
    }
  }
}
