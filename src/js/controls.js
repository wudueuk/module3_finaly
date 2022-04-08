import { mount } from 'redom';
import { goodsList, totalPrice, addGood } from './createCrm';
import overlay from './overlay';
import createModal from './modal';
import { goodsData } from './render';
import { deleteGoods } from './db';
import createModalForm from './modalForm';

// Перерасчет итоговый суммы по таблице
export const recalcTotalPrice = goods => {
  const result = goods.reduce((sum, elem) =>
    sum + (elem.price * elem.count), 0);
  totalPrice.textContent = `$ ${result}`;
};

addGood.addEventListener('click', () => {
  const modal = createModal('Добавить товар');
  const form = createModalForm('Добавить товар');
  mount(modal, form);
  mount(overlay, modal);
  mount(document.body, overlay);
  overlay.classList.add('active');
});

overlay.addEventListener('click', e => {
  const target = e.target;
  if (target === overlay || target.closest('.modal__close')) {
    overlay.classList.remove('active');
    overlay.textContent = '';
    overlay.remove();
  }
});

goodsList.addEventListener('click', e => {
  const target = e.target;

  // Удаление записей из таблицы
  if (target.closest('.table__btn_del')) {
    const parent = target.closest('tr');
    const id = goodsData.findIndex((elem, index) => {
      if (elem.id === Number(parent.dataset.id)) return true;
    });
    parent.remove();
    goodsData.splice(id, 1);
    deleteGoods(parent.dataset.id);
    recalcTotalPrice(goodsData);
  }

  // Отслеживаем нажатие на кнопку картинку
  if (target.closest('.table__btn_pic')) {
    const url = './img/' + target.dataset.pic;
    const top = screen.height / 2 - 300;
    const left = screen.width / 2 - 400;
    open(url, '', `width=800,height=600,top=${top},left=${left}`);
  }

  // Изменение данных о товаре
  if (target.closest('.table__btn_edit')) {
    const id = target.closest('tr').dataset.id;
    const modal = createModal('Изменить товар');
    const form = createModalForm('Добавить товар', id);
    mount(modal, form);
    mount(overlay, modal);
    mount(document.body, overlay);
    overlay.classList.add('active');
  }
});
