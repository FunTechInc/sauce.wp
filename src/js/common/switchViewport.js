export const switchViewport = () => {
   const viewport = document.querySelector('meta[name="viewport"]');
   const value =
      window.outerWidth > 360
         ? "width=device-width,initial-scale=1"
         : "width=360";
   if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
   }
};
