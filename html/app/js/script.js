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

   // ------------Анимация бургера и запуск функций при загрузке--------------------------------
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

      // загружаем ингридиенты
      loadInrgedients();
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
   // ------------Загрузка ингредиентов ----------------------------------------
   const $price = document.querySelector(".burger__checkout-summ");
   const $summData = [...document.querySelectorAll(".burger__summary-data-name")];
   const buns = [];

   const addInrgedient = (param) => {
      $price.dataset.price = (parseFloat($price.dataset.price) + param.price).toFixed(2);
      $summData.forEach($data => {
         if ($data.dataset.name === 'min') $data.dataset.value = (parseFloat($data.dataset.value) + param.min).toFixed(2);
         if ($data.dataset.name === 'oz') $data.dataset.value = (parseFloat($data.dataset.value) + param.oz).toFixed(1);
         if ($data.dataset.name === 'kcal') $data.dataset.value = (parseFloat($data.dataset.value) + param.kcal).toFixed(0);
      });
      if (param.amount) param.amount.dataset.value++;
      addBurgerElement(param);
   };

   const removeInrgedient = (param) => {
      if (param.amount && parseInt(param.amount.dataset.value) === 0) return;
      $price.dataset.price = (parseFloat($price.dataset.price) - param.price).toFixed(2);
      $summData.forEach($data => {
         if ($data.dataset.name === 'min') $data.dataset.value = (parseFloat($data.dataset.value) - param.min).toFixed(0);
         if ($data.dataset.name === 'oz') $data.dataset.value = (parseFloat($data.dataset.value) - param.oz).toFixed(1);
         if ($data.dataset.name === 'kcal') $data.dataset.value = (parseFloat($data.dataset.value) - param.kcal).toFixed(0);
      });
      if (param.amount) param.amount.dataset.value--;
      removeBurgerElement(param);
   };

   function loadInrgedients() {
      const template = document.querySelector('#ingredient');
      const ingredients = document.querySelector('.ingredients');
      let data;
      
      readFile("../files/data/data.json", function(text){
         data = JSON.parse(text);
         data.forEach((el, i) => {
            if (el.auto) {
               buns.push(el);
               i--;
               return;
            }
            const clone = template.content.cloneNode(true);
            const cloneImg = document.createElement("img");
            const cloneName = clone.querySelector(".ingredient__name");
            const cloneAddBtn = clone.querySelector(".ingredient__plus");
            const cloneRemoveBtn = clone.querySelector(".ingredient__minus");
            const amount = clone.querySelector(".ingredient__amount");
            
            cloneImg.classList.add("ingredient__img");
            cloneImg.src = el.img;
            cloneName.innerHTML = el.name;
            
            ingredients.appendChild(clone);
            const appendClone = ingredients.querySelector(`.ingredient:last-of-type`);
            appendClone.insertBefore(cloneImg, cloneName);

            el.amount = amount;

            cloneAddBtn.addEventListener("click", () => addInrgedient(el));
            cloneRemoveBtn.addEventListener("click", () => removeInrgedient(el));

         });
         addInrgedient(buns[1]);
      });
      
      
   }

   function readFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
      rawFile.send(null);
   }

   
   // ------------------------------------------------------------------
   // ---------Добавление ингредиентов в бургер-------------------------
   const TIME_TO_ADD_TOP_BUN = 3000;

   
   const $scene = document.querySelector(".burger__scene");
   let totalBottom = 0; // размер первого блока в процентах для bottom
   const startBottom = 80; // начало анимации в процентах для bottom 
   let removeStatus = false; // для проверки в процессе ли удаление
   let removeEls = []; // очередь элементов на удаление

   let addTopBunTimout;
   function addTopBun() {
      addTopBunTimout = setTimeout(() => {
         addInrgedient(buns[0]);
         clearTimeout(addTopBunTimout);
         addTopBunTimout = null;
      }, TIME_TO_ADD_TOP_BUN);
      
   }

   function addBurgerElement(param) {
      const $burgerElList = [...$scene.querySelectorAll(".burger__scene-element")];
      if(addTopBunTimout){
         clearTimeout(addTopBunTimout);
         addTopBunTimout = null;
      }
      if ($burgerElList.length > 0) {
         addTopBun();
      }
      if ($scene.querySelector(`[data-name="${buns[0].name}"]`) !== null) removeInrgedient(buns[0]);

      const $burgerEl = document.createElement("img");
      const startThisBottom = startBottom + param.width;
      
      $burgerEl.classList.add("burger__scene-element");
      $burgerEl.src = param.img_group ? param.img_group : param.img;
      $burgerEl.setAttribute("alt", param.name);
      $burgerEl.setAttribute("data-name", param.name);
      $burgerEl.style.bottom = `${startThisBottom}%`;
      $burgerEl.style.opacity = 0;
      
      $scene.appendChild($burgerEl);
      setTimeout(() => {
         $burgerEl.style.bottom = `${totalBottom}%`;
         $burgerEl.style.opacity = 1;
         totalBottom += param.width;
      }, 1);
   }

   function removeBurgerElement(param) {
      if (removeStatus) {
         removeEls.push(param);
         return;
      }
      removeStatus = true;
      const $burgerEl = $scene.querySelectorAll(`[data-name="${param.name}"]`);
      if ($burgerEl.length > 0) {
         const $burgerElList = [...$scene.querySelectorAll(".burger__scene-element")];
         const indexOfRemoveEl = $burgerElList.indexOf($burgerEl[$burgerEl.length - 1]);

         $burgerEl[$burgerEl.length - 1].classList.add("burger__scene-element--delete");
         $burgerEl[$burgerEl.length - 1].addEventListener("animationend", ()=>{
            $scene.removeChild($burgerEl[$burgerEl.length - 1]);
            removeStatus = false;
            if (removeEls.length > 0) {
               removeBurgerElement(removeEls[0]);
               removeEls.shift();
            }
         });

         totalBottom -= param.width;

         for (let i = indexOfRemoveEl + 1; i < $burgerElList.length; i++) {
            const $element = $burgerElList[i];
            const elWidth = parseInt($element.style.bottom, 10) - param.width;
            $element.style.bottom = `${elWidth}%`;
         }
      }
   }
   // ------------------------------------------------------------------


})();
