import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    federation({
      name: "Microfrontend-concept-shell",
      remotes: {
        mfConceptRemoteAppTest:
          "http://staging.smandes.gov.ar/parcelTest/assets/remoteEntry.js",
        // "https://microfront-parcel-test.netlify.app/assets/remoteEntry.js",
        // "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],

  // server: {
  //   cors: {
  //     origin: "*",
  //     allowedHeaders: "Access-Control-Allow-Origin",
  //   },
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // },

  // preview: {
  //   cors: false,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Headers": "*",
  //   },
  // },

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
