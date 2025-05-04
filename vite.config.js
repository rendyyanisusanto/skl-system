import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // agar bisa diakses dari IP LAN
    port: 5522         // port yang kamu inginkan
  }
})