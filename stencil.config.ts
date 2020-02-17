import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'honey-speech-component',
  buildDist: true,
  bundles: [{ components: ['honey-speech'] }],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    }
  ]
};
//
// {
//   type: 'www',
//     serviceWorker: null // disable service workers
// }
