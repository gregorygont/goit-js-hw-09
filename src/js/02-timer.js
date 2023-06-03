import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.backgroundColor = '#ece5da';
const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

const calendar = document.querySelector('#datetime-picker'); // Отримуєм посилання на елементи сторінки: calendar
const startBtn = document.querySelector('[data-start]');  // і startBtn.
startBtn.disabled = true;

Report.info(
  '👋 Greeting, my Friend!',
  'Please, choose a date and click on start',
  'Okay'
);  // Виводить повідомлення за допомогою функції Report.info() бібліотеки notiflix

flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure(
        '🥺 Ooops...',
        'Please, choose a date in the future and remember: "Knowledge rests not upon truth alone, but upon error also." - Carl Gustav Jung',
        'Okay'
      );
    } else {
      Report.success(
        '🥰 Congratulation! Click on start!',
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Okay'
      );
      startBtn.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
        timer.start();
      };

      startBtn.addEventListener('click', setTimer);
    }
  },
}); // Ініціалізуєм об'єкт flatpickr для календаря (використовується стороння бібліотека flatpickr).
// При закритті календаря (функція onClose) перевіряє, чи вибрана дата менша за поточну дату і виводить відповідне повідомлення 
// за допомогою функцій Report.failure() або Report.success(). Також встановлюєм властивість disabled для кнопки startBtn 
// в значення false (увімкнено) і створюєм обробник події для кнопки startBtn, який викликає функцію setTimer.

const timer = {
  rootSelector: document.querySelector('.timer'),
  start() {
    intervalId = setInterval(() => {
      startBtn.disabled = true;
      calendar.disabled = true;
      currentDate = Date.now();
      const delta = selectedDate - currentDate;

      if (delta <= 0) {
        this.stop();
        Report.info(
          '👏 Congratulation! Timer stopped!',
          'Please, if you want to start timer, choose a date and click on start or reload this page',
          'Okay'
        );
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.rootSelector.querySelector('[data-days]').textContent =
        this.addLeadingZero(days);
      this.rootSelector.querySelector('[data-hours]').textContent =
        this.addLeadingZero(hours);
      this.rootSelector.querySelector('[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      this.rootSelector.querySelector('[data-seconds]').textContent =
        this.addLeadingZero(seconds);
    }, TIMER_DELAY);
  },
  
  stop() {
    clearInterval(intervalId);
    this.intervalId = null;
    startBtn.disabled = true;
    calendar.disabled = false;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  },
  // // Оголошуєм об'єкт timer, який має методи start() і stop() для розпочаття і зупинки таймера. 
  // Метод start() встановлює інтервал, який виконується кожну секунду (TIMER_DELAY) і оновлює значення таймера на сторінці. 
  // Метод stop() зупиняє таймер і знову встановлює властивість disabled для кнопки startBtn і календаря. 
  // Також в об'єкті timer є декілька внутрішніх методів для конвертації мілісекунд в дні, години, хвилини і секунди, 
  // а також для додавання ведучого нуля до чисел.


  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};