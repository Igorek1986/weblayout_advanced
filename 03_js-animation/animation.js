window.onload = function() {
  let heroTitle = document.querySelector('.hero__title');
  let heroDesc = document.querySelector('.hero__descr');
  let heroBtn = document.querySelector('.hero__btn');
  let photographerData = document.querySelector('.photos__author');
  let allPhotosImg = document.querySelectorAll('[photos-img]');
  let openTl = gsap.timeline();
  let burgerTl = gsap.timeline({paused:true});
  let burgerOpen = document.querySelector('.burger');
  let burgerClose = document.querySelector('.close');
  let burgerMenu = document.querySelector('.menu');
  let menuRight = document.querySelector('.menu__right');
  let menuNav = document.querySelector('.menu__nav');
  let social = document.querySelector('.social');
  let menuTop = document.querySelector('.menu__top');
  gsap.registerPlugin(CustomEase);

  burgerTl.from(burgerMenu, {ease: "power3.out", delay: .1, duration: .4, opacity: 0})
    .from(menuTop, {height: 0, ease: CustomEase.create("custom", "M0,0,C0,0,0.05,0.228,0.09,0.373,0.12,0.484,0.139,0.547,0.18,0.654,0.211,0.737,0.235,0.785,0.275,0.864,0.291,0.896,0.303,0.915,0.325,0.944,0.344,0.97,0.356,0.989,0.38,1.009,0.413,1.039,0.441,1.058,0.48,1.08,0.496,1.089,0.51,1.091,0.53,1.095,0.552,1.099,0.567,1.101,0.59,1.099,0.623,1.097,0.646,1.094,0.68,1.085,0.768,1.061,0.822,1.035,0.91,1.011,0.943,1.002,1,1,1,1"), delay: .2, duration: .5}, "<")
    .from(menuTop, {opacity: 0, ease: 'sine.in', duration: .8}, "<")
    .from(menuNav, {opacity: 0, y: 20,  ease: "power4.out", duration: .4})
    .from(menuRight, {opacity: 0, y: 80, ease: "power4.out", duration: .8})
    .from(social, {opacity: 0, y: 80, ease: "power4.out", duration: .8}, "<");


  burgerOpen.addEventListener('click', () => {
    burgerMenu.classList.add('menu--open');
    burgerTl.play();
  });

  burgerClose.addEventListener('click', () => {
    burgerTl.reverse();
    setTimeout(() => {
      burgerMenu.classList.remove('menu--open')
    }, 2000);
  });

  gsap.from(heroTitle, {y: 100, opacity: 0, delay: .5, duration: 1.2, ease: "power3.out"});
  gsap.from(heroBtn, {y: 100, opacity: 0, delay: .5, duration: 1, ease: "power3.out"});
  gsap.from(heroDesc, {opacity: 0, ease: "power3.out", delay: 1.2, duration: 3});
  gsap.from(photographerData, {opacity: 0, ease: "power3.out", delay: 2, duration: 1.2});
  openTl.from(allPhotosImg, {opacity: 0, ease: "power3.out", delay: 1.2, duration: 5, stagger: .3});
};














// let tl=gsap.timeline();
// tl.from(".hero__title",{y:300,duration:1})
// tl.from(".hero__descr",{opacity:0,duration:1})
// tl.from(".photo1",{scale: 0})
// tl.from(".photo2",{scale: 0})
// tl.from(".photo3",{scale: 0})
// tl.from(".photos__author",{opacity:0,duration:1})



// gsap.from(".hero__btn",{y:300,duration:1})


// let play = document.querySelector(".burger");
// let reverse = document.querySelector(".close");
// console.log(reverse);
// console.log(play);


// 	let tl2 = gsap.timeline({paused: true});
// 	tl2.to(".menu",{opacity:1, zIndex:100});

// 	tl2.from(".menu__nav",{y:200, opacity:0, duration:0.7},'-=1');
// 	tl2.from(".sub-menu",{y:200, opacity:0, duration:1},'-=1');
// 	tl2.from(".sub-menu2",{y:200, opacity:0, duration:1},'-=1');
// 	tl2.from(".social",{y:200, opacity:0, duration:1},'-=1');

// play.onclick = function() {
//   document.querySelector('.menu').classList.toggle('menu--open');
//   tl2.play();
// }
// reverse.onclick = function() {
//   tl2.reverse();
//   setTimeout(() => {
//     document.querySelector('.menu').classList.toggle('menu--open');
//   }, 2000)
// }
