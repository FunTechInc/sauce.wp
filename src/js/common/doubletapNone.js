import { isTouch } from "../../ts/global";

export const doubletapNone = () => {
   if (isTouch()) {
      document.addEventListener(
         "dblclick",
         function (e) {
            e.preventDefault();
         },
         {
            passive: false,
         }
      );
   }
};
