# my-component



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                                      | Type     | Default     |
| ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `alttext`    | `alttext`    |                                                                                                                                  | `string` | `undefined` |
| `i18n`       | --           | An JSON Object with i18n text values separeted by language idents:  { "deDE" : { "error": "Fehler}, "en" : { "error" : "Error"}} | `object` | `undefined` |
| `iconheight` | `iconheight` |                                                                                                                                  | `string` | `undefined` |
| `iconsrc`    | `iconsrc`    |                                                                                                                                  | `string` | `undefined` |
| `iconwidth`  | `iconwidth`  |                                                                                                                                  | `string` | `undefined` |
| `ident`      | `ident`      |                                                                                                                                  | `string` | `undefined` |
| `langid`     | `langid`     | i18n language ident: deDE or en or de ...                                                                                        | `string` | `undefined` |
| `textids`    | `textids`    | An comma separated list  with ids of DOM elements which inner text should be speech.                                             | `string` | `undefined` |
| `titletext`  | `titletext`  |                                                                                                                                  | `string` | `undefined` |


## Events

| Event             | Description                                    | Type               |
| ----------------- | ---------------------------------------------- | ------------------ |
| `speakerFailed`   | Fired if the voice has failed to speak.        | `CustomEvent<any>` |
| `speakerFinished` | Fired if the voice has finished with speaking. | `CustomEvent<any>` |
| `speakerPaused`   | Fired if the voice is paused with speaking.    | `CustomEvent<any>` |
| `speakerStarted`  | Fired if the voice is speaking.                | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
