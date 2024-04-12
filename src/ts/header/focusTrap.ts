import { hamburgerBtn } from "./smMenuToggle";
/*===============================================
フォーカストラップ
===============================================*/
export const focusTrapInit = ():void => {
   const focusTrap = document.getElementById("js_focusTrap");
   if (focusTrap) {
      focusTrap.addEventListener("focus", (e) => {
         hamburgerBtn?.focus();
      });
   }
};
