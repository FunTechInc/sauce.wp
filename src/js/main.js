/*===============================================
CSS
===============================================*/
//resetCSS
import "the-new-css-reset/css/reset.css";
//splideのCSSインポート
// import '@splidejs/splide/dist/css/splide-core.min.css';

/*===============================================
ページ毎のイベント
===============================================*/
import { VanillaSauce } from "../ts/VanillaSauce";
import { birthdaySelect, fileInput, privacyCheck } from "../ts/dummy";
import { contactForm7Run } from "../ts/pageTrans/contactForm7Run";

const vanillaSauce = new VanillaSauce([
   {
      //top
      namespace: "top",
      beforeEnter() {},      
   },
   {
      //formdemo
      namespace: "formdemo",
      beforeEnter() {
         birthdaySelect();
         fileInput();
         privacyCheck();
         contactForm7Run();
      },
   },
   {
      //dummy
      namespace: "dummy",
      beforeEnter() {},
   }
]);

/*===============================================
once
===============================================*/
import { HeaderSubMenu } from "../ts/header/subMenu";
import { resizeReload, WINDOWSM } from "../ts/global";

vanillaSauce.on("once", () => {
   //リサイズリロード
   resizeReload(WINDOWSM);
   //サブメニュー   
   new HeaderSubMenu({
      btnClassName: "js_subNavBtn",
      preventBtnClassName: "js_subNavBtnPrevent",
      panelClassName: "js_subNavPanel",
   }).init();
   console.log("once");
});

/*===============================================
every
===============================================*/
vanillaSauce.on("every", () => {
   console.log("every");   
});

/*===============================================
before
===============================================*/
vanillaSauce.on("before", () => {
   console.log("before");
});

/*===============================================
afterLeave
===============================================*/
vanillaSauce.on("afterLeave", () => {
   console.log("afterLeave");
});

/*===============================================
beforeEnter
===============================================*/
vanillaSauce.on("beforeEnter", () => {
   console.log("beforeEnter");
});

/*===============================================
after
===============================================*/
vanillaSauce.on("enter", () => {
   console.log("enter");
});

/*===============================================
after
===============================================*/
vanillaSauce.on("after", () => {
   console.log("after");
});

/*===============================================
VanillaSauce初期化
===============================================*/
vanillaSauce.init();
