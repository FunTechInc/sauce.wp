import { gsap } from "gsap";
import { inertiaScrollSwitch } from "../common/inertiaScroll";
import { DURATIONVAL, EASEVAL } from "../global";
import MicroModal from 'micromodal';  

/*===============================================
animation
===============================================*/
const fadeInAnim = (target:HTMLElement) => {
   const container = target.getElementsByClassName("bl_modal_container")[0];
   const tl = gsap.timeline({
      paused: true,
      defaults: {
         duration: DURATIONVAL,
         ease: `${EASEVAL}.out`,
      },
   });
   tl.fromTo(
      target,
      {
         autoAlpha: 0,
      },
      {
         autoAlpha: 1,
      }
   ).fromTo(
      container,
      {
         y: "3.2rem",
      },
      {
         y: 0,
      },
      "<"
   );
   tl.play();
};

type resolveType = () => void;
const fadeOutAnim = async (target:HTMLElement) => {
   return new Promise<void>((resolve) => {
      const container = target.getElementsByClassName("bl_modal_container")[0];
      const tl = gsap.timeline({
         paused: true,
         defaults: {
            duration: DURATIONVAL,
            ease: `${EASEVAL}.out`,
         },
         onComplete: () => {
            resolve();
         },
      });
      tl.to(target, {
         autoAlpha: 0,
      }).to(
         container,
         {
            y: "-3.2rem",
         },
         "<"
      );
      tl.play();
   });
};

/*===============================================
modal 初期化
===============================================*/
export const modalInit = () => {
   MicroModal.init({
      onShow: (modal:any) => {
         if(!modal) return;
         //display切替
         modal.style.display = "block";
         //アニメーション
         fadeInAnim(modal);
         //dialogを最上位に
         modal.showModal();
         //スクロール固定
         inertiaScrollSwitch(false);
      },
      onClose: async (modal:any) => {
         //アニメーション
         await fadeOutAnim(modal);
         //display切替
         modal.style.display = "none";
         //dialogを解除
         modal.close();
         //スクロール固定解除
         inertiaScrollSwitch(true);
      },
      awaitOpenAnimation: false,
      awaitCloseAnimation: false,
   });
};
