import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
import { DURATIONVAL, EASEVAL } from "./global";

export class AccordionToggle {
   constructor(listTarget) {
      this.listTarget = listTarget;
   }

   toggle() {
      //要素がない場合falseを返す
      if (!this.listTarget.length) return false;

      //animationの定義
      const toggleAnim = async ({ target, val }) => {
         return new Promise((resolve) => {
            gsap.to(target, {
               height: `${val}px`,
               duration: DURATIONVAL,
               ease: `${EASEVAL}.out`,
               onComplete: () => {
                  resolve();
               },
            });
         });
      };

      const setAria = ({ btn, cont, clickElm, isTrue }) => {
         const tabIndex = isTrue ? "0" : "-1";
         btn.setAttribute("aria-expanded", isTrue);
         cont.setAttribute("aria-hidden", !isTrue);
         clickElm.forEach((element) => {
            element.setAttribute("tabindex", tabIndex);
         });
      };

      //toggle
      this.listTarget.forEach((element, index) => {
         const btn = element.getElementsByClassName("js_accordion_btn")[0];
         const contWrapper =
            element.getElementsByClassName("js_accordion_cont")[0];
         const contInner =
            element.getElementsByClassName("js_accordion_inner")[0];
         contWrapper.style.height = "auto";
         let contentHeight = contInner.clientHeight;
         //contの中にaあるいはbuttonがある場合、tabindexを-1にする
         const clickElm = contInner.querySelectorAll("a,button");

         if (index === 0) {
            setAria({
               btn: btn,
               cont: contWrapper,
               clickElm: clickElm,
               isTrue: true,
            });
            contWrapper.style.height = `${contentHeight}px`;
            contWrapper.style.visibility = "visible";
         } else {
            setAria({
               btn: btn,
               cont: contWrapper,
               clickElm: clickElm,
               isTrue: false,
            });
            contWrapper.style.height = 0;
            contWrapper.style.visibility = "hidden";
         }

         //リサイズを監視
         const resizeObserver = new ResizeObserver((entries) => {
            contentHeight = entries[0].target.clientHeight;
            if (contWrapper.getAttribute("aria-hidden") === "false") {
               contWrapper.style.height = `${contentHeight}px`;
            }
         });
         resizeObserver.observe(contInner);

         btn.addEventListener("click", async () => {
            if (btn.getAttribute("aria-expanded") !== "true") {
               //オープン
               setAria({
                  btn: btn,
                  cont: contWrapper,
                  clickElm: clickElm,
                  isTrue: true,
               });
               contWrapper.style.visibility = "visible";
               toggleAnim({
                  target: contWrapper,
                  val: contentHeight,
               });
            } else {
               //クローズ
               setAria({
                  btn: btn,
                  cont: contWrapper,
                  clickElm: clickElm,
                  isTrue: false,
               });
               await toggleAnim({ target: contWrapper, val: 0 });
               contWrapper.style.visibility = "hidden";
            }
         });
      });
   }
}
