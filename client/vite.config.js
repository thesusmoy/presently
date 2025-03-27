import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env.IS_PREACT': JSON.stringify('true'),
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://unpkg.com/@excalidraw/excalidraw@0.17.6/dist/excalidraw-assets/Assistant-Medium.woff2',
                changeOrigin: true, // This is necessary to change the origin of the request
                secure: false, // Set to `true` for HTTPS URLs, to ensure SSL is handled correctly
                rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite URL to strip `/api` prefix if needed
            },
        },
    },
});
