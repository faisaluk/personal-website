'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}




// Function to get select elements for companies page
function getCompaniesSelectElements() {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  return { select, selectItems, selectValue, filterBtn, filterItems };
}

// Function to get select elements for press page (similar structure with "press-" prefix)
function getPressSelectElements() {
  const select = document.querySelector("[press-data-select]");
  const selectItems = document.querySelectorAll("[press-data-select-item]");
  const selectValue = document.querySelector("[press-data-select-value]");
  const filterBtn = document.querySelectorAll("[press-data-filter-btn]");
  const filterItems = document.querySelectorAll("[press-data-filter-item]");
  console.log("Press filter elements:", select, selectItems);
  return { select, selectItems, selectValue, filterBtn, filterItems };
}

// Filter function with conditional logic for companies and press pages
const filterFunc = function (selectedValue, filterElements) {
  for (let i = 0; i < filterElements.length; i++) {
    // Check if selectedValue is "all"
    if (selectedValue === "all") {
      filterElements[i].classList.add("active");
    } else {
      // Split the categories from the data-category attribute
      const itemCategories = filterElements[i].dataset.category.split(",");

      // Check if any of the item categories match the selectedValue
      let itemMatches = false;
      for (let j = 0; j < itemCategories.length; j++) {
        if (selectedValue.toLowerCase() === itemCategories[j].trim().toLowerCase()) {
          itemMatches = true;
          console.log("itemMatches:", itemMatches); // Added console log
          break; // Exit the inner loop if a match is found
        }
      }

      // Apply active class based on the match
      if (itemMatches) {
        filterElements[i].classList.add("active");
      } else {
        filterElements[i].classList.remove("active");
      }
    }
  }
};

// Get select elements based on the page type
let selectElements;
if (document.querySelector("[data-select]")) {
  selectElements = getCompaniesSelectElements();
} else {
  selectElements = getPressSelectElements();
}

const { select, selectItems, selectValue, filterBtn, filterItems } = selectElements;

// Event listener for select click
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Event listener for all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue, filterItems);
  });
}

// Event listener for all filter buttons (similar logic with conditional statements)
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue, filterItems);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

const pressBtn = document.querySelector("[data-nav-link='press']"); // Select the "Press" button

pressBtn.addEventListener("click", function() {
  history.pushState({}, "", "#press"); // Update browser history with "#press" fragment
  // Optionally, scroll to the press section using JavaScript
  document.getElementById("press").scrollIntoView();  
});


