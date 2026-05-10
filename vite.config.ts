import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/** Vite `base` for GitHub Pages project sites must be `/<repo>/`, not `/`. */
function resolveBase(envFile: Record<string, string>): string {
  const raw = process.env.VITE_BASE_PATH ?? envFile.VITE_BASE_PATH;
  if (raw !== undefined && String(raw).trim() !== "") {
    let b = String(raw).trim();
    if (b === "/") return "/";
    if (!b.startsWith("/")) b = `/${b}`;
    if (!b.endsWith("/")) b = `${b}/`;
    return b;
  }
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (repo) return `/${repo}/`;
  return "/";
}

// https://vitejs.dev/config/
// CI: optional repo variable PAGESASSETBASE overrides base (e.g. "/" for custom domain).
// On GitHub Actions, `GITHUB_REPOSITORY` infers `/<repo>/` when VITE_BASE_PATH is unset.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const photoUpload = env.PhotoUpload ?? process.env.PhotoUpload ?? "";
  const renderUrl = env.RenderURL ?? process.env.RenderURL ?? "";
  const base = resolveBase(env);

  return {
    base,
    define: {
      "import.meta.env.PhotoUpload": JSON.stringify(photoUpload),
      "import.meta.env.RenderURL": JSON.stringify(renderUrl),
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
