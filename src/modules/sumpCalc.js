const sumpCalc = () => {
  // const accordionCalc = document.getElementById("accordion");
  const inpSumpSwitcher = document.getElementById("myonoffswitch");
  const firstSumpDiameter = document.getElementById("first-sump-diameter");
  const firstSumpRings = document.getElementById("first-sump-rings");
  const secondSumpDiameter = document.getElementById("second-sump-diameter");
  const secondSumpRings = document.getElementById("second-sump-rings");
  const inpSumpBottom = document.getElementById("myonoffswitch-two");


  const basePrice = inpSumpSwitcher.checked ? 10000 : 15000;
  const coefDiameter = +firstSumpDiameter.value - 1 +
                        (inpSumpSwitcher.checked ? 0 : +secondSumpDiameter.value - 1);
  const coefRings = +firstSumpRings.value - 1 +
                      (inpSumpSwitcher.checked ? 0 : +secondSumpRings.value - 1);
  const pricePerBottom = inpSumpBottom.checked ?
                            1000 * (inpSumpSwitcher.checked ? 1 : 2) :
                            0;

  return Math.round( basePrice +
                      basePrice * coefDiameter +
                      basePrice * coefRings +
                      pricePerBottom
    );
};

export default sumpCalc;
