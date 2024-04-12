/*===============================================
テーマカラー変更（safariのノッチ部分の背景色に対応）
===============================================*/
export const themeColorChange = (isForward:boolean) => {
   const metaDiscre = [...document.head.children];
   const themeColor = "#2b1a24";
   const defaultColor = "#fef6ed";
   let target: any = null;
   metaDiscre.forEach((element) => {
      if (element.getAttribute("name") === "theme-color") {
         target = element;
      }
   });
   if (isForward) {
      target?.setAttribute("content", themeColor);
   } else {
      target?.setAttribute("content", defaultColor);
   }
};
