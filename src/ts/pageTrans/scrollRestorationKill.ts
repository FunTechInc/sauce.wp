export const scrollRestorationKill = ():void => {
   if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
   }
};
