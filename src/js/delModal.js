import { el, setChildren, mount } from 'redom';
import overlay from './overlay';

const deleteModal = async () => {
  const modalDelete = el('div.overlay__modal.modal');

  const modalDeleteTitle = el('h2.modal__title',
    'Вы действительно хотите удалить товар из базы данных');
  modalDeleteTitle.style.marginBottom = '30px';

  const btnYes = el('button.modal__submit', 'Да');
  const btnNo = el('button.modal__submit', 'Нет');

  const btnSection = el('div');
  btnSection.style.cssText = `
    display: flex;
    justify-content: space-around;
  `;

  setChildren(btnSection, [btnYes, btnNo]);
  setChildren(modalDelete, [modalDeleteTitle, btnSection]);
  mount(overlay, modalDelete);
  mount(document.body, overlay);
  overlay.classList.add('active');

  return new Promise(resolve => {
    btnYes.addEventListener('click', () => {
      overlay.classList.remove('active');
      overlay.textContent = '';
      overlay.remove();
      resolve(true);
    });

    btnNo.addEventListener('click', () => {
      overlay.classList.remove('active');
      overlay.textContent = '';
      overlay.remove();
      resolve(false);
    });
  });
};

export default deleteModal;
