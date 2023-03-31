import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'   // 使用后可以不手动引入ref reactive onMounted这些api
import Components from 'unplugin-vue-components/vite' // 无需自己引入组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // 可以不需要手动引入组件，能够让开发者就像全局组件那样进行开发，但实际上又是按需引入，且不限制打包工具，不需要使用 babel
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
            imports: [
                'vue',
                'vue-router',
                'pinia',
                {
                    '@vueuse/core': [
                      // named imports
                      'useMouse', // import { useMouse } from '@vueuse/core',
                      // alias
                      ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
                  ],
                  axios: [
                      // default imports
                      ['default', 'axios'] // import { default as axios } from 'axios',
                  ]
              }
            ], //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
            eslintrc: {
                enabled: true
            }
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/element.scss" as *;`
            }
        }
    },
    base: './',
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        target: 'es2015',
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    }
})