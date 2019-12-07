import { showPopup, hidePopup } from "./modules/showAndHidePopup";
import {
  animateShowAccordElem,
  animateHideAccordElem
} from "./modules/toggleElemsOfAccord";
import { showHiddenBlocks, disableBlockHiding } from "./modules/showAddPromo";
import { sumpCalc, sumpData } from "./modules/sumpCalc";
import sendForm from "./modules/sendForm";


document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  // Для хранения данных с форм (конструктор септика, вопрос для консультации)
  let userData = null;

  // Call me back popup
  const popupCall = document.querySelector(".popup-call");
  const btnsCallMeBack = document.querySelectorAll(".call-btn[href='#']");


  // Discount price and order popup
  const popupDiscount = document.querySelector(".popup-discount");
  const btnsDiscount = document.querySelectorAll(".discount-btn");
  const btnPriceOrder = document.querySelector(".construct-btn.call-btn");


  // Get check-list popup
  const popupCheck = document.querySelector(".popup-check");
  const btnGetCheckList = document.querySelector(".check-btn");


  // Get consultation popup
  const popupConsult = document.querySelector(".popup-consultation");
  const btnConsult = document.querySelector(".consultation-btn");


  // Promotions and special offers
  const btnPromoMore = document.querySelector(".add-sentence-btn");
  const promoBlocks = document.querySelectorAll(".shadow-block");

  const getHidePromoBlocks = (blocks, actual=true) => {
    const windowWidth = document.documentElement.clientWidth;

    // 768...NO-.visible-sm-block...991
    let classesMask;
    if (windowWidth > 768 && windowWidth < 991 && actual) {
      classesMask = ".hidden";
    } else {
      classesMask = ".visible-sm-block, .hidden";
    }

    let hiddenBlocks = [...blocks].filter( (item) => {
      if (item.parentNode.matches(classesMask)) {
        return item;
      }
    });
    return hiddenBlocks.map((item) => item.parentNode);
  };

  const initHiddenPromoBlocks = getHidePromoBlocks(promoBlocks, false);


  //accordion-FAQ
  const accordionFAQ = document.getElementById("accordion-two");
  const accFaqRefs = accordionFAQ.querySelectorAll("a[data-parent='#accordion-two']");
  const accFaqPanels = [...accFaqRefs].map((elem) => elem.closest(".panel-heading"));
  const accFaqPanelBodies = accordionFAQ.querySelectorAll(".panel-collapse");

  // Подготовка элементов "аккордеона" с частыми вопросами для анимирования
  const accFaqPanelBodiesHeight = {
    "collapseOne-two": "14rem",
    "collapseTwo-two": "7.5rem",
    "collapseThree-two": "9.5rem",
  };
  accFaqPanelBodies.forEach( (elem) => {
    elem.style.height = accFaqPanelBodiesHeight[elem.getAttribute("id")];
  });
  const accFaqPanelBlocks = accordionFAQ.querySelectorAll(".panel-default");
  accFaqPanelBlocks.forEach( (elem) => elem.style.overflow = "hidden");

  // Возвращает активный элемент "аккордеона"
  const getActiveElemOfAccord = (accPanelBodies, classCollapse) => {
    return [...accPanelBodies].filter(
      (elem) => elem.matches("." + classCollapse)
    )[0];
  };


  //accordion-calc
  const accordionCalc = document.getElementById("accordion");
  const accCalcRefs = accordionCalc.querySelectorAll("a[data-parent='#accordion'][role='button']");
  const accCalcPanels = [...accCalcRefs].map((elem) => elem.closest(".panel-heading"));
  const accCalcPanelBodies = accordionCalc.querySelectorAll(".panel-collapse");
  const accCalcRefsOnButton = accordionCalc.querySelectorAll("a.construct-btn[data-parent='#accordion']");

  // Подготовка элементов "аккордеона" с частыми вопросами для анимирования
  const accCalcPanelBodiesHeight = {
    "collapseOne": "20rem",
    "collapseTwo": "32rem",
    "collapseThree": "22rem",
    "collapseFour": "20rem",
  };
  accCalcPanelBodies.forEach( (elem) => {
    elem.style.height = accCalcPanelBodiesHeight[elem.getAttribute("id")];
  });
  const accCalcPanelBlocks = accordionCalc.querySelectorAll(".panel-default");
  accCalcPanelBlocks.forEach( (elem) => elem.style.overflow = "hidden");

  // Это все из-за '.constructor .panel-four p::after' в css/style.css
  const podstava = document.querySelector(".constructor .panel-four p");


  // sump-switcher
  const sumpSwitcher =
      document.getElementById("collapseOne").querySelector(".onoffswitch");
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
  sumpSwitch();


  // sump-calculator
  // use accordionCalc from block 'accordion-calc'
  // const inpDistance = document.getElementById("collapseFour").querySelector("input");
  const inpCalcResult = document.getElementById("calc-result");

  inpCalcResult.value = sumpCalc();


  // All forms
  const forms = document.querySelectorAll("form");
  const directorForm = document.querySelector("form.director-form");



  // ADD EVENT LISTENER FOR CLICK
  document.addEventListener("click", (event) => {
    const { target } = event;
    // console.log('TARGET: ', target);

    // Call me back popup
    if ([...btnsCallMeBack].includes(target)) {
      event.preventDefault();
      // popupCall.style.display = "block";
      showPopup(popupCall);
    }
    if (target === popupCall ||
        target === popupCall.querySelector(".popup-close")) {
      event.preventDefault();
      // popupCall.style.display = "none";
      hidePopup(popupCall);
    }

    // Discount price and order popup
    if ([...btnsDiscount, btnPriceOrder].includes(target)) {
      // popupDiscount.style.display = "block";
      showPopup(popupDiscount);
      if (btnPriceOrder.contains(target)) {
        userData = sumpData();
      }
    }
    if (target === popupDiscount ||
        target === popupDiscount.querySelector(".popup-close")) {
      event.preventDefault();
      // popupDiscount.style.display = "none";
      hidePopup(popupDiscount);
      userData = null;
    }

    // Get check-list popup
    if (target === btnGetCheckList) {
      event.preventDefault();
      showPopup(popupCheck);
    }
    if (target === popupCheck ||
        target === popupCheck.querySelector(".popup-close")) {
      event.preventDefault();
      hidePopup(popupCheck);
    }

    // Get consultation popup
    if (target === btnConsult) {
      event.preventDefault();
      showPopup(popupConsult);
      userData = {userQuestion: directorForm.querySelector("input").value};
      console.log('userData: ', userData);
    }
    if (target === popupConsult ||
        target === popupConsult.querySelector(".popup-close")) {
      event.preventDefault();
      hidePopup(popupConsult);
      userData = null;
    }

    // Promotions and special offers
    if (target === btnPromoMore) {
      btnPromoMore.style.display = "none";

      const hiddenBlocks = getHidePromoBlocks(promoBlocks);
      const tempDisplayedBlocks = initHiddenPromoBlocks.filter(
            (block) => !hiddenBlocks.includes(block)
        );

      disableBlockHiding(tempDisplayedBlocks);
      showHiddenBlocks(hiddenBlocks);
    }

    //accordion-FAQ
    if (accFaqPanels.includes(target.closest(".panel-heading"))) {
      event.preventDefault();
      const showId = target.closest(".panel-heading")
                      .querySelector("h4>a").getAttribute("href").slice(1);
      const showElem = document.getElementById(showId);
      if (showElem.classList.contains("in")) {
        // Прерываем действие, если клик был на активном элементе
        return;
      }
      const hideElem = getActiveElemOfAccord(accFaqPanelBodies, "in");

      // simpleTogglePanelBody(showElem, hideElem, "in");
      animateHideAccordElem(hideElem, "in", hideElem.style.height);
      animateShowAccordElem(showElem, "in",
          accFaqPanelBodiesHeight[showElem.getAttribute("id")]);
    }

    //accordion-Calc
    if (accCalcPanels.includes(target.closest(".panel-heading")) ||
        [...accCalcRefsOnButton].includes(target.closest("a"))) {
      event.preventDefault();
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

      // simpleTogglePanelBody(showElem, hideElem, "in");

      if (showElem.contains(podstava)) {
        showPopup(podstava, 600);
      }
      if (hideElem.contains(podstava)) {
        hidePopup(podstava, 200);
      }
      animateHideAccordElem(hideElem, "in", hideElem.style.height);
      animateShowAccordElem(showElem, "in",
          accCalcPanelBodiesHeight[showElem.getAttribute("id")]);
    }


    //sump-switcher
    if (sumpSwitcher.contains(target)) {
      sumpSwitch();
    }
  });


  // ADD EVENT LISTENER FOR CHANGE
  accordionCalc.addEventListener("change", (event) => {
    inpCalcResult.value = sumpCalc();
  });


  // ADD EVENT LISTENER FOR SUBMIT
  forms.forEach( (form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.contains(directorForm)) {
        sendForm(form, userData);
      }
    });
  });

});
