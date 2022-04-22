'use strict';

const cardListUl = document.querySelector('.card-list');
const cartBurgerListUl = document.querySelector('.cart__burger-list');

let addedBurgerList = [];

const parsePriceToNumber = (price) => {
  const removedComma = price.replace(/\D/g, '');
  return +removedComma;
};

const makeId = (price) => price / 1000;

const getBurgerFromInnerText = (innerText) => {
  const innerTextList = innerText.split('\n');
  return {
    id: makeId(parsePriceToNumber(innerTextList[1])),
    name: innerTextList[0],
    price: parsePriceToNumber(innerTextList[1]),
  };
};

const plusBurger = (id) => {
  const burgerEl = document.getElementById(`burger-${id}`);
  burgerEl.children[1].value = Number(burgerEl.children[1].value) + 1;
};

const deleteBurger = (burgerEl) => {
  addedBurgerList = addedBurgerList.filter(
    (burger) => burger.id !== Number(burgerEl.id.split('-')[1])
  );
  burgerEl.remove();
  // saveCart();
};

const renderNewBurger = (newBurger) => {
  const li = document.createElement('li');
  li.id = `burger-${newBurger.id}`;
  li.setAttribute('class', 'cart__burger');
  const nameDiv = document.createElement('div');
  nameDiv.innerText = newBurger.name;
  const input = document.createElement('input');
  input.value = 1;
  input.setAttribute('readonly', true);
  const priceDiv = document.createElement('div');
  priceDiv.innerText = newBurger.price.toLocaleString();
  const button = document.createElement('button');
  button.innerText = 'X';
  button.addEventListener('click', (e) => deleteBurger(e.target.parentNode));
  li.appendChild(nameDiv);
  li.appendChild(input);
  li.appendChild(priceDiv);
  li.appendChild(button);
  cartBurgerListUl.appendChild(li);
};

const addNewBurger = (newBurger) => {
  addedBurgerList.push(newBurger);
  renderNewBurger(newBurger);
};

// const saveCart = () => {
//   // 미완
// };

const onClickBurger = (e) => {
  let el = e.target;
  if (el.classList.contains('card-list')) return;
  while (!el.classList.contains('card')) {
    el = el.parentNode;
  }
  const burger = getBurgerFromInnerText(el.innerText);
  if (addedBurgerList.some((targetBurger) => targetBurger.id === burger.id))
    plusBurger(burger.id);
  else addNewBurger(burger);
  // saveCart();
  // 합계 더해주기
};

cardListUl.addEventListener('click', onClickBurger);
