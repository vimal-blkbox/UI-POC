const { mergeConfig } = require('vite');
const { resolve } = require('path');
const viteSvgr = require('vite-plugin-svgr');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {
        alias: {
          '@': resolve(__dirname, '..', 'src'),
          common: resolve(__dirname, '..', 'src/common'),
          assets: resolve(__dirname, '..', 'src/assets'),
        },
      },
      plugins: [
        viteSvgr({
          exportAsDefault: true,
        }),
      ],
    });
  },
};
