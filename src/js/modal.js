import { el, setChildren } from 'redom';

const modal = el('div.overlay__modal.modal');

const btnClose = el('button.modal__close');
btnClose.innerHTML = `
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" 
      stroke-width="3" stroke-linecap="round" />
  </svg>
`;

const modalTop = el('div.modal__top');
const modalTitle = el('h2.modal__title');
const modalVendor = el('div.modal__vendor-code.vendor-code');
const vendorId = el('span.vendor-code__id');
const vendorBtn = el('button.vendor-code__btn');
vendorBtn.innerHTML = `
  <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#a)" stroke="currentColor" stroke-width="2" 
      stroke-linecap="round" stroke-linejoin="round">
      <path d="m11.672 3.646 1.557 1.556-1.557-1.556Zm1.002-1.372L8.463
        6.485a1.557 1.557 0 0 0-.427.796l-.389 1.947
          1.947-.39c.302-.06.578-.208.796-.425L14.6 4.2a1.36 1.36 0 0 0
            0-1.927 1.362 1.362 0 0 0-1.926 0v0Z" />
      <path d="M13.53 10.699v2.206a1.47 1.47 0 0 1-1.471 1.47H3.97a1.47
        1.47 0 0 1-1.471-1.47V4.816a1.47 1.47 0 0 1 1.47-1.47h2.207" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h15v15H0z" />
      </clipPath>
    </defs>
  </svg>
`;

setChildren(modalVendor, [
  el('p.vendor-code__wrapper', 'id: ', vendorId),
  vendorBtn,
]);

setChildren(modalTop, [modalTitle, modalVendor]);
setChildren(modal, [btnClose, modalTop]);

export {
  modal,
  modalTitle,
  vendorId,
};
