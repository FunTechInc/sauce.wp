/*===============================================
生年月日のセレクトボックスを動的に操作する
===============================================*/
export const birthdaySelect = () => {
   let userBirthdayYear = document.getElementById("your-birth-year") as HTMLSelectElement;
   let userBirthdayMonth = document.getElementById("your-birth-month") as HTMLSelectElement;
   let userBirthdayDay = document.getElementById("your-birth-day") as HTMLSelectElement;
   if (!userBirthdayYear) return false;

   /**
    * selectのoptionタグを生成するための関数
    * @param {Element} elem 変更したいselectの要素
    * @param {Number} val 表示される文字と値の数値
    */
   function createOptionForElements(elem:Element, val: number) {
      let option = document.createElement("option");
      option.text = val.toString();
      option.value = val.toString();
      elem.appendChild(option);
   }

   //hidenOptionを生成
   const hiddenOptionYear = "<option selected hidden>年</option>";
   const hiddenOptionMonth = "<option selected hidden>月</option>";
   const hiddenOptionDay = "<option selected hidden>日</option>";

   //初期の要素を削除
   userBirthdayYear.innerHTML = "";
   userBirthdayMonth.innerHTML = "";
   userBirthdayDay.innerHTML = "";

   //hiddenOptionを追加
   userBirthdayYear.insertAdjacentHTML("afterbegin", hiddenOptionYear);
   userBirthdayMonth.insertAdjacentHTML("afterbegin", hiddenOptionMonth);
   userBirthdayDay.insertAdjacentHTML("afterbegin", hiddenOptionDay);

   //最新年の取得
   let latestYear = new Date().getFullYear();
   let oldestYear = latestYear - 100;

   //年の生成
   for (let i = oldestYear; i <= latestYear; i++) {
      createOptionForElements(userBirthdayYear, i);
   }
   //月の生成
   for (let i = 1; i <= 12; i++) {
      createOptionForElements(userBirthdayMonth, i);
   }
   //日の生成
   for (let i = 1; i <= 31; i++) {
      createOptionForElements(userBirthdayDay, i);
   }

   /**
    * 日付を変更する関数
    */
   function changeTheDay() {
      //日付の要素を削除
      userBirthdayDay.innerHTML = "";
      //hiddenOptionを追加
      userBirthdayDay.insertAdjacentHTML("afterbegin", hiddenOptionDay);

      //選択された年月の最終日を計算
      let lastDayOfTheMonth = new Date(
         userBirthdayYear.value as any,
         userBirthdayMonth.value as any,
         0
      ).getDate();

      //選択された年月の日付を生成
      for (let i = 1; i <= lastDayOfTheMonth; i++) {
         createOptionForElements(userBirthdayDay, i);
      }
   }

   userBirthdayYear.addEventListener("change", function () {
      changeTheDay();
   });

   userBirthdayMonth.addEventListener("change", function () {
      changeTheDay();
   });
};

/*===============================================
file input
===============================================*/
export const fileInput = () => {
   const fileInputWrapper = [
      ...document.getElementsByClassName("js_fileInput"),
   ];
   if (fileInputWrapper.length) {
      fileInputWrapper.forEach((element) => {
         const btn = element.querySelector("button");
         const input = element.querySelector("input[type=file]") as HTMLInputElement;
         const fileTxt = element.getElementsByClassName(
            "js_fileInput_FileName"
         )[0] as HTMLInputElement;
         btn?.addEventListener("click", () => {
            input?.click();
            return false;
         });
         input?.addEventListener("change", () => {
            if (!input.files) return false;
            const fileName = input.files[0];
            fileTxt.innerText = `${fileName.name}`;
            fileTxt.classList.add("is_fileset");
            return false;
         });
      });
   }
};

/*===============================================
フォームのプライバシーポリシーチェック
===============================================*/
export const privacyCheck = () => {
   const submitBool = document.getElementById("is_ppCheck");
   if (submitBool) {
      const submitBtn = document.getElementById("js_submit_btn");

      const checkBox = document.getElementsByClassName("js_ppCheck_label")[0];

      const privacyCheckBtn = document.getElementById("js_ppCheckBtn");

      
      submitBtn?.setAttribute("disabled", "disabled");

      privacyCheckBtn?.addEventListener("click", () => {
         if (submitBool.getAttribute("checked") === "checked") {
            submitBool.removeAttribute("checked");
            submitBtn?.setAttribute("disabled", "disabled");
            checkBox.classList.remove("is_checked");
         } else {
            submitBool.setAttribute("checked", "checked");
            submitBtn?.removeAttribute("disabled");
            checkBox.classList.add("is_checked");
         }
      });
   }
};
