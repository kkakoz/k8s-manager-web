import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
		alias: {
			'@': '/src'
		}
	},
  // server: {
	// 	hostname: '0.0.0.0',
	// 	port: 8080,
	// 	proxy: {
	// 		"/api": {
	// 		  target: "http://localhost:9010",
	// 		  changeOrigin: true,
	// 		  rewrite: (path) => path.replace(/^\/api/, ""),
	// 		},
	// 	  },

  //   }
})
