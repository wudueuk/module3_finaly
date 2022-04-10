import { mount } from 'redom';
import { container } from './js/createCrm';
import fetchDB from './js/db';
import { renderGoods } from './js/render';
import './css/index.css';

const crm = document.querySelector('.crm');

mount(crm, container);

fetchDB('GET', '', '', renderGoods);
