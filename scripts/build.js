import path from "node:path"

import { viteBuild } from "@remix-run/dev/dist/cli/commands.js";

async function build() {
  try {
    const appRootDir = path.resolve(import.meta.dirname, "../packages/app-shell");
    const appViteConfigFilePath = path.resolve(appRootDir, "./vite.config.ts");

    console.log({ appRootDir, appViteConfigFilePath })

    process.env.REMIX_ROOT = appRootDir;

    await viteBuild(appRootDir, {
      emptyOutDir: true,
      clearScreen: false,
      config: appViteConfigFilePath,
      mode: "production",
      logLevel: "info"
    })
  } catch (error) {
    throw new Error(error)
  }
}

build()
