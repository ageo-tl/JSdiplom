import { showPopup, hidePopup } from "./modules/showAndHidePopup";


document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Call me back popup
  const popupCall = document.querySelector(".popup-call");
  const btnsCallMeBack = document.querySelectorAll(".call-btn[href='#']");


  // Discount price and order
  const popupDiscount = document.querySelector(".popup-discount");
  const btnsDiscount = document.querySelectorAll(".discount-btn");
  const btnPriceOrder = document.querySelector(".construct-btn.call-btn");


  // Promotions and special offers
  const btnPromoMore = document.querySelector(".add-sentence-btn");
  const promoBlocks = document.querySelectorAll(".shadow-block");
  const hiddenPromoBlocks = [...promoBlocks].filter( (item) => {
    if (item.parentNode.matches(".visible-sm-block, .hidden")) {
      return item;
    }
  });



  // ADD EVENT LISTENER
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

    // Discount price and order
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

    // Promotions and special offers
    if (target === btnPromoMore) {
      btnPromoMore.style.display = "none";
      hiddenPromoBlocks.forEach( (elem) => {
        elem.parentNode.style.cssText = 'display: block !important';
      });

    }

  });

});
