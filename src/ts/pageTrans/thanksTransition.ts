export function thanksTransition():void {
   document.addEventListener(
      "wpcf7mailsent",
      function (event) {
         const urlPath = "ルートのURL";
         if (document.getElementById("hoge")) {
            location = `${urlPath}hoge/thanks` as any;
         } else if (document.getElementById("hogehoge")) {
            location = `${urlPath}hogehoge/thanks` as any;;
         }
      },
      false
   );
}
