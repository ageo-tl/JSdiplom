import { showPopup, hidePopup } from "./modules/showAndHidePopup";


document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Call me back popup
  const popupCall = document.querySelector(".popup-call");
  const btnsCallMeBack = document.querySelectorAll(".call-btn[href='#']");



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

  });

});
