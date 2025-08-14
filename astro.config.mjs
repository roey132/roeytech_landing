// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static", // static build output
  vite: { plugins: [tailwindcss()] },
});
