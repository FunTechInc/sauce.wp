import { hamburgerBtn } from "./smMenuToggle";
/*===============================================
配列に入れた要素をクラストグルさせる
===============================================*/
export const classToggle = (isForward) => {
   const header = document.getElementById("js_header");
   const body = document.body;
   const classToggleList = [hamburgerBtn, header, body];
   if (isForward) {
      classToggleList.forEach((element) => {
         element.classList.add("is_smMenu_open");
      });
   } else {
      classToggleList.forEach((element) => {
         element.classList.remove("is_smMenu_open");
      });
   }
};
