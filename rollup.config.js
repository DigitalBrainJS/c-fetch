import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
const lib = require("./package.json");
const outputFileName= 'c-fetch';
const name= "CFetch";

const mode= process.env.NODE_ENV;
const input = './lib/index.js';

const startYear= 2020;
const year= new Date().getFullYear();
const banner= `// ${lib.name} v${lib.version}\n// Copyright (c) ${year===startYear? startYear : `${startYear}-${year}`} ${lib.author.name} <${lib.author.email}>`;

const config = mode === 'development' ? [
        {
            input,
            output: {
                file: `dist/${outputFileName}.js`,
                format: 'cjs',
                name,
                exports: "auto"
            },
            plugins: [
                resolve(),
                commonjs()
            ]
        },
    ] :
    [
        {
            input,
            output: {
                file: `dist/${outputFileName}.umd.js`,
                format: 'umd',
                name,
                exports: "auto",
                banner
            },
            plugins: [
                resolve(),
                commonjs()
            ]
        },
        {
            input,
            output: {
                file: `dist/${outputFileName}.umd.min.js`,
                format: 'umd',
                name,
                exports: "auto",
                banner
            },
            plugins: [
                resolve(),
                commonjs(),
                terser()
            ]
        }
    ];


export default config;
