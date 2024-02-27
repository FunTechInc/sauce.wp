import { gsap } from "gsap";
import { DURATIONVAL, EASEVAL } from "../../ts/global";

/*===============================================
設定
===============================================*/
//target
const target01 = document.getElementsByClassName("ly_main");
const target02 = document.querySelector("footer");
const targetArr = [...target01, target02];

//animation val
const YPOS = 6.4;

/*===============================================
leave アニメーション
===============================================*/
export const pageLeaveAnim = async ({ ease }) => {
   let pageLeaveAnimTL;
   new Promise((resolve) => {
      pageLeaveAnimTL = gsap.timeline({
         paused: true,
         onComplete() {
            resolve();
         },
      });
   });
   //TL
   pageLeaveAnimTL.to(targetArr, {
      opacity: 0,
      y: `${YPOS * -1}rem`,
      duration: DURATIONVAL,
      ease: `${EASEVAL}.${ease}`,
   });
   await pageLeaveAnimTL.play();
};

/*===============================================
enter アニメーション
===============================================*/
export const pageEnterAnim = ({ ispopstate, pos }) => {
   let scrollPos = 0;
   if (ispopstate) {
      scrollPos = pos ?? 0;
   }
   const pageEnterAnimTL = gsap.timeline({
      paused: true,
      onStart() {
         window.scrollTo({
            top: scrollPos,
         });
      },
   });
   //TL
   pageEnterAnimTL.fromTo(
      targetArr,
      {
         opacity: 0,
         y: `${YPOS}rem`,
      },
      {
         opacity: 1,
         y: 0,
         duration: DURATIONVAL,
         ease: `${EASEVAL}.out`,
      }
   );
   pageEnterAnimTL.play();
};
