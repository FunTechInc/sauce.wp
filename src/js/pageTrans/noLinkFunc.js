const links = document.querySelectorAll("a[href]");
const noLink = (e) => {
   if (e.currentTarget.href === window.location.href) {
      e.preventDefault();
      e.stopPropagation();
   }
};

export const noLinkFunc = () => {
   links.forEach((element) => {
      element.addEventListener("click", function (e) {
         noLink(e);
      });
   });
};
