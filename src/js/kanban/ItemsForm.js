import localeRu from 'dayjs/locale/ru';
import Item from './Item';

const dayjs = require('dayjs');

export default class ItemsForm {
  constructor() {
    this.container = null;
    this.form = document.createElement('form');
    this.currentElError = undefined;
  }

  bindToDOM(container) {
    this.container = container;

    this.drawUi();
    this.events();
  }

  drawUi() {
    this.checkBinding();
    this.form.setAttribute('id', 'item-form');
    this.form.setAttribute('novalidate', 'novalidate');
    this.form.innerHTML = `
        <div class="form-control">
          <input data-id="title" class="input" type="text" placeholder="title" autocomplete="off" required> 
        </div>
        <div class="form-control">
          <input data-id="text" class="input" type="text" placeholder="text" autocomplete="off" required>
        </div>
        <div class="card-btn">
          <button type="submit" class="btn " data-toggle="trello" title="Add card">Add Card</button>
          <button type="button" class="btn btn-close" data-toggle="form-close" title="Close form">&#10006</button>
        </div>
      `;
    this.container.append(this.form);
    this.formElements = [...this.form.elements];
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Form not bind to DOM');
    }
  }

  events() {
    const closeBtn = this.form.querySelector('[data-toggle="form-close"]');

    closeBtn.addEventListener('click', () => this.closeForm());
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
  }

  closeForm() {
    this.form.parentNode.removeChild(this.form);
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = {};
    this.formElements.forEach((el) => {
      const key = el.dataset.id;
      const { value } = el;

      if (!key) return;
      /* eslint-disable */
            formData[key] = value;
        });
        formData.id = Date.now();
        formData.time = dayjs().locale(localeRu).format('DD MMMM YYYY');

        const item = new Item(this.container.querySelector('.main-kanban-column-items'));
        item.bindToDom(formData);

        const itemCount = this.container.querySelector('.main-kanban-column-total-item');
        itemCount.dataset.count = +itemCount.dataset.count + 1;
        itemCount.innerText = itemCount.dataset.count;
        this.closeForm();

        if (!localStorage.getItem('columns')) {
            localStorage.setItem('columns', JSON.stringify({}))
        }

        const columnsLocal = JSON.parse(localStorage.columns);
        if (!columnsLocal.hasOwnProperty(this.container.dataset.id)) {
            columnsLocal[this.container.dataset.id] = [];
        }

        columnsLocal[this.container.dataset.id].push(formData);
        localStorage.setItem('columns', JSON.stringify(columnsLocal))
    }
}