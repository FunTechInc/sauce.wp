

/*===============================================
メディアクエリ
===============================================*/
export const WINDOWSM: number = 560;
export const WINDOWMD: number = 960;
export const WINDOWLG: number = 1120;

/*===============================================
グローバル変数
===============================================*/
export const TRIGGERTIMING = "top bottom-=10%";
export const INTERSECTIONTIMING = "-10% 0px";
export const DURATIONVAL : number = 0.8;
export const EASEVAL = "power3";
export const STAGGERTIMING : number = 0.1;

/*===============================================
タッチデバイス判定
===============================================*/
export const isTouch = ():boolean => {
   const touch_event = window.ontouchstart;
   const touch_points = navigator.maxTouchPoints;

   if (touch_event !== undefined && 0 < touch_points) {
      return true;
   } else {
      return false;
   }
};
/*===============================================
デバイス判定
===============================================*/
export const isMobile = ():boolean => {
   if (window.innerWidth <= WINDOWSM) {
      return true;
   } else {
      return false;
   }
};
export const isTablet = ():boolean => {
   if (window.innerWidth <= WINDOWMD) {
      return true;
   } else {
      return false;
   }
};
window.addEventListener("resize", () => {
   isMobile();
   isTablet();
});

/*===============================================
リサイズリロード
===============================================*/
export const resizeReload = (winSize:number):void => {
   let resizeFlag = window.innerWidth <= winSize ? false : true;
   const resizeFunc = (flag:boolean) => {
      window.location.reload();
      resizeFlag = !flag;
   };
   window.addEventListener("resize", () => {
      if (window.innerWidth <= winSize) {
         resizeFlag && resizeFunc(resizeFlag);
      } else {
         !resizeFlag && resizeFunc(resizeFlag);
      }
   });
};
