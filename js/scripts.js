'use strict';

(function () {
  emailjs.init('D7Spd4bf9d_Owlxj1');
})();

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

//     emailjs.send('service_3etrxrk', 'template_ppf1r9o', data).then(
//       function (response) {
//         console.log('SUCCESS!', response.status, response.text);
//       },
//       function (error) {
//         console.log('FAILED...', error);
//       }
//     );
//   }

});
