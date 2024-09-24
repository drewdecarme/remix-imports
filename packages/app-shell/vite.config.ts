import { defineConfig } from "vite";
import path from "node:path"
import { vitePlugin as remix } from "@remix-run/dev"
import { cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from "@remix-run/dev"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import mdx from "@mdx-js/rollup"

const publicDirPath = path.resolve(
  import.meta.dirname,
  "../.store/docs/_public"
)
const buildDir = path.resolve(import.meta.dirname, "../../.store/docs/dist")


const indexRoute = path.resolve(
  import.meta.dirname,
  "../../.store/docs/_index.mdx"
)

export default defineConfig({
  publicDir: publicDirPath,
  build: {
    manifest: true,
    emptyOutDir: true
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]
    }),
    remixCloudflareDevProxy(),
    remix({
      buildDirectory: buildDir,
      manifest: true,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", indexRoute, {
            index: true
          })
        })
      }
    })
  ]
});
