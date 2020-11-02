import {Config} from '@stencil/core';

export const config: Config = {
  namespace: 'honey-speech',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
      strict: true,
      footer: '*Built with [StencilJS](https://stenciljs.com/)* by Huluvu424242'
    },
    {
      type: 'docs-json',
      file: 'src/components/custom-elements.json'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};


