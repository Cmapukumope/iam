let two_slider = document.querySelector('.slider_two'),
  two_sliderList = two_slider.querySelector('.slider-list'),
  two_sliderTrack = two_slider.querySelector('.slider-track'),
  two_slides = two_slider.querySelectorAll('.slide'),
  two_slideWidth = 1028,
  two_slideIndex = 0,
  two_posInit = 0,
  two_posX1 = 0,
  two_posX2 = 0,
  two_posY1 = 0,
  two_posY2 = 0,
  two_posFinal = 0,
  two_isSwipe = false,
  two_isScroll = false,
  two_allowSwipe = true,
  two_transition = true,
  two_nextTrf = 0,
  two_prevTrf = 0,
  two_lastTrf = --two_slides.length * two_slideWidth,
  two_posThreshold = two_slides[0].offsetWidth * 0.35,
  two_trfRegExp = /([-0-9.]+(?=px))/,
  two_swipeStartTime,
  two_swipeEndTime,
  two_getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  two_slide = function() {
    if (two_transition) {
      two_sliderTrack.style.transition = 'transform .5s';
    }
    two_sliderTrack.style.transform = `translate3d(-${two_slideIndex * two_slideWidth}px, 0px, 0px)`;

  },
  two_swipeStart = function() {
    let two_evt = getEvent();

    if (two_allowSwipe) {

      two_swipeStartTime = Date.now();
      
      two_transition = true;

      two_nextTrf = (two_slideIndex + 1) * -two_slideWidth;
      two_prevTrf = (two_slideIndex - 1) * -two_slideWidth;

      two_posInit = two_posX1 = two_evt.clientX;
      two_posY1 = two_evt.clientY;

      two_sliderTrack.style.transition = '';

      document.addEventListener('touchmove', two_swipeAction);
      document.addEventListener('mousemove', two_swipeAction);
      document.addEventListener('touchend', two_swipeEnd);
      document.addEventListener('mouseup', two_swipeEnd);

      two_sliderList.classList.remove('grab');
      two_sliderList.classList.add('grabbing');
    }
  },
  two_swipeAction = function() {

    let two_evt = getEvent(),
      two_style = two_sliderTrack.style.transform,
      two_transform = +two_style.match(two_trfRegExp)[0];

    two_posX2 = two_posX1 - two_evt.clientX;
    two_posX1 = two_evt.clientX;

    two_posY2 = two_posY1 - two_evt.clientY;
    two_posY1 = two_evt.clientY;

    if (!two_isSwipe && !two_isScroll) {
      let two_posY = Math.abs(two_posY2);
      if (two_posY > 7 || two_posX2 === 0) {
        two_isScroll = true;
        two_allowSwipe = false;
      } else if (two_posY < 7) {
        two_isSwipe = true;
      }
    }

    if (two_isSwipe) {
      if (two_slideIndex === 0) {
        if (two_posInit < two_posX1) {
          two_setTransform(two_transform, 0);
          return;
        } else {
          two_allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (two_slideIndex === --two_slides.length) {
        if (two_posInit > two_posX1) {
          two_setTransform(two_transform, two_lastTrf);
          return;
        } else {
          two_allowSwipe = true;
        }
      }

      if (two_posInit > two_posX1 && two_transform < two_nextTrf || two_posInit < two_posX1 && two_transform > two_prevTrf) {
        two_reachEdge();
        return;
      }

      two_sliderTrack.style.transform = `translate3d(${two_transform - two_posX2}px, 0px, 0px)`;
    }

  },
  two_swipeEnd = function() {
    two_posFinal = two_posInit - two_posX1;

    two_isScroll = false;
    two_isSwipe = false;

    document.removeEventListener('touchmove', two_swipeAction);
    document.removeEventListener('mousemove', two_swipeAction);
    document.removeEventListener('touchend', two_swipeEnd);
    document.removeEventListener('mouseup', two_swipeEnd);

    two_sliderList.classList.add('grab');
    two_sliderList.classList.remove('grabbing');

    if (two_allowSwipe) {
      two_swipeEndTime = Date.now();
      if (Math.abs(two_posFinal) > two_posThreshold || two_swipeEndTime - two_swipeStartTime < 300) {
        if (two_posInit < two_posX1) {
          two_slideIndex--;
        } else if (two_posInit > two_posX1) {
          two_slideIndex++;
        }
      }

      if (two_posInit !== two_posX1) {
        two_allowSwipe = false;
        two_slide();
      } else {
        two_allowSwipe = true;
      }

    } else {
      two_allowSwipe = true;
    }

  },
  two_setTransform = function(two_transform, two_comapreTransform) {
    if (two_transform >= two_comapreTransform) {
      if (two_transform > two_comapreTransform) {
        two_sliderTrack.style.transform = `translate3d(${two_comapreTransform}px, 0px, 0px)`;
      }
    }
    two_allowSwipe = false;
  },
  two_reachEdge = function() {
    two_transition = false;
    two_swipeEnd();
    two_allowSwipe = true;
  };

two_sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
two_sliderList.classList.add('grab');

two_sliderTrack.addEventListener('transitionend', () => two_allowSwipe = true);
two_slider.addEventListener('touchstart', two_swipeStart);
two_slider.addEventListener('mousedown', two_swipeStart);