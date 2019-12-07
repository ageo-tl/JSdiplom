// Частые вопросы
const accFaqPanelBodiesHeight = {
  "collapseOne-two": "14rem",
  "collapseTwo-two": "7.5rem",
  "collapseThree-two": "9.5rem",
};
// Конструктор септика
const accCalcPanelBodiesHeight = {
  "collapseOne": "20rem",
  "collapseTwo": "32rem",
  "collapseThree": "22rem",
  "collapseFour": "20rem",
};

// Подготовка элементов "аккордеона" для анимирования
const _prepareAccord = (bodiesHeight, accordion, accPanelBodies) => {
  const accFaqPanelBlocks = accordion.querySelectorAll(".panel-default");
  accFaqPanelBlocks.forEach( (elem) => elem.style.overflow = "hidden");
  accPanelBodies.forEach( (elem) => {
    elem.style.height = bodiesHeight[elem.getAttribute("id")];
  });
};
const prepareAccordFaq = _prepareAccord.bind(null, accFaqPanelBodiesHeight);
const prepareAccordCalc = _prepareAccord.bind(null, accCalcPanelBodiesHeight);


// Возвращает активный элемент "аккордеона"
const getActiveElemOfAccord = (accPanelBodies, classCollapse) => {
  return [...accPanelBodies].filter(
    (elem) => elem.matches("." + classCollapse)
  )[0];
};

// Изменения элемента второго шага конструктора септика
const inpSumpSwitcher = document.getElementById("myonoffswitch");
const firstSump = document.getElementById("first-sump");
const secondSump = document.getElementById("second-sump");
const sumpSwitch = () => {
  if (inpSumpSwitcher.checked) {
    firstSump.querySelector(".title-text").textContent = "приемный колодец";
    accCalcPanelBodiesHeight.collapseTwo = "20.5rem";
    secondSump.style.display = "none";
  } else {
    firstSump.querySelector(".title-text").textContent =
        "первый колодец (приемный)";
    accCalcPanelBodiesHeight.collapseTwo = "32rem";
    secondSump.style.display = "block";
  }
};

export {
  getActiveElemOfAccord,
  prepareAccordFaq,
  prepareAccordCalc,
  sumpSwitch,
  accFaqPanelBodiesHeight,
  accCalcPanelBodiesHeight,
};
