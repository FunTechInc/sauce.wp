import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function allTriggerKill():void {
   let allTrigger = ScrollTrigger.getAll();
   if (allTrigger.length) {
      for (let i = 0; i < allTrigger.length; i++) {
         allTrigger[i].kill(true);
      }
   }
}
