const sass = require('node-sass');
const tildeImporter = require('node-sass-package-importer');
const fs = require('fs-extra');
const glob = require('glob');
const chalk = require('chalk');
const postcss = require('postcss');
const postcssrc = require('postcss-load-config');
const postcssModules = require('postcss-modules');
const packageJson = require('../package.json')

const env = process.env.NODE_ENV;

// Create compiled reset and utilities output in /dist
const globals = [
  {
    srcPath: './src/css/reset.scss',
    outPath: './dist/reset.css',
    scopeClasses: false,
  },
  {
    srcPath: './src/css/utilities.scss',
    outPath: './dist/utilities.css',
    scopeClasses: false,
  },
];
globals.forEach(buildCss)


function createImport(data) {
  return `@import url('${data.outPath.replace('.', '@rei/cedar')}');`
}

const components = glob.sync('./src/components/**/styles/*.scss')
  .map((path) => {
    const name = path.split('/styles/')[1];
    return {
      srcPath: path,
      outPath: `./dist/style/${name.replace('scss', 'css')}`,
      scopeClasses: true,
    }
  }
);
const utilities = glob.sync('./src/css/utility/*.scss')
  .map((path) => {
    const name = path.split('utility/_')[1];
    return {
      srcPath: path,
      outPath: `./dist/style/${name.replace('scss', 'css')}`,
      scopeClasses: false,
    }
  }
);

const utilsFile = utilities.map(createImport).join('\n');
fs.outputFile('./dist/style/utilities.css', utilsFile, function(err) {
  if (!err) {
    console.log(chalk.green(`success! created utilities.css`));
  }
});
utilities.forEach(buildCss);
//
//
//
// // MAP all these objects to add srcPath, outPath, etc.
//
// const globalOutputs = globals.map((file) => buildCss(file, false));
// const componentOutputs = components.map((file) => buildCss(file, true));
// const outputs = globalOutputs.concat(componentOutputs);
// const outFile = outputs.map(file => `@import url('${file.replace('.', '@rei/cedar')}');`).join('\n');
//
// fs.outputFile('./dist/style/cdr-full.css', outFile, function(err) {
//   if (!err) {
//     console.log(chalk.green(`success! created cdr-full.css`));
//   }
// });


// CREATE big import url of utils

// continue to dump reset + utilities in dist?

// function that just gets a src, out, and scope?

// cedar dist output documentation?


// need to both generate full utilities output, and create a utilities-full.css that imports em.

// first output: dump reset and full compiled utils into dist
// second output: dist/style stuff. One big file importing em all, one big reset file.


// DONE: NEED TO HANDLE UTILITIES USED IN COMPONENTS! make a private class for those?

// const srcPath = scopeClasses ?
//   file :
//   `./src/css/${file}.scss`;
//
// const outPath = scopeClasses ?
//   `./dist/style/${file.split('/')[5].replace('scss', 'css')}` :
//   `./dist/style/${file}.css`;

function buildCss({ srcPath, outPath, scopeClasses }) {
  sass.render({
    file: srcPath,
    outputStyle: 'compressed',
    importer: tildeImporter(),
  }, function(err, result) {
    if (err) {
      console.log(chalk.red('error!', err));
    } else {
      postcssrc().then(({ plugins, options }) => {
        if (scopeClasses) {
          plugins.push(postcssModules({
            generateScopedName: function (name) {
              // scope classes for components
              return `${name}_${packageJson.version}`;
            }
          }))
        }
        postcss(plugins)
        .process(result.css, options)
        .then((result) => {
          fs.outputFile(outPath, result, function(err) {
            if (!err) {
              console.log(chalk.green(`success! created ${outPath}`));
            }
          });
        });
      });
    }
  });

  return outPath;
}
