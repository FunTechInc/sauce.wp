import { isTouch } from "../../ts/global";

export const touchHoverNone = () => {
   if (isTouch()) {
      var touch =
         "ontouchstart" in document.documentElement ||
         navigator.maxTouchPoints > 0 ||
         navigator.msMaxTouchPoints > 0;

      if (touch) {
         try {
            for (var si in document.styleSheets) {
               var styleSheet = document.styleSheets[si];
               if (!styleSheet.cssRules) continue;

               for (var ri = styleSheet.cssRules.length - 1; ri >= 0; ri--) {
                  if (!styleSheet.cssRules[ri].selectorText) continue;

                  if (styleSheet.cssRules[ri].selectorText.match(":hover")) {
                     styleSheet.deleteRule(ri);
                  }
               }
            }
         } catch (ex) {}
      }
   }
};
