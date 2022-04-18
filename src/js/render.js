import { recalcTotalPrice } from './controls';
import { goodsList } from './createCrm';

const goodsData = [];

const createRow = good => `
  <tr data-id="${good.id}">
    <td class="table__cell ">${good.id}</td>
    <td class="table__cell table__cell_left 
    table__cell_name">${good.title}</td>
    <td class="table__cell table__cell_left">${good.category}</td>
    <td class="table__cell">${good.units}</td>
    <td class="table__cell">${good.count}</td>
    <td class="table__cell">$${good.price}</td>
    <td class="table__cell">$${good.count * good.price}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button data-pic="${good.image}" class="table__btn table__btn_pic">
      </button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  </tr>
`;

const renderGoods = goods => {
  goods.forEach(element => {
    goodsList.insertAdjacentHTML('beforeend', createRow(element));
    goodsData.push(element);
  });

  recalcTotalPrice(goods);
};

export {
  renderGoods,
  goodsData,
};
