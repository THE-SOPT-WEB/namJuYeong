import pic1 from './assets/김규민.jpeg';
import pic2 from './assets/전희선.jpeg';
import pic3 from './assets/서혜은.jpg';
import pic4 from './assets/황주희.jpeg';
import pic5 from './assets/백지연.png';

const $ = (selector) => document.querySelector(selector);

const test = document.querySelector('.buttonList__shuffle');

test.addEventListener('click', () => console.log('fnflfl'));

let currentStep = 0;

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
