import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm", "cjs"],
  target: "node22",
  splitting: false,
  clean: true,
  dts: false,
  sourcemap: true, // Genera archivos .map para debugging
  minify: true,
  shims: true, // Compatibilidad automática para __dirname, import.meta.url, etc.
  outDir: "dist",
  skipNodeModulesBundle: true,
  esbuildOptions(options) {
    options.platform = "node";
  },
});
