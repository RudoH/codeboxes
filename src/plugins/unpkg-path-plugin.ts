import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = (): any => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            // ESBuild handling of root entry file 'index.js'
            build.onResolve({ filter: /^index\.js$/ }, () => {
                return { path: 'index.js', namespace: 'a' };
            });

            // ESBuild handling of a relative module
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                if (args.path.includes('./') || args.path.includes('../')) {
                    const newURL = new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/');
                    return {
                        namespace: 'a',
                        path: newURL.href,
                    };
                }
            });

            // ESBuild handling of a 'main' file of a module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `http://unpkg.com/${args.path}`,
                };
            });
        },
    };
};
