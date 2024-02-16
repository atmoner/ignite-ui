const Path = require('path');
const vuePlugin = require('@vitejs/plugin-vue')

const { defineConfig } = require('vite');
import { fileURLToPath, URL } from 'node:url'

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
    root: Path.join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [vuePlugin()],
    pluginOptions: {
        electronBuilder: { 
        preload: 'src/main/preload.js'
        }
    },
    resolve: {
        fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false,
        } 
  },
});

module.exports = config;
