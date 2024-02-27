import { gsap } from "gsap";
import { DURATIONVAL, EASEVAL } from "../../ts/global";

export class HeaderSubMenu {
   constructor({ btnClassName, preventBtnClassName, panelClassName }) {
      this.btns = [...document.getElementsByClassName(btnClassName)];
      this.preventBtns = [
         ...document.getElementsByClassName(preventBtnClassName),
      ];
      this.panels = [...document.getElementsByClassName(panelClassName)];
      this.menuState = {
         isView: false,
         isBusy: false,
         busySwitch: () => {
            this.menuState.isBusy = true;
            setTimeout(() => {
               this.menuState.isBusy = false;
            }, 100);
         },
         fadeIn: (target) => {
            gsap.fromTo(
               target,
               {
                  autoAlpha: 0,
                  y: 10,
               },
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: DURATIONVAL,
                  ease: `${EASEVAL}.out`,
               }
            );
         },
         fadeOut: (target) => {
            gsap.to(target, {
               autoAlpha: 0,
               y: 10,
               duration: DURATIONVAL,
               ease: `${EASEVAL}.out`,
            });
         },
         subNavFadeOut: () => {
            this.menuState.isView = false;
            this.panels.forEach((element) => {
               this.menuState.fadeOut(element);
            });
         },
      };
   }
   init() {
      //マウスがwindow外に出た時に全部消す
      document.body.addEventListener("mouseleave", () => {
         this.menuState.subNavFadeOut();
      });
      //isViewがtrueなのに、ly_mainをマウスが移動してる時は消す
      document
         .getElementsByClassName("ly_main")[0]
         .addEventListener("mousemove", () => {
            if (this.menuState.isView === true) {
               this.menuState.subNavFadeOut();
            }
         });
      this.btns.forEach((element, index) => {
         element.addEventListener("mouseenter", () => {
            if (this.menuState.isBusy === false) {
               this.menuState.busySwitch();
               this.panels[index].style.pointerEvents = "auto";
               //2つ同時に出てるバグを回避
               this.panels.forEach((elm, i) => {
                  if (i === index) {
                     this.menuState.isView = true;
                     this.menuState.fadeIn(elm);
                  } else {
                     this.menuState.fadeOut(elm);
                  }
               });
            }
         });
         element.addEventListener("mouseleave", () => {
            if (this.menuState.isBusy === false) {
               this.menuState.isView = false;
               this.menuState.busySwitch();
               this.panels[index].style.pointerEvents = "none";
               this.menuState.fadeOut(this.panels[index]);
            }
         });
      });
      //preventにマウスが入ったら全部fadeOutする
      this.preventBtns.forEach((element) => {
         element.addEventListener("mouseenter", () => {
            this.menuState.subNavFadeOut();
         });
      });
   }
   fadeOutAll() {
      this.menuState.subNavFadeOut();
   }
}
