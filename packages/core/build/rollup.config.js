import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'node:path'


export default defineConfig({
    input: './index.ts',
    output: {
        name: 'watchdog',
        file: 'dist/index.js',
        format: 'iife'
    },
    plugins: [typescript(), nodeResolve({
        extensions: ['.js', '.ts']
    })]
})