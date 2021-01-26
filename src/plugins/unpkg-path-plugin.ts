import * as esbuild from 'esbuild-wasm';
import axios from 'axios'
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          const newURL = new URL(args.path, args.importer + '/')
          console.log(args.path, args.importer + '/', newURL.href)
          return {
            namespace: 'a',
            path: newURL.href
          }
        }

        return {
          namespace: 'a',
          path: `http://unpkg.com/${args.path}`
        }
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
          };
        };

        const { data } = await axios.get(args.path);
        console.log(data)
        return {
          loader: 'jsx',
          contents: data
        }
      });
    },
  };
};