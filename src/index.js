import { showPopup, hidePopup } from "./modules/showAndHidePopup";
import {
  animateShowAccordElem,
  animateHideAccordElem
} from "./modules/toggleElemsOfAccord";
import { showHiddenBlocks, disableBlockHiding } from "./modules/showAddPromo";


document.addEventListener("DOMContentLoaded", () => {
  "use strict";

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
  const accFaqRef = accordionFAQ.querySelectorAll("a[data-parent='#accordion-two']");
  const accFaqPanels = [...accFaqRef].map((elem) => elem.closest(".panel-heading"));
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
  const getActiveElemOfAccord = (classCollapse) => {
    return [...accFaqPanelBodies].filter(
      (elem) => elem.matches("." + classCollapse)
    )[0];
  };




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
    }
    if (target === popupDiscount ||
        target === popupDiscount.querySelector(".popup-close")) {
      event.preventDefault();
      // popupDiscount.style.display = "none";
      hidePopup(popupDiscount);
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
      const hideElem = getActiveElemOfAccord("in");

      // simpleTogglePanelBody(showElem, hideElem, "in");
      animateHideAccordElem(hideElem, "in", hideElem.style.height);
      animateShowAccordElem(showElem, "in",
          accFaqPanelBodiesHeight[showElem.getAttribute("id")]);
    }



  });

});
