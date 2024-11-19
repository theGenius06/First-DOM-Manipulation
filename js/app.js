let navbarlist;
let sections;
let backToTopButton; // Reference for the "Back to Top" button

// Build the navigation menu
function buildNav() {
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const navItemName = section.getAttribute('data-nav');
        const navLi = document.createElement("li");
        navLi.innerText = navItemName;
        navLi.classList.add("menu__link");
        navLi.setAttribute("id", `nav${i + 1}`);
        navbarList.append(navLi);
    }
}

// Create and append the "Back to Top" button dynamically
function createBackToTopButton() {
    backToTopButton = document.createElement("li");
    backToTopButton.innerText = "Back to Top";
    backToTopButton.classList.add("menu__link");
    backToTopButton.style.backgroundColor = "lightgray";
    backToTopButton.style.cursor = "pointer";
    backToTopButton.style.display = "none"; 
    backToTopButton.style.position = "absolute";
    backToTopButton.style.left = "0";
    backToTopButton.style.padding = "1em";

    // Add event listener for smooth scroll to top
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // Prepend to navbar
    navbarList.prepend(backToTopButton);
}

function smoothScroll(event) {
    const clickedItem = event.target;
    const navId = clickedItem.id;
    if (navId.startsWith("nav")) {
        const sectionId = navId.replace("nav", "section");
        const sectionElement = document.getElementById(sectionId);
        sectionElement.scrollIntoView({
            behavior: "smooth",
        });
    }
}

// Add class 'active' to section and nav item when near top of viewport
function makeActive() {
    sections.forEach((section) => {
        const sectionBounds = section.getBoundingClientRect();
        const navItem = document.querySelector(`#nav${section.id.replace('section', '')}`);

        if (sectionBounds.top >= 0 && sectionBounds.top < window.innerHeight / 2) {
            // Add active class to the section
            section.classList.add('your-active-class');

            // Highlight the corresponding nav item
            navItem.style.backgroundColor = 'black';
            navItem.style.color = 'white';
        } else {
            // Remove active class from the section
            section.classList.remove('your-active-class');

            // Reset the corresponding nav item
            navItem.style.backgroundColor = '';
            navItem.style.color = '';
        }
    });

    // Show "Back to Top" button if near the bottom of the page
    const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
    if (bottomReached) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

/**
 * End Main Functions
 * Begin Events
 */

// Build menu
const domContentLoadedHandler = function () {
    navbarList = document.getElementById('navbar__list');
    sections = document.querySelectorAll('section');
    buildNav();

    // Create and append "Back to Top" button
    createBackToTopButton();

    // Smooth scroll to section on nav item click
    navbarList.addEventListener("click", smoothScroll);

    // Update active states and toggle "Back to Top" button on scroll
    document.addEventListener("scroll", makeActive);
};

document.addEventListener("DOMContentLoaded", domContentLoadedHandler);
