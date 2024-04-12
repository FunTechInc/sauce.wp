export const switchViewport = ():void => {
   const viewport = document.querySelector('meta[name="viewport"]');
   if (!viewport) return;
   const value =
      window.outerWidth > 360
         ? "width=device-width,initial-scale=1"
         : "width=360";
   if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
   }
};
