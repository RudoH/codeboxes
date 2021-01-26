import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache',
});

export const fetchPlugin = (inputCode: string): any => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            // loading of index file
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return { loader: 'jsx', contents: inputCode };
            });

            // run on every request to check if cache contains result
            // if not in cache - fall through to next onLoad
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // if request is in cache - return immediately
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) return cachedResult;
            });

            // loading of any css files
            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                /*
                / ESBuild can't output CSS files in the browser - so we 'inject' the CSS into a JS
                / file to be read if the filetype is a .css file. This requires escaping the chars
                / that would prematurely terminate the string.
                */
                const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
                const contents = `
                    const style = document.createElement('style');
                    stlye.innerText = '${escaped}';
                    document.head.appendChild(style);`;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname,
                };

                // add to cache before returning
                await fileCache.setItem(args.path, result);
                return result;
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname,
                };

                // add to cache before returning
                await fileCache.setItem(args.path, result);
                return result;
            });
        },
    };
};
