import { gsap } from "gsap";
import { DURATIONVAL, EASEVAL } from "../global";
let count = 0;
let timer:number = 0;
const pageTransLoader = document.getElementById("js_pageTransLoader");
export const pageTransTimer = (isStart:boolean) => {
   if (isStart) {
      timer = window.setInterval(() => {
         count++;
         if (count > 0) {
            gsap.to(pageTransLoader, {
               autoAlpha: 1,
               y: 0,
               ease: `${EASEVAL}.out`,
               duration: DURATIONVAL,
            });
         }
      }, 1000);
   } else {
      count = 0;
      gsap.to(pageTransLoader, {
         autoAlpha: 0,
         y: "-1.6rem",
         ease: `${EASEVAL}.out`,         
         duration: DURATIONVAL,
      });
      clearInterval(timer);
   }
};
