import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
const lib = require("./package.json");
const outputFileName= 'cp-fetch';
const name= "cpFetch";

const mode= process.env.NODE_ENV;
const src = './lib/index.js';
const srcNative = './lib/native/index.js';

const startYear= 2020;
const year= new Date().getFullYear();
const banner= `// ${lib.name} v${lib.version}\n// Copyright (c) ${year===startYear? startYear : `${startYear}-${year}`} ${lib.author.name} <${lib.author.email}>`;

const config = mode === 'development' ? [
        {
            input: src,
            output: {
                file: `dist/${outputFileName}.js`,
                format: 'cjs',
                name,
                exports: "auto"
            },
            plugins: [
                resolve({browser: true}),
                commonjs()
            ]
        },
    ] :
    [
        {
            input: src,
            output: {
                file: `dist/${outputFileName}.umd.js`,
                format: 'umd',
                name,
                exports: "auto",
                banner
            },
            plugins: [
                resolve({browser: true}),
                commonjs()
            ]
        },
        {
            input: src,
            output: {
                file: `dist/${outputFileName}.umd.min.js`,
                format: 'umd',
                name,
                exports: "auto",
                banner
            },
            plugins: [
                resolve({browser: true}),
                commonjs(),
                terser()
            ]
        },

        {
            input: srcNative,
            output: {
                file: `dist/native/${outputFileName}.umd.js`,
                format: 'umd',
                name,
                exports: "auto",
                banner
            },
            plugins: [
                resolve({browser: true}),
                commonjs()
            ]
        },

        {
            input: srcNative,
            output: {
                file: `dist/native/${outputFileName}.umd.min.js`,
                format: 'umd',
                name,
                exports: "auto",
                banner
            },
            plugins: [
                resolve({browser: true}),
                commonjs(),
                terser()
            ]
        },
    ];


export default config;
