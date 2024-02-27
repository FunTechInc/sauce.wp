export function contactForm7Run() {
   const cfForms = document.querySelector("div.wpcf7 form");
   if (cfForms) {
      wpcf7.init(cfForms);
   }
}
