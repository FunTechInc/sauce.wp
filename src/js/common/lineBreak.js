import { loadDefaultJapaneseParser } from "budoux";
export const lineBreakBudou = () => {
   const parser = loadDefaultJapaneseParser();
   const elements = document.getElementsByClassName("js_budou");
   for (let i = 0; i < elements.length; i++) {
      parser.applyElement(elements[i]);
   }
};
