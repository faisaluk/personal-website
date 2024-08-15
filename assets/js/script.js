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


// CONTACT page navigation variables
document.addEventListener('DOMContentLoaded', function() {
  const gotoButtons = document.querySelectorAll('[data-goto-section]');
  
  gotoButtons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionName = this.getAttribute('data-goto-section');
      const targetSection = document.querySelector(`[data-page="${sectionName}"]`);
      
      if (targetSection) {
        // Remove 'active' class from all pages
        pages.forEach(page => page.classList.remove("active"));
        
        // Add 'active' class to target section
        targetSection.classList.add("active");
        
        // Remove 'active' class from all navigation links
        navigationLinks.forEach(link => link.classList.remove("active"));
        
        // Add 'active' class to corresponding navigation link
        const correspondingNavLink = document.querySelector(`[data-nav-link]:not([data-goto-section])`);
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("active");
        }
        
        // Scroll to top of the page
        window.scrollTo(0, 0);
      }
    });
  });
});






// Function to get select elements for companies page
function getCompaniesSelectElements() {
  return {
    select: document.querySelector("[data-select]"),
    selectItems: document.querySelectorAll("[data-select-item]"),
    selectValue: document.querySelector("[data-select-value]"),
    filterBtn: document.querySelectorAll("[data-filter-btn]"),
    filterItems: document.querySelectorAll("[data-filter-item]")
  };
}

// Function to get select elements for press page
function getPressSelectElements() {
  return {
    select: document.querySelector("[press-data-select]"),
    selectItems: document.querySelectorAll("[press-data-select-item]"),
    selectValue: document.querySelector("[press-data-select-value]"),
    filterBtn: document.querySelectorAll("[press-data-filter-btn]"),
    filterItems: document.querySelectorAll("[press-data-filter-item]")
  };
}

// Function to get select elements for writings page
function getWritingsSelectElements() {
  return {
    select: document.querySelector("[writings-data-select]"),
    selectItems: document.querySelectorAll("[writings-data-select-item]"),
    selectValue: document.querySelector("[writings-data-select-value]"),
    filterBtn: document.querySelectorAll("[writings-data-filter-btn]"),
    filterItems: document.querySelectorAll("[writings-data-filter-item]")
  };
}

// Generic filter function
const filterFunc = function (selectedValue, filterElements) {
  for (let i = 0; i < filterElements.length; i++) {
    if (selectedValue === "all") {
      filterElements[i].classList.add("active");
    } else {
      // Check if the element has the data-category attribute
      if (filterElements[i].dataset && filterElements[i].dataset.category) {
        const itemCategories = filterElements[i].dataset.category.split(",");
        const itemMatches = itemCategories.some(cat => cat.trim().toLowerCase() === selectedValue.toLowerCase());
        if (itemMatches) {
          filterElements[i].classList.add("active");
        } else {
          filterElements[i].classList.remove("active");
        }
      } else {
        // If there's no data-category, remove the active class
        filterElements[i].classList.remove("active");
        console.warn("Missing data-category attribute for element:", filterElements[i]);
      }
    }
  }
};

// Setup filter functionality
function setupFilter(elements) {
  const { select, selectItems, selectValue, filterBtn, filterItems } = elements;

  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue, filterItems);
    });
  }

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
}

// Setup filters for both sections
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector("[data-select]")) {
    setupFilter(getCompaniesSelectElements());
  }
  if (document.querySelector("[press-data-select]")) {
    setupFilter(getPressSelectElements());
  }
  if (document.querySelector("[writings-data-select]")) {
    setupFilter(getWritingsSelectElements());
  }
});



// WRITINGS PDF POP-UP
document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  var modal = document.getElementById('pdf-modal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Get all elements with class "pdf-opener"
  var pdfOpeners = document.getElementsByClassName("pdf-opener");

  // Attach click event to all pdf openers
  for (var i = 0; i < pdfOpeners.length; i++) {
    pdfOpeners[i].addEventListener('click', function() {
      var pdfPath = this.getAttribute('data-pdf-path');
      document.getElementById('pdf-iframe').src = pdfPath;
      modal.style.display = "block";
    });
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    document.getElementById('pdf-iframe').src = "";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById('pdf-iframe').src = "";
    }
  }
});