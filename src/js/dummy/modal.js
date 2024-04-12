import { gsap } from "gsap";
import "micromodal";
import { inertiaScrollSwitch } from "../../ts/common/inertiaScroll";
import { DURATIONVAL, EASEVAL } from "../../ts/global";

/*===============================================
animation
===============================================*/
const fadeInAnim = (target) => {
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

const fadeOutAnim = async (target) => {
   return new Promise((resolve) => {
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
      onShow: (modal) => {
         //display切替
         modal.style.display = "block";
         //アニメーション
         fadeInAnim(modal);
         //dialogを最上位に
         modal.showModal();
         //スクロール固定
         inertiaScrollSwitch(false);
      },
      onClose: async (modal) => {
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
