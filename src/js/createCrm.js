import { el, setChildren } from 'redom';

const container = el('div.container');

const totalPrice = el('span.crm__total-price', '$ 900.00');

const btnFilter = el('button.panel__filter', 'Фильтр');

const searchForm = el('form.panel__search');
const searchInput = el('input.panel__input', {
  placeholder: 'Поиск по наименованию и категории',
});
setChildren(searchForm, searchInput);

const addGood = el('button.panel__add-goods', 'Добавить товар');

const goodsTable = el('table.goods__table table');
goodsTable.innerHTML = `
  <thead class="table__header">
    <tr class="table__header-row">
      <th class="table__header-cell table__header-cell_left">ID</th>
      <th class="table__header-cell table__header-cell_left">Наименование</th>
      <th class="table__header-cell table__header-cell_left">Категория</th>
      <th class="table__header-cell">ед/изм</th>
      <th class="table__header-cell">количество</th>
      <th class="table__header-cell">цена</th>
      <th class="table__header-cell">ИТОГ</th>
      <th></th>
    </tr>
  </thead>
`;
const goodsList = el('tbody.table__body');
goodsTable.append(goodsList);

setChildren(container, [
  el('header.crm__header', [
    el('h1.crm__title', 'CRM - ShopOnline'),
    el('p.crm__total', 'Итоговая стоимость: ', [totalPrice]),
  ]),
  el('div.crm__goods.goods', [
    el('div.goods__panel.panel', [
      btnFilter,
      searchForm,
      addGood,
    ]),
    el('div.goods__table-wrapper', [goodsTable]),
  ]),
]);

export {
  container,
  totalPrice,
  btnFilter,
  searchForm,
  searchInput,
  goodsList,
  addGood,
};
