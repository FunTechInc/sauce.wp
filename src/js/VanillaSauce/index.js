import barba from "@barba/core";
import barbaPrefetch from "@barba/prefetch";
// ページ内リンク
import { smoothScroll } from "../../ts/common/smoothScroll";
//交差で発火するアニメーション
import { intersectionAnimation } from "../../ts/animation/intersectionAnimation";
//ハンバーガー
import { smMenuToggle, hamburgerBtn } from "../../ts/header/smMenuToggle";
//contactForm7対応
import { thanksTransition } from "../pageTrans/thanksTransition";
//スクロールトリガーの削除
import { allTriggerKill } from "../pageTrans/allTriggerKill";
//ヘッドタグの差し替え
import { replaceHeadTags } from "../pageTrans/replaceHeadTags";
//現在地のaタグを無効化する
import { noLinkFunc } from "../pageTrans/noLinkFunc";
//デフォルトのスクロール位置の記憶を無効化する
import { scrollRestorationKill } from "../pageTrans/scrollRestorationKill";
//スクロール位置を記憶する
import {
   memoryPopstatePos,
   pushPopstatePos,
} from "../pageTrans/memoryPopstatePos";
//ページ遷移アニメーション
import { pageLeaveAnim, pageEnterAnim } from "../pageTrans/pageTransAnim";
import { pageTransTimer } from "../pageTrans/pageTransLoader";
//画面サイズのCSS変数
import { setSize } from "../../ts/common/setSize";
//360px以下は等倍で縮小
import { switchViewport } from "../../ts/common/switchViewport";
//rootにロード判定
import { rootLoadJudge } from "../../ts/common/rootLoadJudge";
//タッチデバイスでダブルタップ禁止
import { doubletapNone } from "../../ts/common/doubletapNone";
//タッチデバイスでホバー無効
import { touchHoverNone } from "../../ts/common/touchHoverNone";
//改行（budoux）
import { lineBreakBudou } from "../../ts/common/lineBreak";
//URLに#があるときheader高をoffset
import { hashHeaderOffset } from "../../ts/common/hashHeaderOffset";
//sticky判定
import { stickyItem } from "../../ts/common/stickyItem";
//慣性スクロール
import {
   inertiaScrollInit,
   inertiaScrollContent,
} from "../../ts/common/inertiaScroll";
inertiaScrollInit(true);

/*===============================================
初回読み込みにだけ発火させる関数
===============================================*/
const onceCallback = () => {
   setSize();
   addEventListener("resize", switchViewport, false);
   switchViewport();
   rootLoadJudge();
   doubletapNone();
   touchHoverNone();
   lineBreakBudou();   
   hashHeaderOffset();
   noLinkFunc();
   thanksTransition();
   hamburgerBtn.addEventListener("click", () => {
      smMenuToggle();
   });
};

/*===============================================
初回も含めて毎回initさせる関数
===============================================*/
const everyCallback = () => {
   intersectionAnimation();
   smoothScroll(true);
   inertiaScrollContent();
   stickyItem();
   // preventLinkWhenScrolling(); //pagetransが短い場合等にlenisと干渉して遷移後のスクロール位置がズレることがあるのでその防止
};

/*===============================================
ページ遷移前に毎回initさせる関数（リスナーの削除系）
===============================================*/
const beforeCallback = (data) => {
   document.documentElement.classList.add("is_transition");
   smoothScroll(false);
   scrollRestorationKill();
   memoryPopstatePos(data.trigger);
};

/*===============================================
leaveアニメーション後
===============================================*/
const afterLeaveCallback = () => {
   //leave animatinが終了してからscrolltriggerをkillする
   allTriggerKill();
};

/*===============================================
ページ遷移後に毎回initさせる関数
===============================================*/
const afterCallback = () => {
   document.documentElement.classList.remove("is_transition");
};

