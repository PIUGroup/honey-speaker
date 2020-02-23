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
    * alt text for a11y default: "Symbol eines sprechenden Lautsprechers"
    */
    'alttext': string;
    /**
    * An JSON Object with i18n text values separeted by language idents:  { "deDE" : { "error": "Fehler}, "en" : { "error" : "Error"}}
    */
    'i18n': object;
    /**
    * iconbackground color
    */
    'iconbackground': string;
    /**
    * icon height, default: 36
    * @param iconheight
    * @default 36
    */
    'iconheight': string;
    /**
    * icon source url default: intern url "./assets/img/Speaker_Icon.svg"
    */
    'iconsrc': string;
    /**
    * icon width default: 36
    */
    'iconwidth': string;
    /**
    * identifier prefix for input element default: "honey-speech1"
    */
    'ident': string;
    /**
    * i18n language ident: deDE or en or de ...
    */
    'langid': string;
    /**
    * An comma separated list  with ids of DOM elements which inner text should be speech.
    */
    'textids': string;
    /**
    * title text for a11y default: Vorlesen
    */
    'titletext': string;
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
    * alt text for a11y default: "Symbol eines sprechenden Lautsprechers"
    */
    'alttext'?: string;
    /**
    * An JSON Object with i18n text values separeted by language idents:  { "deDE" : { "error": "Fehler}, "en" : { "error" : "Error"}}
    */
    'i18n'?: object;
    /**
    * iconbackground color
    */
    'iconbackground'?: string;
    /**
    * icon height, default: 36
    * @param iconheight
    * @default 36
    */
    'iconheight'?: string;
    /**
    * icon source url default: intern url "./assets/img/Speaker_Icon.svg"
    */
    'iconsrc'?: string;
    /**
    * icon width default: 36
    */
    'iconwidth'?: string;
    /**
    * identifier prefix for input element default: "honey-speech1"
    */
    'ident'?: string;
    /**
    * i18n language ident: deDE or en or de ...
    */
    'langid'?: string;
    /**
    * Fired if the voice has failed to speak.
    */
    'onSpeakerFailed'?: (event: CustomEvent<any>) => void;
    /**
    * Fired if the voice has finished with speaking.
    */
    'onSpeakerFinished'?: (event: CustomEvent<any>) => void;
    /**
    * Fired if the voice is paused with speaking.
    */
    'onSpeakerPaused'?: (event: CustomEvent<any>) => void;
    /**
    * Fired if the voice is speaking.
    */
    'onSpeakerStarted'?: (event: CustomEvent<any>) => void;
    /**
    * An comma separated list  with ids of DOM elements which inner text should be speech.
    */
    'textids': string;
    /**
    * title text for a11y default: Vorlesen
    */
    'titletext'?: string;
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


