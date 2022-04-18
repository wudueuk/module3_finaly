import { mount } from 'redom';
import {
  searchInput,
  goodsList,
  totalPrice,
  addGood,
} from './createCrm';
import overlay from './overlay';
import { modal, modalTitle, vendorId } from './modal';
import { renderGoods, goodsData } from './render';
import fetchDB from './db';
import { modalForm, submitBtn } from './modalForm';
import deleteModal from './delModal';
import debounce from './debounce';

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
  modalForm.query.value = 'add';
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
        fetchDB('DELETE', parent.dataset.id);
        recalcTotalPrice(goodsData);
      }
    });
  }

  // Отслеживаем нажатие на кнопку картинку
  if (target.closest('.table__btn_pic')) {
    const url = 'http://localhost:3000/' + target.dataset.pic;
    const top = screen.height / 2 - 300;
    const left = screen.width / 2 - 400;
    open(url, '', `width=800,height=600,top=${top},left=${left}`);
  }

  const formUpdate = good => {
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
    modalForm.total.value = '$ ' + modalForm.count.value *
      modalForm.price.value;
  };

  // Изменение данных о товаре
  if (target.closest('.table__btn_edit')) {
    const goodId = target.closest('tr').dataset.id;
    vendorId.textContent = goodId;
    modalTitle.textContent = 'Изменить товар';
    submitBtn.textContent = 'Изменить товар';
    fetchDB('GET', goodId, '', formUpdate);
    modalForm.query.value = 'patch';
    mount(modal, modalForm);
    mount(overlay, modal);
    mount(document.body, overlay);
    overlay.classList.add('active');
  }
});

const showSearchResult = data => {
  if (data.length > 0) {
    renderGoods(data);
  } else {
    goodsList.innerHTML = `
    <tr><td class="table__cell" colspan="8">Ничего не найдено</td></tr>
  `;
  }
};

// Поиск товаров
const goodsSearch = () => {
  const searchStr = searchInput.value;
  if (searchStr.length > 2) {
    goodsList.textContent = '';
    fetchDB('GET', '', `?search=${searchStr}`, showSearchResult);
  } else {
    goodsList.textContent = '';
    fetchDB('GET', '', '', renderGoods);
  }
};

const debounceSearch = debounce(goodsSearch, 300);
searchInput.addEventListener('keyup', debounceSearch);

const updateGoodsList = () => {
  goodsList.textContent = '';
  fetchDB('GET', '', '', renderGoods);
};

// Отправка формы добавления нового товара
modalForm.addEventListener('submit', e => {
  e.preventDefault();

  let discount = false;

  if (modalForm.discount.checked === true) {
    discount = modalForm.discount_count.value;
  }

  let goodAnswer = false;

  if (modalForm.query.value === 'add') {
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
        'image': modalForm.image.value,
      },
    ];
    const answer = fetchDB('POST', undefined, newGood[0], undefined);
    if (answer) {
      goodsData.push(newGood[0]);
      renderGoods(newGood);
      goodAnswer = true;
    }
  } else if (modalForm.query.value === 'patch') {
    const updateGood = [
      {
        'title': modalForm.name.value,
        'price': modalForm.price.value,
        'description': modalForm.description.value,
        'category': modalForm.category.value,
        'discont': discount,
        'count': modalForm.count.value,
        'units': modalForm.units.value,
        'image': modalForm.image.value,
      },
    ];
    fetchDB('PATH', vendorId.textContent, updateGood[0], updateGoodsList);
    goodAnswer = true;
  }

  if (goodAnswer) {
    modalForm.reset();
    overlay.classList.remove('active');
    overlay.textContent = '';
    overlay.remove();
    recalcTotalPrice(goodsData);
  }
});
