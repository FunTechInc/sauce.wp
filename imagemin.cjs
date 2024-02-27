const imagemin = require("imagemin-keep-folder");
const imageminPngquant = require("imagemin-pngquant");
const imageminWebp = require("imagemin-webp");
const imageminSvgo = require("imagemin-svgo");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminGifsicle = require("imagemin-gifsicle");
const fs = require("fs");

const srcDir = "./assets/images/**/*.{jpg,jpeg,png,gif,svg}";
const outDir = "./dist/assets/min-images/**/*";
const outDirPath = "./dist/assets/min-images/";
if (!fs.existsSync(outDirPath)) {
   fs.mkdirSync(outDirPath);
}
const convertWebp = (targetPath) => {
   imagemin([targetPath + ".{jpg,jpeg,png}"], {
      destination: targetPath + ".{jpg,jpeg,png}",
      plugins: [imageminWebp({ quality: 85, method: 6 })],
   });
};

imagemin([srcDir], {
   plugins: [
      imageminMozjpeg({ quality: "85", progressive: true }),
      imageminPngquant({ quality: [0.3, 0.5] }),
      imageminGifsicle({
         interlaced: false,
         optimizationLevel: 10,
         colors: 256,
      }),
      imageminSvgo(),
   ],
   replaceOutputDir: (output) => {
      return output.replace(/images\//, "../dist/assets/min-images/");
   },
}).then(() => {
   convertWebp(outDir);
});
