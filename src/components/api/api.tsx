import data from "./api.json";
import {log} from "util";

const getResourse = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибочка ${url} status: ${response.status}`);
  }

  return await response.json();
}
const postResourse = async (url: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'лаванда',
      vendorCode: '2022',
      category: 'Не тарелка',
      type: 'MOney',
      unitType: 'M',
      perchasePrice: '20000',
      salePrice: '1000',
      status: 'green'
    })
  });

  const todo = await response.json();

  console.log(todo)
  return response;
}

export function getAllData( {name, status}: any = false) {
  postResourse('https://mockend.com/org/repo/users');

  return getResourse('https://mockend.com/org/repo/posts');
};

