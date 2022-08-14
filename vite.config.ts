import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "sbs",
  version: "0.0.1",
  content_scripts: [
    // {
    //   matches: ["https://scrapbox.io/*"],
    //   run_at: "document_end",
    //   js: ["src/content.ts"],
    // },
    {
      matches: ["https://only-entry/*"],
      js: ["src/inject.ts"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["src/inject.ts.js"],
      matches: ["<all_urls>"],
    },
  ],
});

export default defineConfig({
  plugins: [crx({ manifest })],
});
