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
            format: 'iife'
        },
        // {
        //     name: 'watchdog',
        //     dir: 'dist',
        //     format: 'cjs'
        // },
        // {
        //     name: 'watchdog',
        //     dir: 'dist',
        //     format: 'es'
        // }
    ],
    plugins: [
        nodeResolve({
            
        }),
        commonjs(),
        typescript()
    ]
})