import path from "path"
import { fileURLToPath } from "url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/cheshire/",
  plugins: [react()],
  assetsInclude: [
    '**/*.glb',
    '**/*.jpg',
    '**/*.png',
    '**/*.mp4',
    '**/*.hdr',
    // '**/*.json',
    '**/*.stl'
  ],
  resolve: {
    alias: {
      "@/": resolve(__dirname, "./src"),
    }
  },
})