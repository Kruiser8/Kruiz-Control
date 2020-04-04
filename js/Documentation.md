# Kruiz Control Documentation
Each handler provides its own triggers and actions that can be used in a triggers file. These are detailed below after the general formatting.

## Table of Contents

- [General](#general)
  * [Case Sensitivity](#case-sensitivity)
  * [Quotes](#quotes)
  * [Comments](#comments)
  * [Parameters](#parameters)
- [API](#api)
  * [Triggers](#api-triggers)
  * [Actions](#api-actions)
    + [API Get](#api-get)
- [Channel Points](#channel-points)
  * [Triggers](#channel-point-triggers)
    + [OnChannelPoint](#onchannelpoint)
  * [Actions](#channel-point-actions)
- [Chat](#chat)
  * [Triggers](#chat-triggers)
    + [OnCommand](#oncommand)
    + [OnKeyword](#onkeyword)
  * [Actions](#chat-actions)
    + [Chat Send](#chat-send)
    + [Chat Whisper](#chat-whisper)
- [Miscellaneous](#miscellaneous)
  * [Triggers](#miscellaneous-triggers)
  * [Actions](#miscellaneous-actions)
    + [Delay](#delay)
    + [Eval](#eval)
    + [Play](#play)
- [OBS](#obs)
  * [Triggers](#obs-triggers)
    + [OnOBSCustomMessage](#onobscustommessage)
    + [OnOBSStreamStarted](#onobsstreamstarted)
    + [OnOBSStreamStopped](#onobsstreamstopped)
    + [OnOBSSwitchScenes](#onobsswitchscenes)
    + [OnOBSTransitionTo](#onobstransitionto)
  * [Actions](#obs-actions)
    + [OBS Current Scene](#obs-current-scene)
    + [OBS Scene](#obs-scene)
    + [OBS Scene Source](#obs-scene-source)
    + [OBS Source](#obs-source)
    + [OBS Source Filter](#obs-source-filter)
    + [OBS Send](#obs-send)
- [Random](#random)
- [SLOBS](#slobs)
  * [Triggers](#slobs-triggers)
    + [OnSLOBSStreamStarted](#onslobsstreamstarted)
    + [OnSLOBSStreamStopped](#onslobsstreamstopped)
    + [OnSLOBSSwitchScenes](#onslobsswitchscenes)
  * [Actions](#slobs-actions)
    + [SLOBS Scene](#slobs-scene)
    + [SLOBS Source](#slobs-source)
- [StreamElements](#streamelements)
  * [Triggers](#streamelements-triggers)
    + [OnSETwitchBits](#onsetwitchbits)
    + [OnSETwitchBulkGiftSub](#onsetwitchbulkgiftsub)
    + [OnSEDonation](#onsedonation)
    + [OnSETwitchFollow](#onsetwitchfollow)
    + [OnSETwitchGiftSub](#onsetwitchgiftsub)
    + [OnSETwitchHost](#onsetwitchhost)
    + [OnSETwitchRaid](#onsetwitchraid)
    + [OnSETwitchSub](#onsetwitchsub)
  * [Actions](#streamelements-actions)
- [Streamlabs](#streamlabs)
  * [Triggers](#streamlabs-triggers)
    + [OnSLTwitchBits](#onsltwitchbits)
    + [OnSLDonation](#onsldonation)
    + [OnSLTwitchFollow](#onsltwitchfollow)
    + [OnSLTwitchGiftSub](#onsltwitchgiftsub)
    + [OnSLTwitchHost](#onsltwitchhost)
    + [OnSLTwitchRaid](#onsltwitchraid)
    + [OnSLTwitchSub](#onsltwitchsub)
  * [Actions](#streamlabs-actions)
- [Timer](#timer)
  * [Triggers](#timer-triggers)
    + [OnTimer](#ontimer)
  * [Actions](#timer-actions)
- [Variable](#variable)
  * [Triggers](#variable-triggers)
  * [Actions](#variable-actions)
    + [Variable Load](#variable-load)
    + [Variable Set](#variable-set)
    + [Variable Global Clear](#variable-global-clear)
    + [Variable Global Load](#variable-global-load)
    + [Variable Global Remove](#variable-global-remove)
    + [Variable Global Set](#variable-global-set)

***

## General
Trigger files are sections of triggers and actions separated by empty lines. Each trigger can be followed by 1 or more actions. Here's the general format.
```
<Trigger>
<Action>
...
<Action>

<Trigger>
<Action>
...
<Action>
```

### Case Sensitivity
Triggers and Actions are case insensitive. The following example sends a message after a command.
```
OnCommand !caseSensitive
Chat Send "Triggers and Actions are case insensitive"
```

The following is *also* correct.
```
Oncommand !caseSensitive
chat SEND "Triggers and Actions are case insensitive"
```

Note that the message itself _IS_ case sensitive. Whenever you are supplying parameters to **Triggers** or **Actions**, they are almost _always_ case sensitive.

***

### Quotes
It is **highly recommended** to use quotes when providing multi-word arguments. For example,
```
Chat Send "Some really long message"
OBS Scene "Starting Soon"
```

***

### Comments
Trigger files support comments using the **#** character. This allows you to leave text in the trigger file that is not treated as a trigger or action.

#### Comment Example
```
# My really complicated trigger
OnCommand !example
Chat Send "This is a silly example!"
```

***

### Parameters
Triggers and Actions can return data that is used in following actions. Take the following example:

```
OnCommand b !example
Chat Send "{user} used the example command!"
```

The **OnCommand** Trigger provides a `user` parameter. This parameter is used in the next action as `{user}` and is replaced with the name of the viewer that used the command in Twitch chat.

- Parameters are identified by `{parameter}` or `[parameter]`.
- Parameters are replaced on every action line in any position.
- Parameters can be nested `{{user}_sub_months}`

#### {parameter}
When `{parameter}` is used, the literal value of the parameter is used. **In almost all cases, use this.**
For example, here's the result when used in a Chat Send action.
```
Chat Send "{user} used the example command!"
> "Kruiser8 used the example command!"
```

#### [parameter]
When `[parameter]` is used, the value of the parameter is JSON.stringify'd before replacement. **This is primarily for use with [Eval](#eval).** This allows parameters to be easily used and be properly escaped when used in Eval javascript code.

For example, here's the result when used in an Eval action.
```
Eval (function() { var name = [user]; var data = [data]; // rest of code ... }())
> (function() { var name = "Kruiser8"; var data = {"property": value}; // rest of code ... }())
```

***

## API
Enables the ability to call an API and use the response.

### API Triggers
None at the moment.

***

### API Actions

#### API Get
| | |
------------ | -------------
**Info** | Used to call an API and retrieve the data. `<url>` is the API to call.
**Format** | `API GET <url>`
**Example** | `API GET https://api.crunchprank.net/twitch/hosts/kruiser8?implode&display_name`

##### Parameters
| | |
------------ | -------------
**api_data** | The response from calling the API or 'Error'.

***

## Channel Points
Enables the ability to run actions when channel point rewards are redeemed.

### Channel Point Triggers

#### OnChannelPoint
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a channel point reward is redeemed. Using `*` as the `<reward_name>` will execute the trigger for all channel point rewards.
**Format** | `OnChannelPoint <reward_name>`
**Example** | `OnChannelPoint "Example Reward"`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that redeemed the channel point reward.
**message** | The message included with the channel point redemption (if one is provided)
**data** | The complete json channel point message (for use with [Eval](#eval)).

***

### Channel Point Actions
None at the moment.

***

## Chat
Enables the ability to take actions on chat message and send messages.

### Chat Triggers
Chat triggers use a `<permission>` parameter to specify who can use a command. The following values can be combined in any order.

- *e* - Everyone
- *b* - Broadcaster
- *s* - Subscriber
- *f* - Founder
- *v* - VIP
- *m* - Moderator

Additionally, you can use *u* as the permission to specify a specific user that can use a command or keyword. In this case, `<optional_info>` is required to specify the user. The username input is case insensitive.

**Example**:
```
OnCommand u kruiser8 !secret
```

Chat triggers also use a `<cooldown>` parameter to put the command or keyword on cooldown for the specified number of seconds. The `<cooldown>` can be any number 0 or higher.

***

#### OnCommand
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a command is used at the beginning of a message.
**Format** | `OnCommand <permission> <optional_info> <cooldown> <command>`
**Example** | `OnCommand e 0 !example`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that sent the command.
**message** | The chat message.
**data** | An object with all metadata about the message (for use with [Eval](#eval)).

***

#### OnKeyword
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a keyword or phrase appears in a message.
**Format** | `OnKeyword <permission> <optional_info> <cooldown> <command>`
**Example** | `OnKeyword smv 10 "music"`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that triggered the keyword.
**message** | The chat message.
**data** | An object with all metadata about the message (for use with [Eval](#eval)).

***

### Actions

#### Chat Send
| | |
------------ | -------------
**Info** | Used to send a message to chat.
**Format** | `Chat Send <message>`
**Example** | `Chat Send "Hello World"`

***

#### Chat Whisper
| | |
------------ | -------------
**Info** | Used to send a whisper to a user.
**Format** | `Chat Whisper <user> <message>`
**Example** | `Chat Whisper Kruiser8 "Chicken Dinner"`

***

## Miscellaneous
A small selection of actions that are included for increased usability.

### Miscellaneous Triggers
None at the moment.

***

### Miscellaneous Actions

#### Delay
| | |
------------ | -------------
**Info** | Used to wait a specific number of seconds before taking the next action.
**Format** | `Delay <seconds>`
**Example** | `Delay 8`

***

#### Eval
| | |
------------ | -------------
**Info** | Used with eval() evaluate a string as a function. This enables custom logic to be used in the script. `<expression_or_function>` is explained below.
**Format** | `Eval <expression_or_function>`
**Example** | `Eval ({total: {total} + 1})`

`<expression_or_function>` is a javascript expression or function that returns an Object. Each property of the Object is usable as a parameter in the rest of the trigger.

If you need a _simple_ expression to return parameters, wrap the expression in parenthesis. The example below increments a parameter named _total_ by 1.
```js
Eval ({total: {total} + 1})
```

If you need a function rather than an expression, use the below format. The below returns a random element from an array in _api_data_.
```js
Eval (function() { var arr = {api_data}; return {random: arr[Math.floor(Math.random() * arr.length)]}}())
```

If a `continue` parameter is returned and the value is `false`, the trigger will exit and not continue processing actions.

***

#### Play
| | |
------------ | -------------
**Info** | Used to play a sound effect inside of the _sounds_ folder. `<volume>` is a number between 1 and 100. `<wait/nowait>` determines whether or not the script waits until the song is done playing before completing the next action.
**Format** | `Play <volume> <wait/nowait> <song_file>`
**Example** | `Play 30 wait MashiahMusic__Kygo-Style-Melody.wav`

***

## OBS
Enables the ability to take interact with and respond to OBS.

### OBS Triggers

#### OnOBSCustomMessage
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a custom message is sent. Used to receive triggers from [OBS Send](#obs-send).
**Format** | `OnOBSCustomMessage <message>`
**Example** | `OnOBSCustomMessage "My Custom Message"`

##### Parameters
| | |
------------ | -------------
**data** | The data included with the message (or an empty string).

***

#### OnOBSStreamStarted
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the stream starts.
**Format** | `OnOBSStreamStarted`
**Example** | `OnOBSStreamStarted`

***

#### OnOBSStreamStopped
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the stream stops.
**Format** | `OnOBSStreamStopped`
**Example** | `OnOBSStreamStopped`

***

#### OnOBSSwitchScenes
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the scene changes in OBS. This is fired once the new scene is loaded.
**Format** | `OnOBSSwitchScenes <scene>`
**Example** | `OnOBSSwitchScenes BRB`

***

#### OnOBSTransitionTo
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a transition to a scene starts. Allows triggers to occur prior to a scene switch.
**Format** | `OnOBSTransitionTo <scene>`
**Example** | `OnOBSTransitionTo BRB`

***

### OBS Actions

#### OBS Current Scene
| | |
------------ | -------------
**Info** | Used to get the current scene in OBS.
**Format** | `OBS CurrentScene`
**Example** | `OBS CurrentScene`

##### Parameters
| | |
------------ | -------------
**current_scene** | The name of the active scene.

***

#### OBS Scene
| | |
------------ | -------------
**Info** | Used to change the scene in OBS.
**Format** | `OBS Scene <scene>`
**Example** | `OBS Scene Ending`

##### Parameters
| | |
------------ | -------------
**previous_scene** | The name of the active scene before changing to the specified scene. This allows users to revert scenes from anywhere.

***

#### OBS Scene Source
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source in a specific scene in OBS.
**Format** | `OBS SceneSource <scene> <source> <on/off>`
**Example** | `OBS SceneSource Webcam Camera on`

***

#### OBS Source
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source in OBS. Only works if the source is in the current scene.
**Format** | `OBS Source <source> <on/off>`
**Example** | `OBS Source Webcam off`

***

#### OBS Source Filter
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source filter in OBS.
**Format** | `OBS Source <source> Filter <filter> <on/off>`
**Example** | `OBS Source Webcam Filter Rainbow on`

***

#### OBS Send
| | |
------------ | -------------
**Info** | Used to send a custom event to through the OBS websocket. `<message>` is the identifier of the message. (Optional) `<data>` is anything to send with the message.
**Format** | `OBS Send <message> <data>`
**Example** | `OBS Send PlayShikaka`
**Example (with data)** | `OBS Send PlayAudio Shikaka`

_Note: Messages are echo'd to all websocket connected clients. This is useful for connecting other browser sources or triggering other triggers._

***

## Random
Adds the ability to randomly choose between multiple actions.

### Random Triggers
None at the moment.

***

### Random Actions

#### Random
| | |
------------ | -------------
**Info** | Randomly selects an action.
**Format** | `Random <action> <action> ...`
**Example** | `Random "chat send 'hello world'" "chat send 'did you know tarantulas molt?'"`

***

## SLOBS
Enables the ability to take interact with and respond to SLOBS.

### SLOBS Triggers

#### OnSLOBSStreamStarted
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the stream starts.
**Format** | `OnSLOBSStreamStarted`
**Example** | `OnSLOBSStreamStarted`

***

#### OnSLOBSStreamStopped
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the stream stops.
**Format** | `OnSLOBSStreamStopped`
**Example** | `OnSLOBSStreamStopped`

***

#### OnSLOBSSwitchScenes
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the scene changes in SLOBS.
**Format** | `OnSLOBSSwitchScenes <scene>`
**Example** | `OnSLOBSSwitchScenes BRB`

***

### SLOBS Actions

#### SLOBS Scene
| | |
------------ | -------------
**Info** | Used to change the scene in SLOBS.
**Format** | `SLOBS Scene <scene>`
**Example** | `SLOBS Scene Ending`

##### Parameters
| | |
------------ | -------------
**previous_scene** | The name of the active scene before changing to the specified scene. This allows users to revert scenes from anywhere.

***

#### SLOBS Source
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source in SLOBS.
**Format** | `SLOBS Source <source> <on/off>`
**Example** | `SLOBS Source Webcam off`

***

## StreamElements
Enables the ability to trigger actions based on StreamElement alerts. Note that actions are triggered as soon as the alert is triggered. This may not line up with the alert widget.

### StreamElements Triggers

#### OnSETwitchBits
| | |
------------ | -------------
**Info** | Used to trigger actions when someone cheers bits.
**Format** | `OnSETwitchBits`
**Example** | `OnSETwitchBits`

##### Parameters
| | |
------------ | -------------
**user** | The user that cheered.
**amount** | The amount of the bits. Use this in comparisons.
**message** | The message included with the bits.
**data** | The complete json event (for use with [Eval](#eval)).

***

#### OnSETwitchBulkGiftSub
| | |
------------ | -------------
**Info** | Used to trigger actions when someone gifts multiple subscriptions to the community.
**Format** | `OnSETwitchBulkGiftSub`
**Example** | `OnSETwitchBulkGiftSub`

##### Parameters
| | |
------------ | -------------
**user** | The user that gifted the subscriptions.
**amount** | The number of subscriptions the user is gifted.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSEDonation
| | |
------------ | -------------
**Info** | Used to trigger actions when someone donates through StreamElements.
**Format** | `OnSEDonation`
**Example** | `OnSEDonation`

##### Parameters
| | |
------------ | -------------
**user** | The user that donated.
**amount** | The numeric amount of the donation with no currency symbol.
**message** | The message included with the donation.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSETwitchFollow
| | |
------------ | -------------
**Info** | Used to trigger actions when someone follows the channel.
**Format** | `OnSETwitchFollow`
**Example** | `OnSETwitchFollow`

##### Parameters
| | |
------------ | -------------
**user** | The user that followed.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSETwitchGiftSub
| | |
------------ | -------------
**Info** | Used to trigger actions when someone gifts a single subscription.
**Format** | `OnSETwitchGiftSub`
**Example** | `OnSETwitchGiftSub`

##### Parameters
| | |
------------ | -------------
**user** | The user that was gifted a subscription.
**gifter** | The user that gifted the subscription.
**tier** | The tier of the subscription. Possible values are `Tier 1`, `Tier 2`, `Tier 3`, and `Prime`.
**data** | The complete json message (for use with [Eval](#eval)).

_Note: months is not included since streamelements does not include it for gift subs (or I just could not find it)._

***

#### OnSETwitchHost
| | |
------------ | -------------
**Info** | Used to trigger actions when someone hosts the channel.
**Format** | `OnSETwitchHost`
**Example** | `OnSETwitchHost`

##### Parameters
| | |
------------ | -------------
**user** | The user that hosted.
**viewers** | The number of viewers in the host.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSETwitchRaid
| | |
------------ | -------------
**Info** | Used to trigger actions when someone raids the channel.
**Format** | `OnSETwitchRaid`
**Example** | `OnSETwitchRaid`

##### Parameters
| | |
------------ | -------------
**user** | The user that raided.
**raiders** | The number of raiders in the raid.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSETwitchSub
| | |
------------ | -------------
**Info** | Used to trigger actions when someone subscribes to the channel.
**Format** | `OnSETwitchSub`
**Example** | `OnSETwitchSub`

##### Parameters
| | |
------------ | -------------
**user** | The user that subscribed.
**months** | The number of months the user is subscribed.
**message** | The message included with the subscription.
**tier** | The tier of the subscription. Possible values are `Tier 1`, `Tier 2`, `Tier 3`, and `Prime`.
**data** | The complete json message (for use with [Eval](#eval)).

***

### StreamElements Actions
None at the moment.

***

## Streamlabs
Enables the ability to trigger actions based on Streamlabs alerts. Note that the triggers only work if your alert box is open. In the future, this may be optional BUT it will cause triggers to not be in sync with your alert box.

### Streamlabs Triggers

#### OnSLTwitchBits
| | |
------------ | -------------
**Info** | Used to trigger actions when someone cheers bits.
**Format** | `OnSLTwitchBits`
**Example** | `OnSLTwitchBits`

##### Parameters
| | |
------------ | -------------
**user** | The user that cheered.
**amount** | The amount of the bits. Use this in comparisons.
**message** | The message included with the bits.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSLDonation
| | |
------------ | -------------
**Info** | Used to trigger actions when someone donates through StreamElements.
**Format** | `OnSLDonation`
**Example** | `OnSLDonation`

##### Parameters
| | |
------------ | -------------
**user** | The user that donated.
**amount** | The numeric amount of the donation. Use this in comparisons.
**formatted** | The formatted amount using the locale's currency format.
**message** | The message included with the donation.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSLTwitchFollow
| | |
------------ | -------------
**Info** | Used to trigger actions when someone follows the channel.
**Format** | `OnSLTwitchFollow`
**Example** | `OnSLTwitchFollow`

##### Parameters
| | |
------------ | -------------
**user** | The user that followed.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSLTwitchGiftSub
| | |
------------ | -------------
**Info** | Used to trigger actions when someone gifts a subscription to the channel.
**Format** | `OnSLTwitchGiftSub`
**Example** | `OnSLTwitchGiftSub`

##### Parameters
| | |
------------ | -------------
**user** | The user that was gifted a subscription.
**gifter** | The user that gifted the subscription.
**months** | The number of months the user is subscribed.
**tier** | The tier of the subscription. Possible values are `Tier 1`, `Tier 2`, `Tier 3`, and `Prime`.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSLTwitchHost
| | |
------------ | -------------
**Info** | Used to trigger actions when someone hosts the channel.
**Format** | `OnSLTwitchHost`
**Example** | `OnSLTwitchHost`

##### Parameters
| | |
------------ | -------------
**user** | The user that hosted.
**viewers** | The number of viewers in the host.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSLTwitchRaid
| | |
------------ | -------------
**Info** | Used to trigger actions when someone raids the channel.
**Format** | `OnSLTwitchRaid`
**Example** | `OnSLTwitchRaid`

##### Parameters
| | |
------------ | -------------
**user** | The user that raided.
**raiders** | The number of raiders in the raid.
**data** | The complete json message (for use with [Eval](#eval)).

***

#### OnSLTwitchSub
| | |
------------ | -------------
**Info** | Used to trigger actions when someone subscribes to the channel.
**Format** | `OnSLTwitchSub`
**Example** | `OnSLTwitchSub`

##### Parameters
| | |
------------ | -------------
**user** | The user that subscribed.
**months** | The number of months the user is subscribed.
**message** | The message included with the subscription.
**tier** | The tier of the subscription. Possible values are `Tier 1`, `Tier 2`, `Tier 3`, and `Prime`.
**data** | The complete json message (for use with [Eval](#eval)).

***

### Streamlabs Actions
None at the moment.

***

## Timer
Enables the ability to run actions on a time interval.

### Timer Triggers

#### OnTimer
| | |
------------ | -------------
**Info** | Used to trigger a set of actions every `<interval>` seconds after `<offset>` initial seconds. `<offset>` is optional.
**Format** | `OnTimer <interval> <offset>`
**Example** | `OnTimer 300 10`

***

### Timer Actions
None at the moment.

***

## Variable
Enables the ability to set and load variables per session or across sessions (globally). That is, global variables persist even if you close the overlay.

<p align="center"><b>
Global variables have been updated to allow more data to be stored. However, please be aware of how much data you're storing.
</b></p>

### Variable Triggers
None at the moment.

***

### Variable Actions

#### Variable Load
| | |
------------ | -------------
**Info** | Used to load a previously set variable during the current session. `<name>` is the name assigned to the value.
**Format** | `Variable Load <name>`
**Example** | `Variable Load Recent_Sub`

##### Parameters
| | |
------------ | -------------
**\<name\>** | The variable value is assigned to the name of the variable.

***

#### Variable Set
| | |
------------ | -------------
**Info** | Used to set a variable during the current session. `<name>` is the name assigned to the value. `<value>` is the variable value.
**Format** | `Variable Set <name> <value>`
**Example** | `Variable Set Recent_Sub Kruiser8`

##### Parameters
| | |
------------ | -------------
**\<name\>** | The variable value is assigned to the name of the variable.

***

#### Variable Global Clear
| | |
------------ | -------------
**Info** | Used to clear all previously set global variables.
**Format** | `Variable Global Clear`
**Example** | `Variable Global Clear`

***

#### Variable Global Load
| | |
------------ | -------------
**Info** | Used to load a previously set global variable. Global variables persist even when the browser is closed. `<name>` is the name assigned to the value.
**Format** | `Variable Global Load <name>`
**Example** | `Variable Global Load Recent_Sub`

##### Parameters
| | |
------------ | -------------
**\<name\>** | The variable value is assigned name of the variable.

***

#### Variable Global Remove
| | |
------------ | -------------
**Info** | Used to remove a previously set global variable. `<name>` is the name assigned to the value.
**Format** | `Variable Global Remove <name>`
**Example** | `Variable Global Remove Recent_Sub`

***

#### Variable Global Set
| | |
------------ | -------------
**Info** | Used to set a global variable. Global variables persist even when the browser is closed. `<name>` is the name assigned to the value. `<value>` is the variable value.
**Format** | `Variable Global Set <name> <value>`
**Example** | `Variable Global Set Recent_Sub Kruiser8`

##### Parameters
| | |
------------ | -------------
**\<name\>** | The variable value is assigned name of the variable.
