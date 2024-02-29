export default function changeItemsCount(el, array) {
  const newItemsCount = el.querySelector('.main-kanban-column-total-item');

  newItemsCount.dataset.count = array.length;
  newItemsCount.innerText = newItemsCount.dataset.count;
}
