import { commonAnimation, quad, animateHeight } from "./animation";
import {
  accFaqPanelBodiesHeight,
  accCalcPanelBodiesHeight,
  getActiveElemOfAccord,
} from "./accordions";
import { showPopup, hidePopup } from "./showAndHidePopup";


const accFaqPanelBodies = document.getElementById("accordion-two")
                            .querySelectorAll(".panel-collapse");
const accCalcPanelBodies = document.getElementById("accordion")
                            .querySelectorAll(".panel-collapse");
// Это все из-за '.constructor .panel-four p::after' в css/style.css
const podstava = document.querySelector(".constructor .panel-four p");


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

const toggleAccordFaq = (target) => {
  const showId = target.closest(".panel-heading")
  .querySelector("h4>a").getAttribute("href").slice(1);
  const showElem = document.getElementById(showId);
  if (showElem.classList.contains("in")) {
  // Прерываем действие, если клик был на активном элементе
  return;
  }
  const hideElem = getActiveElemOfAccord(accFaqPanelBodies, "in");

  animateHideAccordElem(hideElem, "in", hideElem.style.height);
  animateShowAccordElem(showElem, "in",
  accFaqPanelBodiesHeight[showElem.getAttribute("id")]);
};

const toggleAccordCalc = (target) => {
  let showId;
  if (target.closest("a.construct-btn")) {
    // Получим ссылку у элемента a.construct-btn, если была нажата кнопка
    showId = target.closest("a.construct-btn").getAttribute("href").slice(1);
  } else {
    // Получим ссылку у элемента div.panel-heading, если нажали таб
    showId = target.closest(".panel-heading")
                  .querySelector("h4>a").getAttribute("href").slice(1);
  }
  const showElem = document.getElementById(showId);
  if (showElem.classList.contains("in")) {
    // Прерываем действие, если клик был на активном элементе
    return;
  }
  const hideElem = getActiveElemOfAccord(accCalcPanelBodies, "in");

  if (showElem.contains(podstava)) {
    showPopup(podstava, 600);
  }
  if (hideElem.contains(podstava)) {
    hidePopup(podstava, 200);
  }
  animateHideAccordElem(hideElem, "in", hideElem.style.height);
  animateShowAccordElem(showElem, "in",
      accCalcPanelBodiesHeight[showElem.getAttribute("id")]);
};


export { toggleAccordFaq, toggleAccordCalc };
