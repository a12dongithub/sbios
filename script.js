/* 
  No changes to existing animations or transitions, 
  only appending new sections' animations if desired.
*/

/* Keep the same functionality for video play on click */
function playVideo() {
  document.querySelector("body").addEventListener("click", () => {
    document.querySelector("video").play();
    console.log("hey");
  });
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

/* Loader timeline */
var tl = gsap.timeline();

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
