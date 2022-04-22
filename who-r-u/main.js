import pic1 from './assets/김규민.jpeg';
import pic2 from './assets/전희선.jpeg';
import pic3 from './assets/서혜은.jpg';
import pic4 from './assets/황주희.jpeg';
import pic5 from './assets/백지연.png';

// const $ = (selector) => document.querySelector(selector);

const answerListUl = document.querySelector('.answer__list');
const imageBoard = document.querySelector('.imageBoard > img');
const scoreDiv = document.querySelector('.scoreBoard__score');
const modalDiv = document.querySelector('.modal');
const modalBodyDiv = modalDiv.querySelector('p');

let orderIndex = [0, 1, 2, 3, 4];
let currentStep = -1;

const quizList = [
  {
    src: pic1,
    answer: '김규민',
  },
  {
    src: pic2,
    answer: '전희선',
  },
  {
    src: pic3,
    answer: '서혜은',
  },
  {
    src: pic4,
    answer: '황주희',
  },
  {
    src: pic5,
    answer: '백지연',
  },
];

const shuffleOrder = () => orderIndex.sort(() => Math.random() - 0.5);

const setNextStep = () => {
  currentStep++;
  imageBoard.setAttribute('src', quizList[orderIndex[currentStep]].src);
};

const startGame = () => {
  answerListUl.addEventListener('click', onClickAnswerList);
  currentStep = -1;
  shuffleOrder();
  setNextStep();
};

const showModal = (text) => {
  modalBodyDiv.innerText = text;
  modalDiv.classList.remove('hide');
  setTimeout(() => modalDiv.classList.add('hide'), 1500);
};

const checkAnswer = (name) => {
  if (name === quizList[orderIndex[currentStep]].answer) {
    if (currentStep < 4) setNextStep();
    else answerListUl.removeEventListener('click', onClickAnswerList);
    scoreDiv.innerText = Number(scoreDiv.innerText) + 1;
  } else {
    showModal('틀렸다리');
  }
};

const onClickAnswerList = (e) => {
  if (e.target.classList.contains('answer__list')) return;
  checkAnswer(e.target.innerText);
};

startGame();
