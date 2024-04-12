import { isTouch } from "../global";

export const touchHoverNone = ():void => {      
   
   if (isTouch()) {
      let _navigator = navigator as any; // navigatorの型定義が不完全なため (msMaxTouchPointsが存在しない)
      const touch =
         "ontouchstart" in document.documentElement ||
         _navigator.maxTouchPoints > 0 ||
         _navigator.msMaxTouchPoints > 0;
      if (touch) {
         try {
            for (var si in document.styleSheets) {
               const styleSheet = document.styleSheets[si] as any; // CSSStyleSheetの型定義が不完全なため (selectorTextが存在しない)               
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
