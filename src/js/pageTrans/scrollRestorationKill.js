export const scrollRestorationKill = () => {
   if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
   }
};
