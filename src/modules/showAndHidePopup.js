import { commonAnimation, quad } from "./animation";

const _animatePopup = (elem, current, target, progress) => {
  elem.style.opacity =
      (current + (target - current) * progress).toString();
};
// function _animatePopup(current, target, progress) {
//   this.style.opacity =
//       (current + (target - current) * progress).toString();
// }

const showPopup = (elem, duration=350) => {
  elem.style.opacity = "0";
  elem.style.display = "block";
  const animateShowPopup = _animatePopup.bind(null, elem, 0, 1);
  // const animateShowPopup = animatePopup.bind(elem, 0, 1);
  commonAnimation({timing: quad, draw: animateShowPopup, duration });
};
const hidePopup = (elem, duration=350) => {
  const animateHidePopup = _animatePopup.bind(null, elem, 1, 0);
  // const animateHidePopup = animatePopup.bind(elem, 1, 0);
  commonAnimation({timing: quad, draw: animateHidePopup, duration});
  setTimeout( () => {
    elem.style.display = "none";
  }, duration);
};

export { showPopup, hidePopup };
