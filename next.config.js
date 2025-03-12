module.exports = {
    reactStrictMode: true,
    trailingSlash: true,

    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.mdx/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                },
            ],
        });

        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};