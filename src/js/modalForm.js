import { el } from 'redom';

const modalTotalPrice = el('output.modal__total-price', {
  name: 'total', value: '$ 0.0',
});

const formFieldset = el('fieldset.modal__fieldset');
formFieldset.innerHTML = `
    <label class="modal__label modal__label_name" for="name">
      <span class="modal__text">Наименование</span>
      <input class="modal__input" type="text" name="name" id="name" required>
    </label>

    <label class="modal__label modal__label_category" for="category">
      <span class="modal__text">Категория</span>
      <input class="modal__input" type="text" name="category" id="category"
        required>
    </label>

    <label class="modal__label modal__label_description" for="description">
      <span class="modal__text">Описание</span>
      <textarea class="modal__input modal__input_textarea" name="description"
        id="description"
        required></textarea>
    </label>

    <label class="modal__label modal__label_units" for="units">
      <span class="modal__text">Единицы измерения</span>
      <input class="modal__input" type="text" name="units" id="units" required>
    </label>

    <div class="modal__label modal__label_discount">
      <label class="modal__text" for="discount">Дисконт</label>
      <div class="modal__checkbox-wrapper">
        <input class="modal__checkbox" type="checkbox" name="discount"
          id="discount">
        <input class="modal__input modal__input_discount" type="number"
          name="discount_count" disabled>
      </div>
    </div>

    <label class="modal__label modal__label_count" for="count">
      <span class="modal__text">Количество</span>
      <input class="modal__input" type="number" name="count" id="count"
        required>
    </label>

    <label class="modal__label modal__label_price" for="price">
      <span class="modal__text">Цена</span>
      <input class="modal__input" type="number" name="price" id="price"
        required>
    </label>

    <label tabindex="0" for="image" class="modal__label
      modal__label_file">Добавить изображение</label>
    <input class="modal__file visually-hidden" tabindex="-1" type="file"
      name="image" id="image">
    
    <input type="hidden" name="query" value="add">
`;

const errorMessageBox = document.createElement('div');
errorMessageBox.style.gridArea = '.';

const errorMessage = document.createElement('span');
errorMessage.style.cssText = `
    display: block;
    color: red;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
  `;

const imageContainer = document.createElement('div');
imageContainer.className = 'image__container';

errorMessageBox.append(errorMessage);
formFieldset.append(errorMessageBox, imageContainer);

const submitBtn = el('button.modal__submit', {
  type: 'submit',
});

const modalForm = el('form.modal__form', [
  formFieldset,
  el('div.modal__footer', [
    el('label', 'Итоговая стоимость: ', [modalTotalPrice]),
    submitBtn,
  ]),
]);

// Отслеживание изменений в элементах формы
modalForm.addEventListener('change', e => {
  const target = e.target;

  // Отслеживаем дискаунт
  if (target === modalForm.discount) {
    if (modalForm.discount.checked === true) {
      modalForm.discount_count.removeAttribute('disabled');
    } else {
      modalForm.discount_count.setAttribute('disabled', '');
      modalForm.discount_count.value = '';
    }
  }

  // Автоматический рассчет и вывод итоговой стоимости
  if (target === modalForm.count || target === modalForm.price) {
    modalForm.total.value = '$ ' + modalForm.count.value *
      modalForm.price.value;
  }

  // Ввод изображения
  if (target === modalForm.image && target.files.length > 0) {
    errorMessage.textContent = '';
    imageContainer.textContent = '';
    const imageFile = target.files[0];
    if (imageFile.name.match(/\.(jpg|jpeg|png|svg|gif)$/i)) {
      if (imageFile.size > (1024 * 1024)) {
        errorMessage.textContent = `Изображение не должно превышать
            размер 1 МБ`;
      } else {
        const imageGood = new Image();
        imageGood.src = URL.createObjectURL(imageFile);
        imageContainer.append(imageGood);
      }
    } else {
      errorMessage.textContent = 'Выберите файл изображения';
    }
  }
});

export {
  modalForm,
  submitBtn,
};
