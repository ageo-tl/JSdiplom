import { commonAnimation, quad, animateOpacity, animateScrollPage } from "./animation";


const showHiddenBlocks = (elems, duration=350, timeoutGap=250) => {
  // Начало отображения элементов и
  // определение функции анимирования появления для каждого элемента
  const elemsDraw = [];
  elems.forEach( (elem) => {
    elem.style.cssText = 'opacity: 0; display: block !important;';
    elemsDraw.push(animateOpacity.bind(null, elem, 0, 1));
  });

  // Высота окна и текущее положение прокрутки страницы
  const windowHeight = document.documentElement.clientHeight;
  const curWindowTop = window.pageYOffset;
  // Положение (первого из отображаемых) элемента на странице и его высота
  const elemTop = elems[0].offsetTop;
  const elemHeight = elems[0].offsetHeight;

  // Прокрутка для расположения элемента на экране (если нужно)
  let curScroll = null;
  if (elemHeight > windowHeight) {
    if (elemTop - curWindowTop > 30) {
      // Прокрутка элемента до верха окна, если элемент больше высоты окна
      curScroll = animateScrollPage.bind(null, curWindowTop, elemTop - 30);
    }
  } else {
    if (elemTop + elemHeight - windowHeight - curWindowTop > 30) {
      // Прокрутка элемента до низа окна, если элемент меньше высоты окна
      curScroll = animateScrollPage.bind(null, curWindowTop,
            elemTop + elemHeight - windowHeight + 30);
    }
  }
  if (curScroll) {
    commonAnimation({timing: quad, draw: curScroll, duration: 500});
  }

  // (Почти) последовательное отображение элементов на экране
  let timeout = 0;
  elemsDraw.forEach( (draw) => {
    setTimeout( () => {
      commonAnimation({timing: quad, draw, duration });
    }, timeout);
    timeout += timeoutGap;
  });
};

export default showHiddenBlocks;
