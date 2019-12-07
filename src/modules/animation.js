// Расчет прогресса от времени ("дуга")
const quad = (timeFraction) => {
  return Math.pow(timeFraction, 2);
};

// Прозрачность элемента
const animateOpacity = (elem, current, target, progress) => {
  elem.style.opacity =
      (current + (target - current) * progress).toString();
};

// Прокрутка страницы
const animateScrollPage = (current, target, progress) => {
  document.documentElement.scrollTop =
      current + (target - current) * progress;
};

// Высота элемента
const animateHeight = (elem, current, target, units, progress) => {
  elem.style.height =
      (current + (target - current) * progress).toString() + units;
};

// Содержимое (число) элемента input
const animateNumber = (elem, current, target, progress) => {
  elem.value =
        Math.floor(+current + (target - current) * progress);
};

// Анимация действия
const commonAnimation = ({ timing, draw, duration }) => {

  const start = performance.now();

  const animate = (time) => {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) { timeFraction = 1; }

    // вычисление текущего состояния анимации и ее отрисовка
    draw(timing(timeFraction));

    // рекурсия по условию
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

export {
  quad,
  animateOpacity,
  animateScrollPage,
  animateHeight,
  animateNumber,
  commonAnimation
};
