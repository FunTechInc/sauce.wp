import { isTouch } from "../global";

export const doubletapNone = ():void => {
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
