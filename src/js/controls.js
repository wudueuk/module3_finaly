import { mount } from 'redom';
import { goodsList, totalPrice, addGood } from './createCrm';
import overlay from './overlay';
import { modal, modalTitle, vendorId } from './modal';
import { renderGoods, goodsData } from './render';
import { getGood, postGoods, deleteGoods } from './db';
import { modalForm, submitBtn } from './modalForm';
import deleteModal from './delModal';

// Перерасчет итоговый суммы по таблице
export const recalcTotalPrice = goods => {
  const result = goods.reduce((sum, elem) =>
    sum + (elem.price * elem.count), 0);
  totalPrice.textContent = `$ ${result}`;
};

addGood.addEventListener('click', () => {
  modalTitle.textContent = 'Добавить товар';
  submitBtn.textContent = 'Добавить товар';
  vendorId.textContent = Math.floor(Math.random() * 1e9);
  mount(modal, modalForm);
  mount(overlay, modal);
  mount(document.body, overlay);
  overlay.classList.add('active');
});

overlay.addEventListener('click', e => {
  const target = e.target;
  if (target === overlay || target.closest('.modal__close')) {
    overlay.classList.remove('active');
    modalForm.reset();
    overlay.textContent = '';
    overlay.remove();
  }
});

goodsList.addEventListener('click', e => {
  const target = e.target;

  // Удаление записей из таблицы
  if (target.closest('.table__btn_del')) {
    const parent = target.closest('tr');
    const id = goodsData.findIndex((elem) => {
      if (elem.id === Number(parent.dataset.id)) return true;
    });
    deleteModal().then(result => {
      if (result) {
        parent.remove();
        goodsData.splice(id, 1);
        deleteGoods(parent.dataset.id);
        recalcTotalPrice(goodsData);
      }
    });
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
    const goodId = target.closest('tr').dataset.id;
    vendorId.textContent = goodId;
    modalTitle.textContent = 'Изменить товар';
    submitBtn.textContent = 'Изменить товар';
    getGood(goodId).then(good => {
      modalForm.name.value = good.title;
      modalForm.price.value = good.price;
      modalForm.description.value = good.description;
      modalForm.category.value = good.category;
      if (good.discount > 0) {
        modalForm.discount.checked = true;
        modalForm.discount_count.value = good.discount;
      }
      modalForm.count.value = good.count;
      modalForm.units.value = good.units;
      //modalForm.image.value = good.image;
      modalForm.total.value = '$ ' + modalForm.count.value *
        modalForm.price.value;
    });
    mount(modal, modalForm);
    mount(overlay, modal);
    mount(document.body, overlay);
    overlay.classList.add('active');
  }
});

// Отправка формы
modalForm.addEventListener('submit', e => {
  e.preventDefault();

  let discount = false;
  if (modalForm.discount.checked === true) {
    discount = modalForm.discount_count.value;
  }

  const newGood = [
    {
      'id': vendorId.textContent,
      'title': modalForm.name.value,
      'price': modalForm.price.value,
      'description': modalForm.description.value,
      'category': modalForm.category.value,
      'discont': discount,
      'count': modalForm.count.value,
      'units': modalForm.units.value,
      'images': modalForm.image.value,
    },
  ];

  postGoods(newGood[0]);
  goodsData.push(newGood[0]);
  renderGoods(newGood);

  modalForm.reset();
  overlay.classList.remove('active');
  overlay.textContent = '';
  overlay.remove();
  recalcTotalPrice(goodsData);
});
