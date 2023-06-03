const CHANGE_COLOR_DELAY = 1000;
let idInt = null;

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', onBtnStartChangeColor);
refs.btnStop.addEventListener('click', onBtnStopChangeColor);


function onBtnStartChangeColor() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;

    idInt = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, CHANGE_COLOR_DELAY);
}

function onBtnStopChangeColor() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
    clearInterval(idInt);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

//Встановлюємо константу CHANGE_COLOR_DELAY зі значенням 1000 (1 секунда).
//Ініціалізуємо змінну idInt зі значенням null.
//Отримуюємо посилання на HTML-елементи за допомогою document.querySelector і зберігаємо в об'єкті refs. 
//Отримуємо посилання на кнопки з атрибутами data-start і data-stop, а також на body.
//Встановлюємо властивість disabled для кнопки btnStop, щоб заблокувати її.
//Додаємо обробники подій click для кнопок btnStart і btnStop, які викликають функції onBtnStartChangeColor і onBtnStopChangeColor відповідно.
//Функція onBtnStartChangeColor виконується, коли кнопка btnStart натискається. У цій функції кнопка btnStart 
//блокується (встановлюється властивість disabled), а кнопка btnStop розблоковується. Створюється інтервал, 
//що виконується кожні 1000 мілісекунд (1 секунда). У цьому інтервалі змінюється колір фону body, викликаючи 
//функцію getRandomHexColor.
//Функція onBtnStopChangeColor виконується, коли кнопка btnStop натискається. У цій функції кнопка btnStart 
//розблоковується, а кнопка btnStop блокується. Інтервал зміни кольору фону очищається за допомогою clearInterval.
//Функція getRandomHexColor повертає випадковий шестнадцятковий колір в форматі #RRGGBB, де 
//RR, GG і BB - шестнадцяткові значення червоного, зеленого і синього каналів відповідно. 
// Math.random() генерує випадкове число від 0 (включно) до 1 (не включаючи).
// Math.floor(Math.random() * 16777215) обчислює випадкове число від 0 до 16777214, включно.
// .toString(16) перетворює це число на рядкове представлення в шістнадцятковій системі числення.
// .padStart(6, 0) додає нулі в початок рядка, якщо його довжина менше 6 символів. Це потрібно для 
//забезпечення того, що результат буде мати завжди шість цифр (наприклад, #FF0000), оскільки кожен канал 
//кольору (червоний, зелений, синій) представлений двома шістнадцятковими цифрами.
// Результуючий шестнадцятковий колір повертається у форматі #RRGGBB. Наприклад, #FF0000 представляє 
//червоний колір, #00FF00 - зелений, #0000FF - синій, а #7B3FDC - довільний випадковий колір.