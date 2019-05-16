import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import jsonPlugin from 'rollup-plugin-json';
import plugins from './build/rollup-plugins';

plugins.push(
  replace({
    'process.env.NODE_ENV': JSON.stringify(true),
  }),
  jsonPlugin(),
);

if (process.env.ROLLUP_WATCH) {
  plugins.push(
    serve({
      open: false,
      contentBase: 'public',
      port: 3000,
    }),
    livereload(),
  );
}

export default {
  input: 'src/dev.js',
  output: {
    file: 'public/kitchen-sink.iife.js',
    format: 'iife',
    name: 'cedar',
    // sourcemap: true, currently broken with vue plugin and watch -- https://github.com/vuejs/rollup-plugin-vue/issues/238
  },
  plugins,
  // watch: {
  //   clearScreen: false, --> currently broken https://github.com/rollup/rollup/issues/2862
  // },
};
