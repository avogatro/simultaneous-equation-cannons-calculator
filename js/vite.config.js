import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404-and-routes',
      closeBundle() {
        const dist = path.resolve(process.cwd(), 'dist');
        const indexFile = path.join(dist, 'index.html');
        
        // Copy 404.html
        fs.copyFileSync(indexFile, path.join(dist, '404.html'));
        
        // Copy to specific route folders to prevent 404 status codes on GitHub pages for SEO
        const routes = ['extra', 'banished', 'help', 'about'];
        routes.forEach(route => {
          const routeDir = path.join(dist, route);
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          fs.copyFileSync(indexFile, path.join(routeDir, 'index.html'));
        });
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/icon.webp', 'img/icon.png', 'img/icon50.png', 'fonts/poppins-regular.woff2', 'fonts/poppins-semibold.woff2'],
      workbox: {
        navigateFallbackDenylist: [/sitemap\.xml$/, /testsitemap\.xml$/, /robots\.txt$/]
      },
      manifest: {
        name: 'Yu-Gi-Oh! SEC Calculator',
        short_name: 'SEC Calculator',
        description: 'Calculator for Simultaneous Equation Cannons',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        icons: [
          {
            src: 'img/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/simultaneous-equation-cannons-calculator/',
})
