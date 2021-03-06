import { showPopup, hidePopup } from "./modules/showAndHidePopup";
import {
  toggleAccordFaq,
  toggleAccordCalc,
} from "./modules/toggleElemsOfAccord";
import {
  showHiddenBlocks,
  disableBlockHiding,
  getHidePromoBlocks,
} from "./modules/showAddPromo";
import { sumpCalc, sumpData } from "./modules/sumpCalc";
import sendForm from "./modules/sendForm";
import {
  cyrillicFilter,
  numericFilter,
  notEmptyValid
} from "./modules/inputFilters";
import {
  prepareAccordFaq,
  prepareAccordCalc,
  sumpSwitch,
} from "./modules/accordions";


document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  // Для хранения данных с форм (конструктор септика, вопрос для консультации)
  let userData = null;

  // All forms
  const directorForm = document.querySelector("form.director-form");


  // Call me back popup
  const popupCall = document.querySelector(".popup-call");
  const btnsCallMeBack = document.querySelectorAll(".call-btn[href='#']");


  // Discount price and order popup
  const popupDiscount = document.querySelector(".popup-discount");
  const btnsDiscount = document.querySelectorAll(".discount-btn");
  const btnPriceOrder = document.querySelector(".construct-btn.call-btn");
  const inpDistance = document.getElementById("calc-distance");


  // Get check-list popup
  const popupCheck = document.querySelector(".popup-check");
  const btnGetCheckList = document.querySelector(".check-btn");


  // Get consultation popup
  const popupConsult = document.querySelector(".popup-consultation");
  const btnConsult = document.querySelector(".consultation-btn");
  const inpQuestion = directorForm.querySelector("input");


  // Promotions and special offers
  const btnPromoMore = document.querySelector(".add-sentence-btn");
  const promoBlocks = document.querySelectorAll(".shadow-block");
  const initHiddenPromoBlocks = getHidePromoBlocks(promoBlocks, false);


  //accordion-FAQ
  const accordionFAQ = document.getElementById("accordion-two");
  const accFaqRefs = accordionFAQ.querySelectorAll("a[data-parent='#accordion-two']");
  const accFaqPanels = [...accFaqRefs].map((elem) => elem.closest(".panel-heading"));
  const accFaqPanelBodies = accordionFAQ.querySelectorAll(".panel-collapse");
  // Подготовка элементов "аккордеона" с частыми вопросами для анимирования
  prepareAccordFaq(accordionFAQ, accFaqPanelBodies);


  //accordion-calc
  const accordionCalc = document.getElementById("accordion");
  const accCalcRefs = accordionCalc.querySelectorAll("a[data-parent='#accordion'][role='button']");
  const accCalcPanels = [...accCalcRefs].map((elem) => elem.closest(".panel-heading"));
  const accCalcPanelBodies = accordionCalc.querySelectorAll(".panel-collapse");
  const accCalcRefsOnButton = accordionCalc.querySelectorAll("a.construct-btn[data-parent='#accordion']");
  // Подготовка элементов "аккордеона" с частыми вопросами для анимирования
  prepareAccordCalc(accordionCalc, accCalcPanelBodies);


  // sump-switcher
  const sumpSwitcher =
      document.getElementById("collapseOne").querySelector(".onoffswitch");
  sumpSwitch();


  // sump-calculator
  // use accordionCalc from block 'accordion-calc'
  sumpCalc();


  // Input filter
  // for numeric filter
  const phoneInputs = document.querySelectorAll(".phone-user");
  const calcInputs = document.querySelectorAll("input[id^=\"calc-\"]");
  // for cyrillic filter
  const nameInputs = document.querySelectorAll("input[id^=\"name_\"]");
  const userQuestion = document.getElementById("user_quest");


  // function for listener
  const closePopup = (event, popup, target) => {
    if (target === popup ||
      target === popup.querySelector(".popup-close")) {
      event.preventDefault();
      hidePopup(popup);
      userData = null;
    }
  };


  // ADD EVENT LISTENER FOR CLICK
  document.addEventListener("click", (event) => {
    const { target } = event;

    // Call me back popup
    if ([...btnsCallMeBack].includes(target)) {
      event.preventDefault();
      showPopup(popupCall);
    }
    closePopup(event, popupCall, target);

    // Discount price and order popup
    if ([...btnsDiscount, btnPriceOrder].includes(target)) {
      let start = true;
      if (btnPriceOrder.contains(target)) {
        userData = sumpData();
        start = notEmptyValid(inpDistance);
      } else {
        userData = null;
      }
      if (start) {
        showPopup(popupDiscount);
      }
    }
    closePopup(event, popupDiscount, target);

    // Get check-list popup
    if (target === btnGetCheckList) {
      event.preventDefault();
      showPopup(popupCheck);
    }
    closePopup(event, popupCheck, target);

    // Get consultation popup
    if (target === btnConsult) {
      event.preventDefault();
      userData = {userQuestion: inpQuestion.value};
      if (notEmptyValid(inpQuestion)) {
        showPopup(popupConsult);
      }
    }
    closePopup(event, popupConsult, target);

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
      toggleAccordFaq(target);
    }

    //accordion-Calc
    if (accCalcPanels.includes(target.closest(".panel-heading")) ||
        [...accCalcRefsOnButton].includes(target.closest("a"))) {
      event.preventDefault();
      toggleAccordCalc(target);
    }

    //sump-switcher
    if (sumpSwitcher.contains(target)) {
      sumpSwitch();
    }
  });


  // ADD EVENT LISTENER FOR CHANGE
  accordionCalc.addEventListener("change", () => {
    sumpCalc();
  });


  // ADD EVENT LISTENER FOR SUBMIT
  document.addEventListener("submit", (event) => {
    const { target } = event;
    const currentForm = target.closest("form");
    if (currentForm) {
      event.preventDefault();
      if (!currentForm.contains(directorForm)) {
        sendForm(currentForm, currentForm.closest(".popup") ? userData : null);
      }
    }
  });


  // ADD EVENT LISTENER FOR INPUT
  document.addEventListener("input", (event) => {
    const { target } = event;
    if ([...phoneInputs, ...calcInputs].includes(target)) {
      numericFilter(target);
      notEmptyValid(target);
    }
    if ([...nameInputs].includes(target)) {
      cyrillicFilter(target);
      notEmptyValid(target);
    }
    if (userQuestion.contains(target)) {
      cyrillicFilter(target, true);
      notEmptyValid(target);
    }
  });


  // ADD EVENT LISTENER FOR MOUSEOVER
  document.addEventListener("mouseover", (event) => {
    const { target } = event;
    if ([...accFaqPanels, ...accCalcPanels].includes(target.closest(".panel-heading"))) {
      target.closest(".panel-heading").style.cursor = "pointer";
    }
  });

});
