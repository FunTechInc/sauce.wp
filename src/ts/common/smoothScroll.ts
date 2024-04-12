import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { DURATIONVAL, EASEVAL } from "../global";

//ヘッダーとの間のpadding
const paddingTop:number = 32;

//posを取得
const getPos = (target:HTMLElement) => {
   let headerHeight = document.querySelector("header")?.clientHeight || 0;
   const rect = target.getBoundingClientRect();
   const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
   const updatePos = rect.top + scrollYPos - headerHeight - paddingTop;
   return updatePos;
};

//posまでスクロール
const scrollFunc = (e:MouseEvent):void => {
   e.preventDefault();
   const _target = e.target as HTMLElement;   
   const query = _target?.getAttribute("href") || "";
   let target:HTMLElement | null = null;
   let pos = 0;   
   if(query === '#' || query === '' || query === undefined) {
      pos = 0;
   } else {      
      target = document.querySelector(query);
      if(target === null) return;
      pos = getPos(target);      
   };
   gsap.to(window, {
      duration: DURATIONVAL,
      ease: `${EASEVAL}.out`,
      scrollTo: pos,
      onComplete: () => {
         if (target === null) return;
         let range = pos - getPos(target);
         if (!(range > -10 && range < 10)) {
            scrollFunc(e);
         }
      },
   });
};

let smoothBtnArry:HTMLElement[] = [];
export const smoothScroll = (isAdd:boolean) => {
   if (isAdd) {
      smoothBtnArry = [...document.getElementsByClassName("js_smoothScroll")] as HTMLElement[];
      smoothBtnArry.forEach((element) => {         
         element.addEventListener("click", scrollFunc);
      });
   } else {
      smoothBtnArry.forEach((element) => {
         element.removeEventListener("click", scrollFunc);
      });
   }
};
