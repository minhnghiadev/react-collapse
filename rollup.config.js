import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';
import sizes from './rollup-plugins/sizes-plugin';

//const input = 'components/Collapse/Collapse.jsx'; // React 16.3+
const input = 'components/Collapse/Collapse.hooks.jsx'; // React 16.8+
const name = 'Collapse';

let includePathOptions = {
  include: {},
  paths: ['./', 'src'],
  external: [],
  extensions: ['.js', '.jsx', '.css', '.scss', '.json', '.html'],
};

export default {
  external: ['react', 'react-dom'],

  input,

  output: [
    1 && {
      file: pkg.main,
      format: 'umd',
      name: name,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    0 && {
      file: pkg.cjs,
      format: 'cjs',
      sourcemap: true,
    },
    0 && {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    0 && {
      file: pkg.iife,
      format: 'iife',
      name: name,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ].filter(Boolean),
  plugins: [
    includePaths(includePathOptions),
    //scss(),
    postcss({
      extract: true,
      plugins: [],
      minimize: true,
      //sourceMap: 'inline',
    }),
    external({
      includeDependencies: false,
    }),
    url(),
    svgr(),
    resolve(),
    babel({
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        //'@babel/plugin-proposal-optional-chaining',
        //'@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        //'transform-react-remove-prop-types',
      ],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser({
      compress: { drop_console: true },
    }),
    sizes({
      getSize: (size, gzip) => {
        console.log('minified', size);
        console.log('gzip minified', gzip);
      },
    }),
  ],
};
