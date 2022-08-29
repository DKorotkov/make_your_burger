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

   // ------------------------------------------------------
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

})();
