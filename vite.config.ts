import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        // Only run Wayfinder if not in CI/build environment
        ...(process.env.CI || process.env.VERCEL ? [] : [
            wayfinder({
                formVariants: true,
            })
        ]),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            // Use ziggy from node_modules instead of vendor directory
            'ziggy': 'ziggy-js',
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
});
