const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const thresholdSteps = [...Array(10).keys()].map(i => i / 10);
const isMobile = window.innerWidth <= 768
const isDesktop = window.innerWidth >= 1000
let isPreloaderLoaded = false;
let percent = 0;

window.addEventListener('load', () => {
    isPreloaderLoaded = true;
    if (percent === 100){
        document.body.classList.add('loaded');
    }
})

// preloader
const preloaderCount = document.getElementById('preloader-value');
function calculatePreloaderPercents() {
    let preloaderInterval;

    preloaderInterval = setInterval(() => {
        preloaderCount.innerText = percent;
        if (percent >= 100) {
            clearInterval(preloaderInterval);

            if (isPreloaderLoaded) {
                document.body.classList.add('loaded');
            }
        }
        percent += 5;
    }, 80);
}

if (preloaderCount) {
    calculatePreloaderPercents();
}

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
const submitEl = document.querySelector('.form_submit');
if (submitEl) {
    submitEl.addEventListener('click', (e) => e.target.setAttribute('disabled', true));
}

/* animation */
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, { passive: false }); // modern desktop
    window.addEventListener('touchmove', preventDefault, { passive: false }); // mobile
}

document.addEventListener(wheelEvent, function (event) {
    

    if (posTopOld > posTop) {
        scrolling = true;
        if (partal) {
            partal = false;
            partalHide();
        }
    }

    posTopOld = posTop;

    console.log(posTop);
    if (event.deltaY > 0) {
        if (posTop < 1000) {
            //event.preventDefault()
        }

        posTop += posMulti;
    }
    else {
        posTop -= posMulti;
    }

    stageSpeedV = DistancePointToPoint(0, posTop, 0, posTopOld);
}, { passive: false })
