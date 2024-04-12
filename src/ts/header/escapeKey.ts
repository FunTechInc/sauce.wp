import { hamburgerBtn, smMenuToggle } from "./smMenuToggle";

/*===============================================
エスケープキーでメニューの開閉ができるようにする
===============================================*/
export const escapeKeyDown = ():void => {
   if (hamburgerBtn) {
      window.addEventListener("keydown", (e) => {
         if (
            e.key === "Escape" &&
            hamburgerBtn?.classList.contains("is_smMenu_open")
         ) {
            smMenuToggle();
            hamburgerBtn?.focus();
         }
      });
   }
};
