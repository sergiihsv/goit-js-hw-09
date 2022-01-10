import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = this.config.defaultDate.getTime();
    if (currentDate > selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

const datePickr = flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', () => {
  timer.end();
});

const timer = {
  isActive: false,
  end() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    refs.input.disabled = true;
    refs.startBtn.disabled = true;

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = datePickr.selectedDates[0] - currentTime;

      if (datePickr.selectedDates[0] <= currentTime) {
        clearInterval(intervalId);
        Notiflix.Notify.failure('You time is up!');
        return;
      }

      const time = convertMs(deltaTime);
      updateClock(time);
      if (deltaTime < 1000) {
        clearInterval(intervalId);
      }
    }, 1000);
  },
};

function updateClock({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
