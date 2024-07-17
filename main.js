const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentIndex = 0;

function showItem(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % items.length;
  showItem(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  showItem(currentIndex);
}

nextButton.addEventListener('click', showNext);
prevButton.addEventListener('click', showPrev);

// Cambio automático cada 5 segundos
setInterval(showNext, 5000);


function toggleAccordion(element) {
  const content = element.querySelector('.faq-content');
  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}