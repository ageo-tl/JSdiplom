import { commonAnimation, quad, animateOpacity, animateScrollPage } from "./animation";

// Получение скрытых блоков из списка
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

const disableBlockHiding = (elems) => {
  elems.forEach ( (elem) => elem.style.cssText = 'display: block !important;');
};

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

export {
  showHiddenBlocks,
  disableBlockHiding,
  getHidePromoBlocks,
};
