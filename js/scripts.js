'use strict';

(function () {
  emailjs.init('D7Spd4bf9d_Owlxj1');
})();

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//handling navigation bar sticky and visible
const header = document.querySelector('#header');
const nav = document.querySelector('#navigation');
const navHeight = nav.getBoundingClientRect().height;
const body = document.body;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.remove('hidden');
    nav.classList.add('sticky');
    body.style.paddingTop = navHeight + 'px';
  } else {
    nav.classList.remove('sticky');
    nav.classList.add('hidden');
    body.style.paddingTop = '0px';
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//updating navbar on scroll
$(window).scroll(() => {
  const windscroll = $(window).scrollTop();
  if (windscroll >= navHeight) {
    $('section').each(function (i) {
      if ($(this).position().top <= windscroll + 75) {
        switch (i) {
          case 0:
            $('.back-to-top').removeClass('active');
            break;
          case 1:
            $('.back-to-top').addClass('active');
            break;
          case 4:
            i -= 1;
            break;
        }

        $('.nav-item.active').removeClass('active');
        $('.nav-item').eq(i).addClass('active');
      }
    });
  }
});

//handling knowmore
//return element offsets for scrolling
function getOffset(id) {
  const element = document.querySelector(id);
  const elementPosition = element.getBoundingClientRect().top;
  const offSet = elementPosition + window.pageYOffset - navHeight;
  return offSet;
}

const imageIcons = document.querySelectorAll('.coding-icons > img');

const ratingElements = document.querySelectorAll('.rating');

//unhide rating element
const showRating = (element, top, left) => {
  element.classList.remove('hidden');
  if (screen.width < 430) {
    top -= 20;
  }
  element.style.top = String(top) + 'px';
  element.style.left = String(left) + 'px';
};

const hideRating = (element) => {
  element.classList.add('hidden');
};

//mouse over imageIcons
imageIcons.forEach((element) => {
  //get class name of element
  const className = element.className;
  let animDelay = element.style.animationDelay;
  element.addEventListener('mouseover', () => {
    element.style.removeProperty('animation-delay');
    element.classList.add('icon-hover');
    setAnimations(false);
    //get offset of element
    let top = element.getBoundingClientRect().top;
    let left = element.getBoundingClientRect().left;
    //add offset to top and left
    top += window.pageYOffset - navHeight + 50;
    left += window.pageXOffset + 5;
    //show ratingElement that contains className
    showRating(document.querySelector(`.${className}`), top, left);
  });

  element.addEventListener('mouseout', () => {
    element.style.animationDelay = animDelay;
    element.classList.remove('icon-hover');
    setAnimations(true);
    hideRating(document.querySelector(`.${className}`));
  });
});

//set animations on all elements selected
const setAnimations = (go) => {
  if (go) {
    imageIcons.forEach((element) => {
      element.classList.add('icon-animate');
    });
  } else {
    imageIcons.forEach((element) => {
      element.classList.remove('icon-animate');
    });
  }
};

setAnimations(true);

//click event for knowmore
$('.read-more').click(function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  window.scrollTo({ top: getOffset(id), behavior: 'smooth' });
});

//event listener for contact form
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const contactSubmit = document.querySelector('.email-submit');

contactSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.querySelector('.name').value;
  const email = document.querySelector('.email').value;
  const alertEmail = document.querySelector('.info-alert.email');
  const message = document.querySelector('.message').value;
  const alertMessage = document.querySelector('.info-alert.message');

  let validated = true;

  if (!validateEmail(email)) {
    alertEmail.textContent = 'Please enter a valid email address';
    validated = false;
  } else {
    alertEmail.textContent = '';
  }

  if (message === '') {
    alertMessage.textContent = 'Please enter a message';
    validated = false;
  } else {
    alertMessage.textContent = '';
  }

  if (validated) {
    const data = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs.send('service_3etrxrk', 'template_ppf1r9o', data).then(
      function (response) {
        alert('Message sent! Thanks!');
        console.log('SUCCESS!', response.status, response.text);
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );
  }
});
