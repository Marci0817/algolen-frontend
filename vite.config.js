import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
    global: {},
    plugins: [sveltekit()],
    ssr: {
        noExternal: ['@algorandfoundation/algokit-utils'],
    },
    optimizeDeps: {
        //For the wallets
        esbuildOptions: {
            // Node.js global to browser globalThis ( to fix global error )
            define: {
                global: 'globalThis',
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
})
