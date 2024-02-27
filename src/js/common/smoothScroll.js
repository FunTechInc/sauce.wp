import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { DURATIONVAL, EASEVAL } from "../../ts/global";

//ヘッダーとの間のpadding
const paddingTop = 32;

//posを取得
const getPos = (target) => {
   let headerHeight = document.querySelector("header").clientHeight;
   const rect = target.getBoundingClientRect();
   const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
   const updatePos = rect.top + scrollYPos - headerHeight - paddingTop;
   return updatePos;
};

//posまでスクロール
const scrollFunc = (e) => {
   e.preventDefault();
   const target = document.querySelector(e.target.getAttribute("href"));
   let pos = getPos(target);
   gsap.to(window, {
      duration: DURATIONVAL,
      ease: `${EASEVAL}.out`,
      scrollTo: pos,
      onComplete: () => {
         let range = pos - getPos(target);
         if (!(range > -10 && range < 10)) {
            scrollFunc(e);
         }
      },
   });
};

let smoothBtnArry = [];
export const smoothScroll = (isAdd) => {
   if (isAdd) {
      smoothBtnArry = [...document.getElementsByClassName("js_smoothScroll")];
      smoothBtnArry.forEach((element) => {
         element.addEventListener("click", scrollFunc);
      });
   } else {
      smoothBtnArry.forEach((element) => {
         element.removeEventListener("click", scrollFunc);
      });
   }
};
