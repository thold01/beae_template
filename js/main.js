// product section
const swiperProduct = new Swiper(".productSwiper", {
  slidesPerView: 4,
  slidesPerGroup: 2,
  spaceBetween: 20,
  direction: "horizontal",
  loop: false,
  navigation: {
    nextEl: ".product-next",
    prevEl: ".product-prev",
  },
  breakpoints: {
    0: { slidesPerView: 2, slidesPerGroup: 2 },
    1024: { slidesPerView: 4, slidesPerGroup: 2 },
  },
});

// Special section
const playBtn = document.getElementById("playBtn");
const thumbnail = document.getElementById("thumbnail");
const videoWrapper = document.getElementById("videoWrapper");
const closeBtn = document.getElementById("closeBtn");
const videoPlayer = document.getElementById("videoPlayer");

// handle play
playBtn.addEventListener("click", () => {
  thumbnail.classList.add("hidden");
  videoWrapper.classList.remove("hidden");
  videoPlayer.play();
});

// handle close
closeBtn.addEventListener("click", () => {
  videoWrapper.classList.add("hidden");
  thumbnail.classList.remove("hidden");
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
});

// Moment in motion section
const sections = document.querySelectorAll(".section");
const imageSlides = document.querySelectorAll(".image-slide");
let isTransitioning = false;
const svgPlus = `
  <svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" fill="currentColor" 
       class="w-5 h-5">
    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
  </svg>`;

const svgMinus = `
  <svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" fill="currentColor" 
       class="w-5 h-5">
    <path d="M5 11V13H19V11H5Z"></path>
  </svg>`;

function smoothTransition(targetIndex) {
  if (isTransitioning) return;
  isTransitioning = true;
  const currentActive = document.querySelector(".image-slide.active");
  if (currentActive) {
    currentActive.classList.remove("active");
    currentActive.classList.add("hidden");
  }
  setTimeout(() => {
    imageSlides.forEach((slide, index) => {
      slide.classList.remove("active", "animate-fade", "hidden");
      if (index === targetIndex) {
        slide.classList.add("active", "animate-fade", "block");
      } else {
        slide.classList.add("hidden");
      }
    });
    isTransitioning = false;
  }, 300);
}

sections.forEach((section, index) => {
  const header = section.querySelector(".section-header");
  const content = section.querySelector(".section-content");
  const title = section.querySelector(".section-title");
  const toggleBtn = section.querySelector(".toggle-btn");

  header.addEventListener("click", () => {
    const isActive = section.classList.contains("active");

    sections.forEach((s) => {
      s.classList.remove("active", "border-black");
      s.classList.add("border-gray-200");
      s.querySelector(".section-content").classList.remove(
        "active",
        "max-h-[200px]",
        "opacity-100"
      );
      s.querySelector(".section-content").classList.add("max-h-0", "opacity-0");
      s.querySelector(".section-title").classList.remove(
        "active",
        "text-black",
        "translate-x-[5px]"
      );
      s.querySelector(".section-title").classList.add("text-gray-500");

      // đổi về SVG plus
      s.querySelector(".toggle-btn").innerHTML = svgPlus;

      s.querySelector(".section-number").classList.remove(
        "text-black",
        "border-black"
      );
      s.querySelector(".section-number").classList.add(
        "text-gray-500",
        "border-gray-300"
      );
    });

    if (!isActive) {
      section.classList.add("active", "border-black");
      content.classList.add("active", "max-h-[200px]", "opacity-100");
      title.classList.add("active", "text-black", "translate-x-[5px]");

      // đổi sang SVG minus
      toggleBtn.innerHTML = svgMinus;

      section
        .querySelector(".section-number")
        .classList.add("text-black", "border-black");

      smoothTransition(index);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const activeSection = document.querySelector(".section.active");
  if (activeSection) {
    const activeIndex = Array.from(sections).indexOf(activeSection);
    if (activeIndex !== -1) {
      smoothTransition(activeIndex);
    }
  }
});

// Review section
const swiperReview = new Swiper(".swiperReview", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 20,
  watchSlidesProgress: true,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1.2, slidesPerGroup: 5 },
    1024: { slidesPerView: 3, slidesPerGroup: 3 },
  },
  // allowTouchMove: true,
  resistanceRatio: 0,
  slideToClickedSlide: true,
});

// FQAs section
document.querySelectorAll(".faq-item").forEach(function (item) {
  item.querySelector(".faq-toggle").addEventListener("click", function () {
    // close accordion
    document.querySelectorAll(".faq-item").forEach(function (el) {
      el.classList.remove("active");
      el.querySelector(".faq-content").classList.remove("active");
      el.querySelector(".faq-icon").textContent = "+";
      el.querySelector(".faq-content").style.maxHeight = null;
      el.querySelector(".faq-content").style.opacity = 0;
      el.querySelector(".faq-content").style.transform = "translateY(-10px)";
    });
    // open accordion
    item.classList.add("active");
    item.querySelector(".faq-content").classList.add("active");
    item.querySelector(".faq-icon").textContent = "-";
    item.querySelector(".faq-content").style.maxHeight = "270px";
    item.querySelector(".faq-content").style.opacity = 1;
    item.querySelector(".faq-content").style.transform = "translateY(0)";
  });
});

// Chat section
const chatBtn = document.getElementById("chat-btn");
const chatPopup = document.getElementById("chat-popup");
const chatIcon = document.getElementById("chat-icon");

chatBtn.addEventListener("click", () => {
  chatPopup.classList.toggle("hidden");
  if (chatPopup.classList.contains("hidden")) {
    chatIcon.src = "./assets/img/icon.png";
  } else {
    chatIcon.src = "./assets/img/close.png";
  }
});