/*===============================================
VanillaSauce
===============================================*/
export class VanillaSauce {
   constructor(views) {
      this.onceCustomCallback = false;
      this.everyCustomCallback = false;
      this.beforeCustomCallback = false;
      this.afterLeaveCustomCallback = false;
      this.afterCustomCallback = false;
      this.beforeEnterCustomCallback = false;
      this.enterCustomCallback = false;
      this.viewsCustomCallback = views;
   }
   init() {
      const onceCustomCallback = this.onceCustomCallback;
      const everyCustomCallback = this.everyCustomCallback;
      const beforeCustomCallback = this.beforeCustomCallback;
      const afterCustomCallback = this.afterCustomCallback;
      const afterLeaveCustomCallback = this.afterLeaveCustomCallback;
      const beforeEnterCustomCallback = this.beforeEnterCustomCallback;
      const enterCustomCallback = this.enterCustomCallback;
      const viewsCustomCallback = this.viewsCustomCallback;

      // Googleアナリティクスに情報を送る
      // barba.hooks.after(() => {
      //    ga('set', 'page', window.location.pathname);
      //    ga('send', 'pageview');
      // });

      //ブラウザバックを検知
      let ispopstate = false;
      window.addEventListener("popstate", () => {
         ispopstate = true;
      });

      // prefetch
      barba.use(barbaPrefetch);

      /********************
		barba 初期化
		********************/
      barba.init({
         debug: false,
         //以下のクラスを持ったリンクは非同期遷移させない
         prevent: ({ el }) => el.classList && el.classList.contains("nobarba"),
         //遷移中に次の処理が走らないようにpreventする
         preventRunning: true,
         //10秒以上読み込みに時間がかかるとエラーを返す
         timeout: 10000,
         sync: false,
         transitions: [
            {
               //ブラウザの初回ロード
               once() {
                  onceCustomCallback && onceCustomCallback();
                  everyCustomCallback && everyCustomCallback();
                  onceCallback();
                  everyCallback();
               },
               beforeLeave(data) {
                  beforeCustomCallback && beforeCustomCallback();
                  beforeCallback(data);
               },
               //leaveとenterアニメーションを同期させる
               async leave(data) {
                  let ease = "in";
                  if (document.body.classList.contains("is_smMenu_open")) {
                     //TLのreverseCompleteでresolveが帰ってくる
                     await smMenuToggle();
                     ease = "out";
                     //1秒以上の場合にローダー出現
                     pageTransTimer(true);
                  } else {
                     //メニューがない場合はすぐに発火
                     pageTransTimer(true);
                  }
                  await pageLeaveAnim({ ease: ease });
                  //leave animation終了後のコールバック
                  afterLeaveCallback();
                  afterLeaveCustomCallback && afterLeaveCustomCallback();
               },
               beforeEnter({ next }) {
                  replaceHeadTags(next);
                  beforeEnterCustomCallback && beforeEnterCustomCallback(next);
               },
               enter(data) {
                  enterCustomCallback && enterCustomCallback();
                  pageTransTimer(false);
                  //記憶させた位置を呼び出して、enterAnimationに渡す
                  pageEnterAnim({
                     ispopstate: ispopstate,
                     pos: pushPopstatePos(data.trigger),
                  });
                  //popstate判定をfalseに戻す
                  ispopstate = false;
               },
               after() {
                  afterCustomCallback && afterCustomCallback();
                  everyCustomCallback && everyCustomCallback();
                  everyCallback();
                  afterCallback();
               },
            },
         ],

         /********************
			ページ毎の制御
			********************/
         views: viewsCustomCallback,
      });
   }
   on(hook, event) {
      switch (hook) {
         case "once":
            this.onceCustomCallback = event;
            break;
         case "every":
            this.everyCustomCallback = event;
            break;
         case "before":
            this.beforeCustomCallback = event;
            break;
         case "afterLeave":
            this.afterLeaveCustomCallback = event;
            break;
         case "beforeEnter":
            this.beforeEnterCustomCallback = event;
            break;
         case "enter":
            this.enterCustomCallback = event;
            break;
         case "after":
            this.afterCustomCallback = event;
            break;
         default:
            break;
      }
   }
}
