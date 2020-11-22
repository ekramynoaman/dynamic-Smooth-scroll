/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section')

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function getSectionBounding() {
    let targetSection = sections[0];
    let topEdg = 9999999;
    sections.forEach ((item) => {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -500 & bounding.top < topEdg) {
            topEdg = bounding.top;
            targetSection = item;
        };
    });
    return targetSection;

};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function addLinks() {
    sections.forEach((item) => {

        let section = document.createElement('li');
        let sectionLink = document.createElement('a');
        sectionLink.className = 'menu__link';
        sectionLink.dataset.nav = item.id;
        sectionLink.innerText = item.dataset.nav;
        section.appendChild(sectionLink);
        navList.appendChild(section);
        
    })
};

// Add class 'active' to section when near top of viewport

function toggleActiveClass () {
    window.addEventListener('scroll', (e) => {
        let section = getSectionBounding();
        section.classList.add('your-active-class');
        
        sections.forEach ((item) => {
            if (item.id != section.id & item.classList.contains('your-active-class')) {
                item.classList.remove('your-active-class');
            }
        })
        
        const activeLink = document.querySelector(`a[data-nav="${section.id}"]`);
        activeLink.classList.add('active');
        
        const menuLinks = document.querySelectorAll('.menu__link');
        menuLinks.forEach ((item) => {
            if (item.dataset.nav != activeLink.dataset.nav & item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
    });
};

function scrollToSection() {
    navList.addEventListener('click', function (e) {
        const sectionView = document.querySelector('#' + e.target.dataset.nav)
        sectionView.scrollIntoView({'behavior':'smooth'});
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
addLinks();

// Scroll to section on link click
scrollToSection();

// Set sections as active
toggleActiveClass();