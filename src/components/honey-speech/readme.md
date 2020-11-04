# honey-speech

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute     | Description                                                                          | Type      | Default     |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------ | --------- | ----------- |
| `audiolang`            | `audiolang`   | i18n language ident for Web Speech API: de-DE or en or de ...                        | `string`  | `"de-DE"`   |
| `audiopitch`           | `audiopitch`  | pitch for Web Speech API                                                             | `number`  | `1`         |
| `audiorate`            | `audiorate`   | rate for Web Speech API                                                              | `number`  | `1`         |
| `audiovolume`          | `audiovolume` | volume for Web Speech API                                                            | `number`  | `1`         |
| `iconheight`           | `iconheight`  | icon height                                                                          | `string`  | `"36"`      |
| `iconwidth`            | `iconwidth`   | icon width                                                                           | `string`  | `"36"`      |
| `textids` _(required)_ | `textids`     | An comma separated list  with ids of DOM elements which inner text should be speech. | `string`  | `undefined` |
| `verbose`              | `verbose`     | enable or disable console logging                                                    | `boolean` | `false`     |
| `voicename`            | `voicename`   | voice name used of Web Speech API                                                    | `string`  | `undefined` |


## Events

| Event                  | Description                                     | Type                  |
| ---------------------- | ----------------------------------------------- | --------------------- |
| `honeySpeakerFailed`   | Fired if the stimme has failed to speak.        | `CustomEvent<string>` |
| `honeySpeakerFinished` | Fired if the stimme has finished with speaking. | `CustomEvent<string>` |
| `honeySpeakerPaused`   | Fired if the stimme is paused with speaking.    | `CustomEvent<string>` |
| `honeySpeakerStarted`  | Fired if the stimme is speaking.                | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)* by Huluvu424242
