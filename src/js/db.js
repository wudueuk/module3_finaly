import { mount } from 'redom';
import errOverlay from './errModal';
const url = 'http://localhost:3000/api/goods';

const dbResponse = async (method, goodId, query) => {
  switch (method) {
    case 'GET':
      const uri = goodId ? url + '/' + goodId : query
        ? url + '/' + query : url;
      return await fetch(uri);
    case 'POST':
      return await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(query),
      });
    case 'DELETE':
      return await fetch(url + '/' + goodId, {
        method: 'DELETE',
      });
    case 'PATH':
      return await fetch(url + '/' + goodId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(query),
      });
  }
};

const fetchDB = async (method, id, query, cb) => {
  return await dbResponse(method, id, query)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      } else {
        mount(document.body, errOverlay);
        return [];
      }
    })
    .then(data => {
      if (cb) { cb(data) }
    });
};

export default fetchDB;
