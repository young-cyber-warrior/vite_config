import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'MathOperations',
            fileName: 'mathOperations',
        },
    },
    plugins: [
        dts({
            include: ['src/**/*.ts'],
        }),
    ],
});
