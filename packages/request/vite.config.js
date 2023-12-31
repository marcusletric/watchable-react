import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';

export default defineConfig({
    build: {
        emptyOutDir: false,
        target: 'node14',
        minify: true,
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            formats: ['es', 'cjs'],
            name: 'request',
            fileName: 'index',
        },
        rollupOptions: {
            external: Object.keys(packageJson.peerDependencies),
        },
    },
    test: {
        reporters: ['verbose'],
        environment: "jsdom",
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'lcov']
        }
    },
});
