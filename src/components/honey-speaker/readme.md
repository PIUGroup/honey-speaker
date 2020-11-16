# honey-speaker

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                          | Type      | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------ | --------- | ----------- |
| `audiolang`   | `audiolang`   | i18n language ident for Web Speech API: de-DE or en or de ...                        | `string`  | `"de-DE"`   |
| `audiopitch`  | `audiopitch`  | pitch for Web Speech API                                                             | `number`  | `1`         |
| `audiorate`   | `audiorate`   | rate for Web Speech API                                                              | `number`  | `1`         |
| `audiovolume` | `audiovolume` | volume for Web Speech API                                                            | `number`  | `1`         |
| `iconheight`  | `iconheight`  | icon height                                                                          | `string`  | `"36"`      |
| `iconwidth`   | `iconwidth`   | icon width                                                                           | `string`  | `"36"`      |
| `pure`        | `pure`        | use pure speaker symbol for silence state                                            | `boolean` | `false`     |
| `textids`     | `textids`     | An comma separated list  with ids of DOM elements which inner text should be speech. | `string`  | `undefined` |
| `texturl`     | `texturl`     | An url to download an text file to speech.                                           | `string`  | `undefined` |
| `verbose`     | `verbose`     | enable console logging                                                               | `boolean` | `false`     |
| `voicename`   | `voicename`   | voice name used of Web Speech API                                                    | `string`  | `undefined` |


## Events

| Event                  | Description                                               | Type                  |
| ---------------------- | --------------------------------------------------------- | --------------------- |
| `honeySpeakerFailed`   | Fired if the voice has failed to speak.                   | `CustomEvent<string>` |
| `honeySpeakerFinished` | Fired if the voice has finished with speaking.            | `CustomEvent<string>` |
| `honeySpeakerPaused`   | Fired if the voice is paused with speaking.               | `CustomEvent<string>` |
| `honeySpeakerResume`   | Fired if the voice is resumed after paused with speaking. | `CustomEvent<string>` |
| `honeySpeakerStarted`  | Fired if the voice is speaking.                           | `CustomEvent<string>` |


## Methods

### `cancelSpeaker() => Promise<void>`

cancel the speaker

#### Returns

Type: `Promise<void>`



### `pauseSpeaker() => Promise<void>`

paused the speaker

#### Returns

Type: `Promise<void>`



### `resumeSpeaker() => Promise<void>`

continue speaker after paused

#### Returns

Type: `Promise<void>`



### `toggleSpeaker() => Promise<void>`

call the toggle speaker action

#### Returns

Type: `Promise<void>`



### `updateOptions(options: SpeakerOptions) => Promise<void>`

Update speaker options

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)* by Huluvu424242
