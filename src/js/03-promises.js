import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form.form');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  let delay = Number(inputDelayEl.value);
  let step = Number(inputStepEl.value);
  let amount = Number(inputAmountEl.value);
  let position = 0;
  delay = delay - step;
  form.reset();
  for (let i = 0; i < amount; i += 1) {
    position = i + 1;
    delay += step;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

// Отримуєм посилання на HTML-елементи за допомогою їх селекторів:
// form - форма з класом "form"
// inputDelayEl - інпут з іменем "delay"
// inputStepEl - інпут з іменем "step"
// inputAmountEl - інпут з іменем "amount"

// Визначаєм функцію createPromise, яка створює новий об'єкт Promise. 
// Цей Promise виконується після певної затримки, випадковим чином вирішуючи, чи повинен 
// він бути виконаний успішно (resolve) чи відхилений (reject). Час затримки і позиція 
// передаються як параметри функції.

// Додаєм обробник події на форму з викликом функції onSubmit при поданні форми.

// У функції onSubmit:
// Викликається метод preventDefault() для перешкоджання стандартній поведінці форми при натисканні на кнопку "Submit".
// Отримуються значення полів вводу delay, step і amount та конвертуються в числа.
// Ініціалізується змінна position зі значенням 0.
// Зменшується значення delay на step.
// Викликається метод reset() для скидання значень полів вводу форми.
// Запускається цикл for, який повторюється amount i разів.
// Збільшується значення position на 1.
// Збільшується значення delay на step.
// Викликається функція createPromise з параметрами position і delay.
// Якщо Promise виконується успішно (resolve), викликається функція Notify.success з повідомленням про виконання обіцянки.
// Якщо Promise відхиляється (reject), викликається функція Notify.failure з повідомленням про відхилення обіцянки.
// Отже, коли форма подається, код створює об'єкти Promise з певними затримками