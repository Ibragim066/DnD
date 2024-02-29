import changeItemsCount from './changeItemsCount';
import drag from './drag';

export default class Item {
  constructor(container) {
    this.container = container;
    this.item = null;
  }

  bindToDom(o) {
    this.item = document.createElement('div');
    this.item.classList.add('main-kanban-item');
    this.item.setAttribute('data-type', 'item');
    this.item.setAttribute('data-id', o.id);
    this.item.setAttribute('draggable', 'true');
    this.item.innerHTML = `
      <div class="main-kanban-item-wrapper">
        <div class="tasks-kanban-item">
            <h4 class="tasks-kanban-item-title tasks-kanban-item-title--with-counter"></h4>
            <div class="btn-remove" data-toggle="item-remove" title="remove item">&#10006</div>
          <div class="tasks-kanban-item-text"></div>
          <div class="tasks-kanban-item-deadline tasks-kanban-item-pointer">
            <div class="ui-label ui-label-secondary ui-label-sm ui-label-fill">
              <span class="ui-label-inner"></span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.item.querySelector('.tasks-kanban-item-title').innerText = o.title;
    this.item.querySelector('.tasks-kanban-item-text').innerText = o.text;
    this.item.querySelector('.ui-label-inner').innerText = o.time;
    this.container.append(this.item);

    this.events();
  }

  events() {
    const removeBtn = this.item.querySelector('.btn-remove');

    this.item.addEventListener('mouseover', () => this.showBtn());
    this.item.addEventListener('mouseout', () => this.hideBtn());
    removeBtn.addEventListener('click', () => this.removeItem());
    drag(this.container.closest('.main-kanban-grid'), this.item);
  }

  showBtn() {
    this.item.querySelector('.btn-remove').classList.add('btn-remove_visible');
  }

  hideBtn() {
    this.item.querySelector('.btn-remove').classList.remove('btn-remove_visible');
  }

  removeItem() {
    this.item.parentNode.removeChild(this.item);
    const columsLocal = JSON.parse(localStorage.columns);
    const key = this.container.closest('.main-kanban-column').dataset.id;
    const index = columsLocal[key].findIndex((item) => item.id === +this.item.dataset.id);
    columsLocal[key].splice(index, 1);
    localStorage.setItem('columns', JSON.stringify(columsLocal));

    changeItemsCount(this.container.closest('.main-kanban-column'), columsLocal[key]);
  }
}
