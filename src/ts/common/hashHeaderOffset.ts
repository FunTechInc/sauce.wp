export const hashHeaderOffset = ():void => {
   const header = document.querySelector("header");   
   if (header) {
      let urlHash = location.hash;
      let headerHeight = header.clientHeight;
      if (urlHash) {
         let offset = headerHeight;
         let target = document.querySelector(urlHash);
         setTimeout(() => {            
            if(!target) return;
            const rect = target.getBoundingClientRect();            
            const scrollTop =
               window.pageYOffset || document.documentElement.scrollTop;
            const pos = rect.top + scrollTop - offset;
            window.scrollTo({
               top: pos,
            });
         }, 10);         
      }
   }
};