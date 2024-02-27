const WP_TEMPLATE_NAME = 'templatename';

import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";
import checker from "vite-plugin-checker";

const { resolve } = require("path");

// https://vitejs.dev/config
export default defineConfig({
   plugins: [      
      liveReload(__dirname + "/**/*.php"),
      checker({
         typescript: true,
      }),
   ],

   // config
   root: __dirname,
   base: process.env.NODE_ENV === "development" ? "/" : "/dist/",   
   publicDir: `./wp/themes/${WP_TEMPLATE_NAME}`,

   build: {      
      outDir: resolve(__dirname, `./dist/${WP_TEMPLATE_NAME}`),
      emptyOutDir: true,      
      manifest: true,
      // target: "es2018",
      rollupOptions: {
         input: {
            main: resolve(__dirname + "/main.js"),
         },
         output: {
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name].js`,            
            assetFileNames: 'assets/[name].[ext]'
         }         
      },      
      // minify: true,
      write: true,
   },

   server: {      
      cors: true,
      strictPort: true,
      port: 3000,      
      https: false,
      hmr: {
         host: "localhost",
         //port: 443
      },
   },
});
