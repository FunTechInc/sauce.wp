const backPosArr = [];
const forwardPosArr = [];

export const memoryPopstatePos = (trigger) => {
   const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
   if (trigger === "back") {
      forwardPosArr.push(scrollYPos);
   } else if (trigger === "forward") {
      backPosArr.push(scrollYPos);
   } else {
      backPosArr.push(scrollYPos);
   }
};

export const pushPopstatePos = (trigger) => {
   let scrollPos = 0;
   if (trigger === "back") {
      scrollPos = backPosArr.pop() ?? 0;
   } else if (trigger === "forward") {
      scrollPos = forwardPosArr.pop() ?? 0;
   }
   return scrollPos;
};
