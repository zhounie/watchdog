import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'


export default defineConfig({
    input: './index.ts',
    output: [
        {
            name: 'watchdog',
            dir: 'dist',
            format: 'iife',
            entryFileNames: '[name].[format].js'
        },
        {
            name: 'watchdog',
            dir: 'dist',
            format: 'cjs',
            entryFileNames: '[name].[format].js'
        },
        {
            name: 'watchdog',
            dir: 'dist',
            format: 'es',
            entryFileNames: '[name].[format].js'
        }
    ],
    plugins: [
        nodeResolve({
            
        }),
        commonjs(),
        typescript()
    ]
})