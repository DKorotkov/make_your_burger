// import { formValid } from "/js/modules/formValidation.min.js";

(function () {
   ("use strict");

   // -------------Загрузка шрифтов через скрипт------------
   // include('modules/_fonts.js')
   // ------------------------------------------------------

   // --------------------------------Загузка класса Аккардион----------------------------
   // include('modules/_accordion.js')
   // ------------------------------------------------------------------------------------

   // --------------------------------Загрузка класса Валидации форм----------------------
   // @@include('modules/_formValidation.js')
   // ------------------------------------------------------------------------------------

   // --------------------------------Загрузка класса Событий "касаний"----------------------
   // include('modules/_eventTouch.js')
   // ------------------------------------------------------------------------------------

   // --------------------------------Загрузка класса "Общего класса"----------------------
   @@include('modules/__noda.js')
   // ------------------------------------------------------------------------------------

   // --------------------------------Загрузка класса "Модальных окон"----------------------
   @@include('modules/_modal.js')
   // ------------------------------------------------------------------------------------

   // --------------------------------Загрузка класса "Галереи"----------------------
   // @@include('modules/_gallery.js')
   // ------------------------------------------------------------------------------------

   
   // -----------Проверка валидация формы-------------------
   // FormValid.init();
   // ------------------------------------------------------

   // -----------Окно мобильной навшицаа-----------------------------
   m = new ModalDK({
      selector: ".nav",
      openBtnsSelector: ['[data-name="header-modal"]'],
      focusTrap: true, // Требуется ли перемещаться табом только внутри объекта (default: false)
      collapseOnFocusOut: false, // Требуется ли закрывать при потери фокуса
      activeClass: "--active",
      overlay: false,
      matchMedia: '(max-width: 50rem)',

      // onClose() {
      //    console.log("modal closing");
      // },
   });
   // ------------------------------------------------------
   // -----------Модальное окно-----------------------------
   // m = new ModalDK({
   //    selector: "#modal",
   //    openBtnsSelector: ['[data-name="modal"]'],
   //    focusTrap: true, // Требуется ли перемещаться табом только внутри объекта (default: false)
   //    collapseOnFocusOut: false, // Требуется ли закрывать при потери фокуса
   //    activeClass: "--active",
   //    onClose() {
   //       console.log("modal closing");
   //    },
   // });
   // ------------------------------------------------------

   // -----------Галерея------------------------------------
//    g = new GalleryDK({
//    selector: ".gallery", // селектор контейнера, который объединяет все изображения
//    focusTrap: true,
//    collapseOnFocusOut: false,
// });

   // ------------Анимация бургера при загрузке--------------------------------
   const $discover = document.querySelector(".discover");
   const $discoverBurger = document.querySelector(".discover__burger");

    window.addEventListener("load", function(event) {
      $discover.classList.remove("loading");
      $discoverBurger.classList.add("descover__first");
      const discoverBurgerAnimLength = $discoverBurger.getAnimations().length;
      let animCounter = 0;
      $discoverBurger.addEventListener("animationend", ()=>{
         animCounter++;
         if (animCounter === discoverBurgerAnimLength) {
            $discoverBurger.classList.remove("descover__first");
            
            $discoverBurger.dataset.type = "explosion";
         }
      });
   });
   // ------------------------------------------------------------------

   // ------------------Работа с табами---------------------------------
   if (window.matchMedia("(min-width: 50rem)").matches) {
      const tabList = document.querySelector('.nav__box');
      const tabs = [...document.querySelectorAll('.tab-item')];
      const panels = [...document.querySelectorAll('.tab-panel')];

      let activeTabIndex = 0;

      tabList.setAttribute('role', 'tablist');
      tabs[activeTabIndex].setAttribute('aria-selected', 'true');
      panels.forEach(el => el.setAttribute('role', 'tabpanel'));
      panels.filter((el, j) => j !== activeTabIndex).forEach(el =>{ 
         el.hidden = true;
      });

      tabs.forEach((el, i) => {
         el.setAttribute('role', 'tab');

         const a = el.querySelector('a');

         const linkDirection = a.getAttribute('href').slice(1);
         a.setAttribute('role', 'presentation');
         a.setAttribute('tabindex', '0');
         a.removeAttribute('href');

         el.setAttribute('id', 'tab-' + i);
         el.setAttribute('aria-controls', 'panel-' + i);
         
         if (el.dataset.number) i = parseInt(el.dataset.number);
         panels[i].setAttribute('id', 'panel-' + i);
         panels[i].setAttribute('aria-labelledby', 'tab-' + i);

         const clickOnTab = (el) => {
            activeTabIndex = tabs.indexOf(el);
            if (el.dataset.number) activeTabIndex = parseInt(el.dataset.number);
            tabs[activeTabIndex].setAttribute('aria-selected', 'true');
            tabs[activeTabIndex].querySelector('a').setAttribute('aria-selected', 'true');
            panels[activeTabIndex].hidden = false;

            tabs.filter((el, j) => j !== activeTabIndex).forEach(el => {
               el.setAttribute('aria-selected', 'false');
               el.querySelector('a').setAttribute('aria-selected', 'false');
            });
            
            panels.filter((el, j) => j !== activeTabIndex).forEach(el =>{ 
               el.hidden = true;
            });
         };

         el.addEventListener("click", () => clickOnTab(el));
         el.addEventListener('keydown', (e)=>{
            if (e.keyCode === 13) clickOnTab(el);
         });
      });
   }
   else {
     const $burgerLink = document.querySelector('.nav__item[href="#burger"]');
     const $discoverLink = document.querySelector('.nav__item[href="#discover"]');
     const $burgerEl = document.querySelector("#burger");

   
      window.onscroll = () => {
         if (isInViewport($burgerEl)) {
            $burgerLink.setAttribute("aria-selected", "true");
            $discoverLink.removeAttribute("aria-selected");
            console.log('true');
         }
         else {
            $discoverLink.setAttribute("aria-selected", "true");
            $burgerLink.removeAttribute("aria-selected");
            console.log('false');

         }
     };
    
   }

   function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
         rect.top >= 0 &&
         rect.left >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
   }
   // ------------------------------------------------------------------

})();
