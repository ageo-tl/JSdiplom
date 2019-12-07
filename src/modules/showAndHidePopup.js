import { commonAnimation, quad, animateOpacity } from "./animation";

const showPopup = (elem, duration=350) => {
  elem.style.opacity = "0";
  elem.style.display = "block";
  const animateShowPopup = animateOpacity.bind(null, elem, 0, 1);
  commonAnimation({timing: quad, draw: animateShowPopup, duration });
};
const hidePopup = (elem, duration=350) => {
  const animateHidePopup = animateOpacity.bind(null, elem, 1, 0);
  commonAnimation({timing: quad, draw: animateHidePopup, duration});
  setTimeout( () => {
    elem.style.display = "none";
  }, duration);
};

export { showPopup, hidePopup };
