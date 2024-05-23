import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';

/** Ensure same logic can run, even if a root package
 * (that has no dependencies or peerDependencies) */
const { name, dependencies, peerDependencies } = packageJson

/** Treat anything in same scope as being
 * explicit external dep (don't bundle) */
const external = Object.keys({
    ...dependencies,
    ...peerDependencies,
});

export default defineConfig({
    build: {
        emptyOutDir: false,
        target: 'node14',
        //minify: true,
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            formats: ['es', 'cjs'],
            name: 'request',
            fileName: 'index',
        },
        rollupOptions: {
            external
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
