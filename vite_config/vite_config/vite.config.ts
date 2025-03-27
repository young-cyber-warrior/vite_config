import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { removeConsoleLog } from './plugin';

const rootDir = path.resolve(__dirname, '../');

// https://vite.dev/config/
export default defineConfig({
    root: rootDir,
    plugins: [
        react(),
        AutoImport({
            imports: ['react'],
            dirs: [path.resolve(rootDir, 'src/app/**')],
            eslintrc: {
                enabled: true,
            },
            defaultExportByFilename: true,
        }),
        removeConsoleLog(),
    ],
    resolve: {
        alias: {
            '~': path.resolve(rootDir, 'src'),
            '@global_types': path.resolve(rootDir, 'src/types'),
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
