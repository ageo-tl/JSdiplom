import { commonAnimation, quad, animateNumber } from "./animation";

const inpSumpSwitcher = document.getElementById("myonoffswitch");
const firstSumpDiameter = document.getElementById("first-sump-diameter");
const firstSumpRings = document.getElementById("first-sump-rings");
const secondSumpDiameter = document.getElementById("second-sump-diameter");
const secondSumpRings = document.getElementById("second-sump-rings");
const inpSumpBottom = document.getElementById("myonoffswitch-two");
const inpDistance = document.getElementById("collapseFour").querySelector("input");
const inpCalcResult = document.getElementById("calc-result");

const sumpCalc = () => {
  const basePrice = inpSumpSwitcher.checked ? 10000 : 15000;
  const coefDiameter = +firstSumpDiameter.value - 1 +
                        (inpSumpSwitcher.checked ? 0 : +secondSumpDiameter.value - 1);
  const coefRings = +firstSumpRings.value - 1 +
                      (inpSumpSwitcher.checked ? 0 : +secondSumpRings.value - 1);
  const pricePerBottom = inpSumpBottom.checked ?
                            1000 * (inpSumpSwitcher.checked ? 1 : 2) :
                            0;

  const res = Math.round( basePrice +
                      basePrice * coefDiameter +
                      basePrice * coefRings +
                      pricePerBottom
                      );

  const animateRes = animateNumber.bind(null, inpCalcResult, inpCalcResult.value, res);
  commonAnimation({timing: quad, draw: animateRes, duration: 350});
};

const sumpData = () => {
  const sumps = [];
  sumps.push({
    diameter: parseFloat(firstSumpDiameter[firstSumpDiameter
                              .options.selectedIndex].textContent),
    countRings: parseFloat(firstSumpRings[firstSumpRings
                              .options.selectedIndex].textContent),
  });
  if (!inpSumpSwitcher.checked) {
    sumps.push({
      diameter: parseFloat(secondSumpDiameter[secondSumpDiameter
                              .options.selectedIndex].textContent),
      countRings: parseFloat(secondSumpRings[secondSumpRings
                              .options.selectedIndex].textContent),
    });
  }
  const data = {
    countSumps: inpSumpSwitcher.checked ? 1: 2,
    sumps,
    useBottom: inpSumpBottom.checked,
    distance: inpDistance.value,
    prePrice: inpCalcResult.value
  };

  return {"septic": data};
};

const resetSumpCalc = () => {
  inpSumpSwitcher.checked = true;
  firstSumpDiameter.options.selectedIndex = 0;
  firstSumpRings.options.selectedIndex = 0;
  secondSumpDiameter.options.selectedIndex = 0;
  secondSumpRings.options.selectedIndex = 0;
  inpSumpBottom.checked = true;
  inpDistance.value = "";
  sumpCalc();
};


export { sumpCalc, sumpData, resetSumpCalc };
