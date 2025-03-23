/* 
  No changes to existing animations or transitions, 
  only appending new sections' animations if desired.
*/

/* Handle page visibility changes for video */
document.addEventListener('visibilitychange', function() {
  const video = document.querySelector("video");
  if (video) {
    if (document.hidden) {
      // Pause video when tab is not visible
      video.pause();
    } else {
      // Play video when tab becomes visible again
      video.play();
    }
  }
});

/* Keep the same functionality for video play on click but improve it */
function playVideo() {
  const video = document.querySelector("video");
  if (video) {
    // Set video to autoplay once loaded
    video.addEventListener('loadeddata', function() {
      video.play();
    });
    
    // Also allow click to play
    document.querySelector("body").addEventListener("click", () => {
      video.play();
    });
  }
}
playVideo();

/* Existing Swiper init (if you have a Swiper slider somewhere) */
function sliderAnimation(){
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });
}
sliderAnimation();

/* Locomotive Scroll + ScrollTrigger setup */
function locoScroll () {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0, left: 0, width: window.innerWidth, height: window.innerHeight
      };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
  
  // Make locoScroll instance available globally
  window.locoScroll = locoScroll;
  
  return locoScroll;
}
locoScroll();

/* Cursor Effect */
function cursorEffect() {
  var page1Content = document.querySelector("#page1-content");
  var cursor = document.querySelector("#cursor");
  page1Content.addEventListener("mousemove", function(dets){
    gsap.to(cursor,{
      x: dets.x,
      y: dets.y
    });
  });
  page1Content.addEventListener("mouseenter",function(){
    gsap.to(cursor,{
      scale:1,
      opacity:1,
    });
  });
  page1Content.addEventListener("mouseleave",function(){
    gsap.to(cursor,{
      scale:0,
      opacity:0
    });
  });
}
cursorEffect();

/* Page2 Animation */
function page2Animation(){
  gsap.from(".elem h1",{
    y:100,
    stagger:0.2,
    duration:1,
    scrollTrigger:{
      trigger:"#page2",
      scroller:"#main",
      start:"top 47%",
      end:"top 45%",
      // markers:true,
      scrub:1
    }
  });
}
page2Animation();

/* Products Section Animation */
function productsAnimation() {
  // Title animation
  gsap.from(".products-section .section-title", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".products-section",
      scroller: "#main",
      start: "top 70%",
      end: "top 50%",
      scrub: 1
    }
  });
  
  // Cards animation with stagger
  gsap.from(".product-card", {
    opacity: 0,
    y: 100,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: ".products-container",
      scroller: "#main",
      start: "top 80%",
      end: "top 60%",
      scrub: 1
    }
  });
}
productsAnimation();

/* Loader timeline - plays only once */
var tl = gsap.timeline({ repeat: 0 }); // Set repeat to 0 to play only once

tl.from("#loader h3", {
  x:40,
  opacity:0,
  duration:1,
  stagger:0.2
})
.to("#loader h3", {
  x:-40,
  opacity:0,
  duration:1,
  stagger:-0.2
})
.to("#loader", {
  opacity:0,
  display:"none",
})
.from("#page1-content span", {
  y:100,
  opacity:0,
  stagger:0.1
});

/* ---------------------
   OPTIONAL: Fade In Animations 
   for your newly added sections
   --------------------- */

/* Page3: Research */
gsap.from("#page3 .research-content", {
  opacity: 0,
  y: 100,
  duration: 1,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top 70%",
    end: "top 50%",
    scrub: 1
    // markers: true
  }
});

/* Page4: Publications */
gsap.from("#page4 .pub-content", {
  opacity: 0,
  y: 100,
  duration: 1,
  scrollTrigger: {
    trigger: "#page4",
    scroller: "#main",
    start: "top 70%",
    end: "top 50%",
    scrub: 1
  }
});

/* Page5: Team */
gsap.from("#page5 h1, #page5 .team-wrapper", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    start: "top 70%",
    end: "top 50%",
    scrub: 1
  }
});

/* Page6: Contact */
gsap.from("#page6 h1, #page6 .contact-wrapper", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: "#page6",
    scroller: "#main",
    start: "top 70%",
    end: "top 50%",
    scrub: 1
  }
});

/* Page5: Clients */
gsap.from("#page5 .client-carousel", {
  opacity: 0,
  y: 70,
  duration: 1.2,
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    start: "top 60%",
    end: "top 40%",
    scrub: 1
  }
});

// Initialize Swiper for client carousel
const clientSwiper = new Swiper('.client-swiper', {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 800,
  effect: 'slide',
  direction: 'horizontal',
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
});

/* Navigation functionality */
function initNavigation() {
  // Dropdown toggle
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    
    dropdownLink.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Toggle icon between bars and X
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Apply smooth scroll to all contact-scroll class links
  const contactLinks = document.querySelectorAll('.contact-scroll');
  
  if (contactLinks.length > 0) {
    contactLinks.forEach(contactLink => {
      contactLink.addEventListener('click', (e) => {
        // Only prevent default if we're already on index.html
        if (!contactLink.href.includes('index.html') || window.location.pathname.includes('index.html')) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (navMenu) {
            navMenu.classList.remove('active');
          }
          
          // If we're on index.html already
          if (!contactLink.href.includes('index.html') || window.location.pathname.includes('index.html')) {
            const targetId = contactLink.getAttribute('href').split('#')[1];
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
              // If using Locomotive Scroll
              const locoScroll = window.locoScroll;
              
              if (locoScroll) {
                // For extra smoothness on Contact Us
                locoScroll.scrollTo(targetElement, {
                  duration: 1500,
                  easing: [0.25, 0.1, 0.25, 1.0], // Cubic bezier curve
                });
              } else {
                // Fallback to standard scrolling
                targetElement.scrollIntoView({ 
                  behavior: 'smooth'
                });
              }
            }
          }
        }
      });
    });
  }
}

// Initialize all navigation functions after page loads
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  
  // Check if URL has a hash and scroll to that section after page loads
  if (window.location.hash && window.location.hash.includes('page6')) {
    setTimeout(() => {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        // If using Locomotive Scroll
        const locoScroll = window.locoScroll;
        
        if (locoScroll) {
          locoScroll.scrollTo(targetElement, {
            duration: 1500,
            easing: [0.25, 0.1, 0.25, 1.0]
          });
        } else {
          // Fallback to standard scrolling
          targetElement.scrollIntoView({ 
            behavior: 'smooth'
          });
        }
      }
    }, 1000); // Give the page time to fully load
  }
});
