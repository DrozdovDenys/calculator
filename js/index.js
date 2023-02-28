// Write your code here
let a = ''; //firs number
let b = ''; // second number
let res = '';
let sign = ''; // знак
let finish = false;
let arr = [];
let lastIndex = -1;
let timeForCalc = 100;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/'];

// monitor calc
// const out = document.querySelector('.calc-screen p');
const out = $('.out')[0];

function clearAll() {
  a = ''; //first number and result
  b = ''; // second number
  sign = ''; // знак
  finish = false;
  out.textContent = 0;
  arr = [];
}

$('.ac').click(() => {
  clearAll();
});

$('.buttons').click((event) => {
  // нажата не кнопка
  if (!event.target.classList.contains('btn')) {
    return;
  }
  // нажата кнопка ас
  if (event.target.classList.contains('ac')) {
    return;
  }

  out.textContent = '';
  // get pushed button
  const key = event.target.textContent;

  // if pushed 0-9 or '.'
  if (digit.includes(key)) {
    if (b === '' && sign === '') {
      a += key;

      out.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      out.textContent = b;
    }
    arr.push(key);
    return;
  }

  // if pushed '-', '+', '*', '/'
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    arr.push(' ' + key + ' ');
    return;
  }

  // pushed '='
  if (key === '=') {
    if (b === '') {
      b = a;
    }
    switch (sign) {
      case '+':
        a = +a + +b;

        break;
      case '-':
        a = a - b;

        break;
      case 'x':
        a = a * b;

        break;
      case '/':
        if (b === '0') {
          out.textContent = 'ERROR';
          a = '';
          b = '';
          sign = '';
          arr = [];
          return;
        }
        a = a / b;
        break;

      default:
        break;
    }
    finish = true;
    out.textContent = a;
    res = a;
    if (a !== '') {
      arr.push(' ' + key + ' ');
      arr.push(res);
    }
  }
  setTimeout(() => {
    arr = arr.slice(lastIndex);
  }, timeForCalc);
});

$('.equal').click(() => {
  setTimeout(() => {
    if (arr.length > 0) {
      $('.list-log').prepend(
        `<li class='list-log__li'>
        <span class='circle'></span>
        <span class='result'>${arr.join('')}</span>
        <span class='close'>X</span>
        </li>`
      );

      let arrOfLi = [];
      arrOfLi = [...$('.list-log').find('.result')];
      arrOfLi.map((el) =>
        el.innerText.includes('48')
          ? $(el).css('text-decoration', 'underline')
          : null
      );

      $('.list-log').click(function (e) {
        e.stopImmediatePropagation();

        if (e.target.className === 'close') {
          $(e.target).parent().slideUp();
        } else if (
          e.target.className === 'circle' ||
          e.target.className === 'circle bg-red'
        ) {
          $(e.target).toggleClass('bg-red');
        }
      });

      $('.log').scroll(() => {
        console.log('Scroll Top: ', $('.log').scrollTop());
      });
    }
  }, timeForCalc);
});
