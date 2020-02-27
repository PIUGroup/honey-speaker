# honey-speech

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute        | Description                                                                                                                      | Type     | Default     |
| ---------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `alttext`              | `alttext`        | alt text for a11y default: "Symbol eines sprechenden Lautsprechers"                                                              | `string` | `undefined` |
| `i18n`                 | --               | An JSON Object with i18n text values separeted by language idents:  { "deDE" : { "error": "Fehler}, "en" : { "error" : "Error"}} | `object` | `undefined` |
| `iconbackground`       | `iconbackground` | iconbackground color                                                                                                             | `string` | `undefined` |
| `iconheight`           | `iconheight`     | icon height, default: 36                                                                                                         | `string` | `undefined` |
| `iconwidth`            | `iconwidth`      | icon width default: 36                                                                                                           | `string` | `undefined` |
| `ident`                | `ident`          | identifier prefix for input element default: "honey-speech1"                                                                     | `string` | `undefined` |
| `langid`               | `langid`         | i18n language ident: deDE or en or de ...                                                                                        | `string` | `undefined` |
| `textids` _(required)_ | `textids`        | An comma separated list  with ids of DOM elements which inner text should be speech.                                             | `string` | `undefined` |
| `titletext`            | `titletext`      | title text for a11y default: Vorlesen                                                                                            | `string` | `undefined` |


## Events

| Event             | Description                                    | Type               |
| ----------------- | ---------------------------------------------- | ------------------ |
| `speakerFailed`   | Fired if the voice has failed to speak.        | `CustomEvent<any>` |
| `speakerFinished` | Fired if the voice has finished with speaking. | `CustomEvent<any>` |
| `speakerPaused`   | Fired if the voice is paused with speaking.    | `CustomEvent<any>` |
| `speakerStarted`  | Fired if the voice is speaking.                | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
