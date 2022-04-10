const url = 'http://localhost:3000/api/goods';

const getGoods = async () => await fetch(url)
  .then(response => response.json());

const getGood = async goodId => await fetch(url + '/' + goodId)
  .then(response => response.json());

const postGoods = async (data) => await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

const deleteGoods = async goodId => await fetch(url + '/' + goodId, {
  method: 'DELETE',
});

export {
  getGoods,
  getGood,
  postGoods,
  deleteGoods,
};
