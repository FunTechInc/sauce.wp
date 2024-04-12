import Lenis from "@studio-freight/lenis";

/*===============================================
慣性スクロール
https://www.desmos.com/calculator/brs54l4xou
https://easings.net/en
たぶんこれがgsapのpowe4で
easing: (t) => Math.min(1 - Math.pow(1 - t, 4)),
これがpower2
easing: (t) => Math.min(1 - Math.pow(1 - t, 2)),
累乗の値を変えてる
===============================================*/
let inertiaScroll = null as Lenis | null;
let rAFID:number = 0;

//初期化
export const inertiaScrollInit = (isInit:boolean) => {
   if (isInit) {
      inertiaScroll = new Lenis({
         duration: 0.6,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
         direction: "vertical",
         gestureDirection: "vertical",
         smooth: true,
         mouseMultiplier: 1,
         smoothTouch: false,
         touchMultiplier: 2,
         infinite: false,
      });
      function raf(time:number) {
         inertiaScroll?.raf(time);
         rAFID = requestAnimationFrame(raf);
      }
      rAFID = requestAnimationFrame(raf);
   } else {
      cancelAnimationFrame(rAFID);
      inertiaScroll?.destroy();
   }
};

/*===============================================
スクロールを禁止して、一部だけスクロールさせたい（modalとかheader）
子要素のjs_scrollContInnerが親要素のjs_scrollContWrapより高さがある場合、preventを追加する
===============================================*/
export const inertiaScrollContent = () => {
   const wrapper:HTMLElement[] = [...document.getElementsByClassName("js_scrollContWrap")] as HTMLElement[];
   const setPrevent = (wrapper:HTMLElement, inner:HTMLElement) => {
      if (wrapper.clientHeight < inner.clientHeight) {
         wrapper.setAttribute("data-lenis-prevent", "");
         wrapper.style.overscrollBehavior = "contain";
      } else {
         wrapper.removeAttribute("data-lenis-prevent");
         wrapper.style.overscrollBehavior = "";
      }
   };
   if (wrapper.length) {
      wrapper.forEach((element) => {
         const inner = element.getElementsByClassName("js_scrollContInner")[0] as HTMLElement;
         setPrevent(element, inner);
         [element, inner].forEach((elm) => {
            new ResizeObserver(() => {
               setPrevent(element, inner);
            }).observe(elm);
         });
      });
   }
};

//スクロールの有効無効の切替
export const inertiaScrollSwitch = (isStart:boolean) => {
   if (isStart) {
      inertiaScroll?.start();
   } else {
      inertiaScroll?.stop();
   }
};

/*===============================================
スクロール中は画面遷移を無効にする
===============================================*/
export const preventLinkWhenScrolling = () => {
   //aタグの配列
   const hrefArr:HTMLAnchorElement[] = [...document.querySelectorAll("a")];
   //prevent中判定
   let isPreventing = false;
   const switchClass = (isAdd: boolean) => {
      hrefArr.forEach((element) => {
         if (isAdd) {
            isPreventing = true;
            element.classList.add("__prevent");
         } else {
            isPreventing = false;
            element.classList.remove("__prevent");
         }
      });
   };
   //scroll判定
   let isScrolling:boolean = false;
   let timeOutID:number = 0;
   //スクロールイベント
   inertiaScroll?.on("scroll", () => {
      isScrolling = true;
      if (!isPreventing) {
         switchClass(true);
      }
      clearTimeout(timeOutID);
      timeOutID = window.setTimeout(() => {
         isScrolling = false;
         switchClass(false);
      }, 50);
   });
};
