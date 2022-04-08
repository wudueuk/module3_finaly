import { mount } from 'redom';
import { container } from './js/createCrm';
import { getGoods } from './js/db';
import { renderGoods } from './js/render';

import './css/index.css';

const crm = document.querySelector('.crm');

mount(crm, container);

getGoods().then(data => renderGoods(data));
