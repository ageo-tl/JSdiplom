import { commonAnimation, quad, animateHeight } from "./animation";

// Переключение видимости элементов "аккордеона"
const simpleTogglePanelBody = (showElem, hideElem, classCollapse) => {
  // Скрываем активный элемент
  hideElem.classList.remove(classCollapse);
  // Показываем элемент, на заголовке которого был клик
  showElem.classList.add(classCollapse);
};


// Анимированное скрытие элемента "аккордеона"
const animateHideAccordElem = (elem, classCollapse, currentHeight,
      duration=350) => {

  const height = parseFloat(currentHeight);
  const units = currentHeight.replace(/^\-?\d+(\.\d+)?/, "");

  // Скрываем активный элемент
  const animationHidePanel = animateHeight.bind(null,
      elem, height, 0, units);
  commonAnimation({timing: quad, draw: animationHidePanel, duration});
  setTimeout( () => {
    elem.classList.remove(classCollapse);
  }, duration);
};

// Анимированное отображение элемента "аккордеона"
const animateShowAccordElem = (elem, classCollapse, targetHeight,
      duration=350) => {

  const height = parseFloat(targetHeight);
  const units = targetHeight.replace(/^\-?\d+(\.\d+)?/, "");

  // Показываем элемент, на заголовке которого был клик
  elem.style.height = "0rem";
  elem.classList.add(classCollapse);
  const animationShowPanel = animateHeight.bind(null, elem,
      0, height, units);
  commonAnimation({timing: quad, draw: animationShowPanel, duration});
};

export { animateShowAccordElem, animateHideAccordElem };
