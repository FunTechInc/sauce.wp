declare global {
   interface Window {
      wpcf7: any;
   }
}

export function contactForm7Run():void {
   const cfForms = document.querySelector("div.wpcf7 form");
   if (cfForms) {
      window.wpcf7.init(cfForms); 
   }
}
