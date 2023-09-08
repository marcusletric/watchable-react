import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';

export default defineConfig({
    build: {
        emptyOutDir: false,
        target: 'node14',
        minify: true,
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            formats: ['es', 'cjs'],
            name: 'store-hooks',
            fileName: 'store-hooks',
        },
        rollupOptions: {
            external: Object.keys(packageJson.dependencies),
        },
    },
    test: {
        reporters: ['verbose'],
        environment: "jsdom",
        chaiConfig: {
            truncateThreshold: 100,
        },
    },
});
