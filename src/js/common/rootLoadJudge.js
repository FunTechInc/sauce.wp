export let isLoaded = false;
export const rootLoadJudge = () => {
   //DOM読み込み後にHTMLにis_DOMloadedを付与する
   window.addEventListener("DOMContentLoaded", () => {
      document.documentElement.classList.add("🍦");
      document.documentElement.classList.add("is_DOMloaded");
   });
   //読み込み後にHTMLにis_loadedを付与する
   window.addEventListener("load", () => {
      document.documentElement.classList.add("is_loaded");
      isLoaded = true;
   });
};
