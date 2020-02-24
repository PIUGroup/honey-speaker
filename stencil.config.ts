import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'honey-speech',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'docs-json',
      file: 'src/components/honey-speech/custom-elements.json'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
      // copy: [
      //   { src: "../docs/index.html", dest: "index.html" }
      // ]
    }
  ]
};
