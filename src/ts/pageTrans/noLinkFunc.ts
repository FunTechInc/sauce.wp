const links = document.querySelectorAll("a[href]");
const noLink = (e:Event):void => {
   const currentTarget = e.currentTarget as HTMLAnchorElement;   
   if (currentTarget.href === window.location.href) {
      e.preventDefault();
      e.stopPropagation();
   }
};

export const noLinkFunc = ():void => {
   links.forEach((element) => {
      element.addEventListener("click", function (e:Event) {
         noLink(e);
      });
   });
};
