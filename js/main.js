// List product section
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const swiperProduct = new Swiper(".productSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  },
});

// Special section
const playBtn = document.getElementById("playBtn");
const thumbnail = document.getElementById("thumbnail");
const videoWrapper = document.getElementById("videoWrapper");
const closeBtn = document.getElementById("closeBtn");
const videoPlayer = document.getElementById("videoPlayer");

// Khi bấm play
playBtn.addEventListener("click", () => {
  thumbnail.classList.add("hidden");
  videoWrapper.classList.remove("hidden");
  // autoplay video
  videoPlayer.src += "&autoplay=1";
});

// Khi bấm X
closeBtn.addEventListener("click", () => {
  videoWrapper.classList.add("hidden");
  thumbnail.classList.remove("hidden");
  // stop video bằng reload lại src
  videoPlayer.src = videoPlayer.src.replace("&autoplay=1", "");
});

// Moment in motion section
const sections = document.querySelectorAll(".section");
const imageSlides = document.querySelectorAll(".image-slide");
let isTransitioning = false;

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

    sections.forEach((s, i) => {
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
      s.querySelector(".toggle-btn").textContent = "+";
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
      toggleBtn.textContent = "−";
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
