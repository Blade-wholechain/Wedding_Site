import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// CI sets VITE_BASE_PATH from repo variable PAGESASSETBASE (see .github/workflows/pages.yml).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const photoUpload = env.PhotoUpload ?? process.env.PhotoUpload ?? "";

  return {
    base: process.env.VITE_BASE_PATH ?? "/",
    define: {
      "import.meta.env.PhotoUpload": JSON.stringify(photoUpload),
    },
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
