/*===============================================
メニュー内のスクロール位置をトップに戻す
===============================================*/
export const menuAreaScrollTop = ():void => {
   const headerNavSm = document.getElementById("js_headerNav_sm");
   if(!headerNavSm) return;
   headerNavSm.scrollTop = 0;
};
