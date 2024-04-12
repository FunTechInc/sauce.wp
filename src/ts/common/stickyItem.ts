/*===============================================
js_stickyItemがないページのly_wrapperにはhiddenかける
===============================================*/
export const stickyItem = ():void => {
   const wrapper = document.getElementsByClassName("ly_wrapper")[0];   
   if (document.getElementsByClassName("js_stickyItem").length) {
      wrapper.classList.remove("is_hidden");
   } else {
      wrapper.classList.add("is_hidden");
   }
};
