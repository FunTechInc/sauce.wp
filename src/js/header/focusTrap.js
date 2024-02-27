import { hamburgerBtn } from "./smMenuToggle";
/*===============================================
フォーカストラップ
===============================================*/
export const focusTrapInit = () => {
   const focusTrap = document.getElementById("js_focusTrap");
   if (focusTrap) {
      focusTrap.addEventListener("focus", (e) => {
         hamburgerBtn.focus();
      });
   }
};
