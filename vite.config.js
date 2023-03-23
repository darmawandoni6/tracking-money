import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico'],
      manifest: {
        theme_color: '#03a651',
        background_color: '#03a651',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        name: 'Tracking Money',
        short_name: 'Tracking Money',
        description: 'Aplikasi pelacak keuangan',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        sourcemap: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@icons': path.resolve('src/constants/icons'),
      '@components': path.resolve('src/components'),
      '@constants': path.resolve('src/constants'),
      '@helpers': path.resolve('src/helpers'),
      '@store': path.resolve('src/store'),
      '@views': path.resolve('src/views'),
    },
  },
})
