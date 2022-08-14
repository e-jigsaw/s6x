import * as esbuild from "esbuild";

esbuild.build({
  entryPoints: ["dist/out.js"],
  outfile: "dist/out.min.js",
  bundle: true,
  minify: true,
}).then(() => Deno.exit());
