import { el, setChildren } from 'redom';

const errOverlay = el('div');
errOverlay.style.cssText = `
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
`;

const errModal = el('div.modal');
errModal.style.width = '350px';
errModal.style.height = '350px';
errModal.style.padding = '30px';

const btnClose = el('button.modal__close');
btnClose.innerHTML = `
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" 
      stroke-width="3" stroke-linecap="round" />
  </svg>
`;

const errCross = el('div');
errCross.style.cssText = `
  margin: 90px 0px 30px 100px;
  color: red;
  width: 90px;
  height: 90px;
`;
errCross.innerHTML = `
  <svg width="90" height="90" viewBox="0 0 94 94" fill="none"
  xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L92 92" stroke="#D80101" stroke-width="3"
    stroke-linecap="round"/>
    <path d="M2 92L92 2" stroke="#D80101" stroke-width="3"
    stroke-linecap="round"/>
  </svg>
`;

const errTitle = el('h2.modal__title', 'Что-то пошло не так');
errTitle.style.color = '#6e6893';
errTitle.style.fontSize = '18px';
errTitle.style.textAlign = 'center';

setChildren(errModal, [
  btnClose,
  errCross,
  errTitle,
]);

setChildren(errOverlay, errModal);

btnClose.addEventListener('click', () => {
  errOverlay.remove();
});

errOverlay.addEventListener('click', e => {
  const target = e.target;
  if (target === errOverlay || target === btnClose) {
    errOverlay.remove();
  }
});

export default errOverlay;
