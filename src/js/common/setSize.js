export const setSize = () => {
   /*===============================================
	CSS変数に画面幅・高を設定
	===============================================*/
   const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
   };
   const setfixVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--fixvh", `${vh}px`);
   };
   const setVw = () => {
      const vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty("--vw", `${vw}px`);
   };
   setVh();
   setfixVh();
   setVw();
   window.addEventListener("load", setVh);
   window.addEventListener("resize", setVh);
   window.addEventListener("load", setVw);
   window.addEventListener("resize", setVw);
};
