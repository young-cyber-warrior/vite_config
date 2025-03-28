import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { removeConsoleLog } from './plugin';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        AutoImport({
            imports: ['react'],
            dirs: [path.resolve('src/app/**')],
            eslintrc: {
                enabled: true,
            },
            defaultExportByFilename: true,
        }),
        removeConsoleLog(),
    ],
    resolve: {
        alias: {
            '~': path.resolve('src'),
            '@global_types': path.resolve('src/types'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~/styles/globals.scss" as *;\n`,
            },
        },
    },

    build: {
        assetsDir: '',
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('@mui')) {
                            return 'mui';
                        }

                        if (id.includes('react')) {
                            return 'vendor';
                        }

                        if (id.includes('@biven_mira')) {
                            return 'custom_dependencies';
                        }

                        return 'dependencies';
                    }
                },
            },
        },
    },
});
