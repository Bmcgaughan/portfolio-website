'use strict';

(function() {
    emailjs.init("D7Spd4bf9d_Owlxj1");
    emailjs
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

const contactSubmit = document.querySelector('.email-submit');

contactSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    const message = document.querySelector('.message').value;
    
    const data = {
        name,
        email,
        message
    }

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });


    console.log(data)
})






