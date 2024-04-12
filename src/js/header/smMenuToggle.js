import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

//functions
import { inertiaScrollSwitch } from "../../ts/common/inertiaScroll";
import { classToggle } from "./classToggle";
import { themeColorChange } from "./themeColorChange";
import { focusTrapInit } from "./focusTrap";
import { escapeKeyDown } from "./escapeKey";
import { menuAreaScrollTop } from "./menuAreaScrollTop";

/*===============================================
変数
===============================================*/
//ハンバーガーボタン
export const hamburgerBtn = document.getElementById("js_hamburgerBtn");
//エスケープキーのクリックで閉じる
escapeKeyDown();
//フォーカストラップ
focusTrapInit();

/*===============================================
背景の出現
===============================================*/
const bgMaskAnimTL = () => {
   const menuBg = document.getElementsByClassName("bl_headerNav_sm_bg")[0];
   const menuBgMask = menuBg.getElementsByClassName("bg_mask")[0];
   //以下を実行すればpathに変換できる
   // MorphSVGPlugin.convertToPath(
   //    "circle, rect, ellipse, line, polygon, polyline"
   // );

   const tl = gsap.timeline();
   tl.to(menuBg, {
      opacity: 1,
      duration: 0.01,
   })
      .to(menuBgMask, {
         duration: 0.4,
         ease: "power0",
         morphSVG:
            "M0,0 L1000,0 L1000,500 C750,1000 250,1000 0,500 L0,500 L0,0 Z",
      })
      .to(menuBgMask, {
         duration: 0.6,
         ease: "power3.out",
         morphSVG:
            "M0,0 L1000,0 L1000,1000 C750,1000 250,1000 0,1000 L0,1000 L0,0 Z",
      });
   return tl;
};

/*===============================================
メニューの出現
===============================================*/
const menuContTL = () => {
   const smMenu = document.getElementById("js_headerNav_sm");
   const smMenuList = [
      ...smMenu.getElementsByClassName("bl_headerNav_sm_list"),
   ];
   const tl = gsap.timeline();
   tl.fromTo(
      smMenuList,
      {
         opacity: 0,
         y: "4rem",
      },
      {
         opacity: 1,
         y: 0,
         duration: 0.4,
         stagger: {
            each: 0.05,
         },
      }
   );
   return tl;
};

/*===============================================
ハンバーガーのアニメーション
===============================================*/
const btnAnimTL = () => {
   const target = document
      .getElementsByClassName("bl_hamburgerBtn_trigger")[0]
      .querySelector(".btn");
   const tl = gsap.timeline();
   tl.to(target, {
      morphSVG:
         "m15.6 6.1.8.9c-1 1.9-4.4 4.5-9 4.5-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2c3 0 3.5-3.9 4.8-5.4l1.1.5v1.9h2.3zm1.6-.3c0 .3 0 .6-.1.8l-1.2-1.2H14V3.8L12.4 3c.5-.3 1-.5 1.6-.5.4 0 .9.1 1.2.3.4-.8.2-1.3 0-1.6v-.1s0-.1.1-.1l.5-.5.1-.1s.1 0 .1.1c.4.5.8 1.5.1 2.8.7.6 1.1 1.7 1.1 2.5z",
   }).to(target, {
      morphSVG:
         "m21.7 9-7-3 7-3c.5-.2.8-.9.6-1.5-.2-.6-.8-.9-1.3-.7l-9.2 3.9L2 .6C1.5.4.9.7.7 1.3c-.2.6.1 1.2.6 1.5L8.9 6 1.3 9.2c-.5.2-.8.9-.6 1.5.2.6.8.9 1.3.7l9.9-4.2 9.2 3.9c.5.2 1.1-.1 1.3-.7.1-.6-.2-1.2-.7-1.4z",
   });
   return tl;
};

/*===============================================
ボタンクリックのタイミングで発火させる
===============================================*/
const commonInit = (isForward) => {
   const smMenu = document.getElementById("js_headerNav_sm");
   //テーマカラーチェンジ
   themeColorChange(isForward);
   //スクロール切替
   inertiaScrollSwitch(!isForward);
   //アクセシビリティ
   hamburgerBtn.setAttribute("aria-expanded", isForward);
   smMenu.setAttribute("aria-hidden", !isForward);
   if (isForward) {
      //メニュー内のスクロール位置をトップに戻す
      menuAreaScrollTop();
   }
};

/*===============================================
タイムライン
===============================================*/
let menuAnimTL;

if (hamburgerBtn) {
   new Promise((resolve) => {
      menuAnimTL = gsap.timeline({
         paused: true,
         onReverseComplete() {
            //共通で発火させる関数(reverseが終わってから)
            commonInit(false);
            //クラス付替(reverseが終わってから)
            classToggle(false);
            resolve();
         },
      });
   });

   menuAnimTL
      .add(btnAnimTL(), "<")
      //背景の出現
      .add(bgMaskAnimTL(), "<")
      //メニューの出現
      .add(menuContTL(), "<");
}

/*===============================================
fire！
===============================================*/
let isBusy = false;
let isMenuOpen = false;
const isBusyCheck = () => {
   if (!isMenuOpen) {
      isMenuOpen = true;
   } else {
      isMenuOpen = false;
   }
   //連打対策
   isBusy = true;
   setTimeout(() => {
      isBusy = false;
   }, 500);
};

//これ自体はpromiseを返す。mainで呼び出す際にawaitさせてる
export const smMenuToggle = async () => {
   //クローズ
   if (isMenuOpen && !isBusy) {
      //切替
      isBusyCheck();
      //reverseの完了を待たせる
      await menuAnimTL.reverse();
   }
   //オープン
   else if (!isMenuOpen && !isBusy) {
      //切替
      isBusyCheck();
      //共通で発火させる関数
      commonInit(true);
      //クラス付替
      classToggle(true);
      //TL
      menuAnimTL.play();
   }
};
