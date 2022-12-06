import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    hose:"0.0.0.0"
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
