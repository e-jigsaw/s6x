import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "sbs",
  version: "0.0.1",
  content_scripts: [
    {
      matches: ["https://dummy/*"],
      js: ["src/inject.ts"],
    },
  ],
});

export default defineConfig({
  plugins: [crx({ manifest })],
});
