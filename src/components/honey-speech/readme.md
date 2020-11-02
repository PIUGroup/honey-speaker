# honey-speech

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute     | Description                                                                          | Type     | Default     |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------ | -------- | ----------- |
| `audiolang`            | `audiolang`   | i18n language ident for Web Speech API: de-DE or en or de ...                        | `string` | `undefined` |
| `audiopitch`           | `audiopitch`  | pitch for Web Speech API: default: 1                                                 | `number` | `undefined` |
| `audiorate`            | `audiorate`   | rate for Web Speech API: default 1                                                   | `number` | `undefined` |
| `audiovolume`          | `audiovolume` | volume for Web Speech API: default 1                                                 | `number` | `undefined` |
| `iconheight`           | `iconheight`  | icon height, default: 36                                                             | `string` | `undefined` |
| `iconwidth`            | `iconwidth`   | icon width default: 36                                                               | `string` | `undefined` |
| `textids` _(required)_ | `textids`     | An comma separated list  with ids of DOM elements which inner text should be speech. | `string` | `undefined` |
| `voicename`            | `voicename`   | voice name used of Web Speech API: default undefined                                 | `string` | `undefined` |


## Events

| Event                  | Description                                     | Type                  |
| ---------------------- | ----------------------------------------------- | --------------------- |
| `honeySpeakerFailed`   | Fired if the stimme has failed to speak.        | `CustomEvent<string>` |
| `honeySpeakerFinished` | Fired if the stimme has finished with speaking. | `CustomEvent<string>` |
| `honeySpeakerPaused`   | Fired if the stimme is paused with speaking.    | `CustomEvent<string>` |
| `honeySpeakerStarted`  | Fired if the stimme is speaking.                | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)* by Huluvu424242
