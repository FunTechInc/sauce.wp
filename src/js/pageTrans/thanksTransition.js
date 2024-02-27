export function thanksTransition() {
   document.addEventListener(
      "wpcf7mailsent",
      function (event) {
         const urlPath = "ルートのURL";
         if (document.getElementById("hoge")) {
            location = `${urlPath}hogehoge/thanks`;
         } else if (document.getElementById("hogehoge")) {
            location = `${urlPath}hogehoge/thanks`;
         }
      },
      false
   );
}
