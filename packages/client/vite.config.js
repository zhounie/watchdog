import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import UnoCss from 'unocss/vite'
import WatchDog from '@watchdog/vite'

export default defineConfig(() => {
    return {
        plugins: [vue(), UnoCss(), WatchDog()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        server: {
            port: 4001,
            proxy: {
                '/api': {
                    target:  "http://localhost:3000",
                    rewrite: (path) => path.replace(/^\/api/, '/'),
                    changeOrigin: true
                }
            }
        }
    }
})