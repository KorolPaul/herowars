const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const thresholdSteps = [...Array(10).keys()].map(i => i / 10);
const isMobile = window.innerWidth <= 768
const isDesktop = window.innerWidth >= 1000

// sliders
const carousel = document.querySelectorAll('.carousel_items');
carousel.forEach(el => {
    tns({
        container: el,
        items: 1,
        gutter: 13,
        mouseDrag: true,
        autoplay: false,
        nav: true,
        navPosition: 'bottom',
        controls: false,
        loop: false,
        responsive: {
            768: {
                nav: false,
                items: 3,
                gutter: 25,
                autoWidth: true,
                controls: true,
            }
        }
    });
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
