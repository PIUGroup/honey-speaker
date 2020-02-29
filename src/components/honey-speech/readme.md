# honey-speech

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute     | Description                                                                                                                                       | Type     | Default     |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `alttext`              | `alttext`     | alt text for a11y default: "Symbol eines sprechenden Lautsprechers"                                                                               | `string` | `undefined` |
| `audiolang`            | `audiolang`   | i18n language ident for Web Speech API: de-DE or en or de ...                                                                                     | `string` | `undefined` |
| `audiopitch`           | `audiopitch`  | pitch for Web Speech API: default: 1                                                                                                              | `number` | `undefined` |
| `audiorate`            | `audiorate`   | rate for Web Speech API: default 1                                                                                                                | `number` | `undefined` |
| `audiovolume`          | `audiovolume` | volume for Web Speech API: default 1                                                                                                              | `number` | `undefined` |
| `i18n`                 | --            | An JSON Object with i18n text values separeted by language idents: currently unused  { "deDE" : { "error": "Fehler}, "en" : { "error" : "Error"}} | `object` | `undefined` |
| `iconheight`           | `iconheight`  | icon height, default: 36                                                                                                                          | `string` | `undefined` |
| `iconwidth`            | `iconwidth`   | icon width default: 36                                                                                                                            | `string` | `undefined` |
| `textids` _(required)_ | `textids`     | An comma separated list  with ids of DOM elements which inner text should be speech.                                                              | `string` | `undefined` |
| `titletext`            | `titletext`   | title text for a11y = tooltip default: Vorlesen                                                                                                   | `string` | `undefined` |
| `voicename`            | `voicename`   | voice name used of Web Speech API: default undefined                                                                                              | `string` | `undefined` |


## Events

| Event             | Description                                     | Type               |
| ----------------- | ----------------------------------------------- | ------------------ |
| `speakerFailed`   | Fired if the stimme has failed to speak.        | `CustomEvent<any>` |
| `speakerFinished` | Fired if the stimme has finished with speaking. | `CustomEvent<any>` |
| `speakerPaused`   | Fired if the stimme is paused with speaking.    | `CustomEvent<any>` |
| `speakerStarted`  | Fired if the stimme is speaking.                | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
