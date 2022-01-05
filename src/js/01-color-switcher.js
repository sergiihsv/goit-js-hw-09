const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', start);
refs.stopBtn.addEventListener('click', stop);

let intervalColorChange = '';

function start() {
  intervalColorChange = setInterval(evt => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', true);
}

function stop() {
  clearInterval(intervalColorChange);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
