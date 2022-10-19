const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const thresholdSteps = [...Array(10).keys()].map(i => i / 10);
const isMobile = window.innerWidth <= 768
const isDesktop = window.innerWidth >= 1000


window.addEventListener('load', () => {
    isPreloaderLoaded = true;
    if (percent >= 99){
        preloaderCount.innerText = percent;
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    const persons = document.querySelectorAll('.person');
    persons.forEach(person => {
        person.classList.add(person.dataset.name)
    })
})


// menu
const menuToggleElement = document.querySelector('.menu-toggle');
if (menuToggleElement) {
    menuToggleElement.addEventListener('click', () => document.body.classList.toggle('menu-opened'));
}

const parentMenuItems = document.querySelectorAll('.menu_list-item__parent');
parentMenuItems.forEach(el => {
    el.addEventListener('click', (e) => e.currentTarget.classList.toggle('opened'))
});

function closeAllOpened() {
    document.querySelectorAll('.opened').forEach(el => el.classList.remove('opened'));
    document.body.classList.remove('menu-opened');
    document.querySelectorAll('.popup-opened').forEach(el => el.classList.remove('popup-opened'));
    document.querySelectorAll('.js-form-popup').forEach(el => el.classList.remove('opened'));
    document.querySelectorAll('.filters_content').forEach(el => el.classList.remove('opened'));
}

// gallery text toggle
const galleryTextButton = document.querySelector('.gallery_text-button');
if (galleryTextButton) {
    galleryTextButton.addEventListener('click', e => e.currentTarget.parentElement.classList.toggle('opened'));
}

/* cookies */
if (Cookies) {
    const hasCookies = Cookies.get('CookieNotificationCookie');

    const cookiesBanner = document.querySelector('.cookies');
    const cookiesAcceptButton = document.querySelector('.cookies_button');

    if (cookiesAcceptButton) {
        cookiesAcceptButton.addEventListener('click', function (e) {
            e.preventDefault();

            cookiesBanner.style.display = 'none';
            Cookies.set('CookieNotificationCookie', 'true', { expires: 365 });
        });
    }

    if (cookiesBanner && !hasCookies) {
        cookiesBanner.style.display = 'block';
    }
}

/* hide header buttons when first section visible */
const headerEl = document.querySelector('.header')
const showcaseEl = document.querySelector('.section__showcase')

if (headerEl && showcaseEl) {
    const observerCallback = function (e) {
        const { intersectionRatio } = e[0];

        if (intersectionRatio < 0.1) {
            headerEl.classList.add('header__button-visible');
        } else {
            headerEl.classList.remove('header__button-visible');
        }
    };

    const observer = new IntersectionObserver(observerCallback, {
        rootMargin: '0px 0px 0px 0px',
        threshold: thresholdSteps,
        root: null
    });
    observer.observe(showcaseEl)
}

/* appaerance animation */
const animatedElements = document.querySelectorAll('.js-animation, .section_title, .section_subtitle');

if (animatedElements.length) {
    const ratio = isMobile ? 0.2 : 0.5
    const observerCallback = function (e) {
        const { target, intersectionRatio } = e[0];
        if (intersectionRatio > ratio) {
            target.classList.add('animated');
        }
    };

    animatedElements.forEach(el => {
        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '0px 0px -15% 0px',
            threshold: thresholdSteps,
            //root: document.body
        });
        observer.observe(el);
    })
}

/* faq accordion */
const faqElements = document.querySelectorAll('.faq_header');
faqElements.forEach(el => {
    
    el.addEventListener('click', (e) => {
        faqElements.forEach(el => {
            if (el !== e.target) {
                el.parentElement.classList.remove('opened')
            }
        });
        e.currentTarget.parentElement.classList.toggle('opened');
    });
});

/* form */
const feedbackAPiUrl = 'https://api.herowarsportal.com/api/feedback';
const submitEl = document.querySelector('.form_submit');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

if (submitEl) {
    submitEl.addEventListener('click', (e) => {
        const email = document.getElementById('email');
        const question = document.getElementById('question');

        if (email.value === '' || !validateEmail(email.value)) {
            email.parentElement.classList.add('error')
        }
        if (question.value === '') {
            question.parentElement.classList.add('error')
        }

        if (email.value === '' || !validateEmail(email.value) || question.value === '') {
            return
        }

        email.parentElement.classList.remove('error');
        question.parentElement.classList.remove('error');

        fetch(feedbackAPiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email.value,
                question: question.value,
            })
        }).then(() => {
            e.target.setAttribute('disabled', true)
        })

        
    });
}

/* animation */
function disableScroll() {
    window.addEventListener('DOMMouseScroll', e => e.preventDefault(), false); // older FF
    window.addEventListener(wheelEvent, e => e.preventDefault(), { passive: false }); // modern desktop
    window.addEventListener('touchmove', e => e.preventDefault(), { passive: false }); // mobile
}

function handleScroll(event) {
    if (posTopOld > posTop) {
        scrolling = true;
        if (partal) {
            partal = false;
            partalHide();
        }
    }

    posTopOld = posTop;

    let isScrollDown = event.deltaY > 0;
    if (isMobile) {
        isScrollDown = swipeFunc.touches.direction === 'down';
    }

    if (portalShow) {
        document.body.classList.add('portal-show');
    } else {
        document.body.classList.remove('portal-show');
    }
    
    // console.log('portalShow', portalShow, 'isScrollDown', isScrollDown);
    if (isScrollDown) {
        if (!portalShow) {
            event.preventDefault();
        } else {
            return;
        }

        posTop += posMulti;
    }
    else if (posTop > 0 && document.body.scrollTop === 0) {
        posTop -= posMulti;
    }

    stageSpeedV = DistancePointToPoint(0, posTop, 0, posTopOld);
}

document.addEventListener(wheelEvent, handleScroll, { passive: false });
document.addEventListener('touchmove', handleScroll, { passive: false });


var swipeFunc = {
    touches: {
        "touchstart": { "x": -1, "y": -1 },
        "touchmove": { "x": -1, "y": -1 },
        "touchend": false,
        "direction": "undetermined"
    },
    touchHandler: function (event) {
        var touch;
        if (typeof event !== 'undefined') {
            // event.preventDefault();
            if (typeof event.touches !== 'undefined') {
                touch = event.touches[0];
                switch (event.type) {
                    case 'touchstart':
                    case 'touchmove':
                        swipeFunc.touches[event.type].x = touch.pageX;
                        swipeFunc.touches[event.type].y = touch.pageY;
                        break;
                    case 'touchend':
                        swipeFunc.touches[event.type] = true;
                        if (swipeFunc.touches.touchstart.y > -1 && swipeFunc.touches.touchmove.y > -1) {
                            swipeFunc.touches.direction = swipeFunc.touches.touchstart.y < swipeFunc.touches.touchmove.y ? "up" : "down";
                        }
                    default:
                        break;
                }
            }
        }
    },
    init: function () {
        document.addEventListener('touchstart', swipeFunc.touchHandler, false);
        document.addEventListener('touchmove', swipeFunc.touchHandler, false);
        document.addEventListener('touchend', swipeFunc.touchHandler, false);
    }
};
swipeFunc.init();
