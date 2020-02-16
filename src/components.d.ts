/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface HoneySpeech {
    /**
    * The id of text element to speech
    */
    'textref': string;
  }
}

declare global {


  interface HTMLHoneySpeechElement extends Components.HoneySpeech, HTMLStencilElement {}
  var HTMLHoneySpeechElement: {
    prototype: HTMLHoneySpeechElement;
    new (): HTMLHoneySpeechElement;
  };
  interface HTMLElementTagNameMap {
    'honey-speech': HTMLHoneySpeechElement;
  }
}

declare namespace LocalJSX {
  interface HoneySpeech {
    /**
    * The id of text element to speech
    */
    'textref'?: string;
  }

  interface IntrinsicElements {
    'honey-speech': HoneySpeech;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'honey-speech': LocalJSX.HoneySpeech & JSXBase.HTMLAttributes<HTMLHoneySpeechElement>;
    }
  }
}


