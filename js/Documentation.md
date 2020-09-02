# Kruiz Control Documentation
Each handler provides its own triggers and actions that can be used in a triggers file. These are detailed below after the general formatting.

## Table of Contents

- [General](#general)
  * [Case Sensitivity](#case-sensitivity)
  * [Quotes](#quotes)
  * [Comments](#comments)
  * [Parameters](#parameters)
- [Default Parameters](#default-parameters)
- [API](#api)
  * [Triggers](#api-triggers)
  * [Actions](#api-actions)
    + [API Get](#api-get)
- [Channel Points](#channel-points)
  * [Triggers](#channel-point-triggers)
    + [OnChannelPoint](#onchannelpoint)
    + [OnCommunityGoalComplete](#oncommunitygoalcomplete)
    + [OnCommunityGoalProgress](#oncommunitygoalprogress)
    + [OnCommunityGoalStart](#oncommunitygoalstart)
  * [Actions](#channel-point-actions)
- [Chat](#chat)
  * [Triggers](#chat-triggers)
    + [OnCommand](#oncommand)
    + [OnEveryChatMessage](#oneverychatmessage)
    + [OnKeyword](#onkeyword)
    + [OnSpeak](#onspeak)
  * [Actions](#chat-actions)
    + [Chat Send](#chat-send)
    + [Chat Whisper](#chat-whisper)
- [Hype Train](#hype-train)
  * [Triggers](#hype-train-triggers)
    + [OnHypeTrainCooldownExpired](#onhypetraincooldownexpired)
    + [OnHypeTrainConductor](#onhypetrainconductor)
    + [OnHypeTrainEnd](#onhypetrainend)
    + [OnHypeTrainLevel](#onhypetrainlevel)
    + [OnHypeTrainProgress](#onhypetrainprogress)
    + [OnHypeTrainStart](#onhypetrainstart)
  * [Actions](#hype-train-actions)
- [List](#list)
  * [Triggers](#list-triggers)
  * [Actions](#list-actions)
    + [List Add](#list-add)
    + [List Contains](#list-contains)
    + [List Count](#list-count)
    + [List Export](#list-export)
    + [List Get](#list-get)
    + [List Import](#list-import)
    + [List Index](#list-index)
    + [List Remove](#list-remove)
    + [List Set](#list-remove)
- [Message](#message)
  * [Triggers](#message-triggers)
    + [OnMessage](#onmessage)
  * [Actions](#message-actions)
    + [Message Send](#message-send)
- [Miscellaneous](#miscellaneous)
  * [Triggers](#miscellaneous-triggers)
    + [OnInit](#oninit)
  * [Actions](#miscellaneous-actions)
    + [Cooldown Apply](#cooldown-apply)
    + [Cooldown Check](#cooldown-check)
    + [Delay](#delay)
    + [Error](#error)
    + [Eval](#eval)
    + [Exit](#exit)
    + [Function](#function)
    + [If](#if)
    + [Log](#log)
    + [Play](#play)
    + [Reset](#reset)
    + [Skip](#skip)
- [OBS](#obs)
  * [Triggers](#obs-triggers)
    + [OnOBSCustomMessage](#onobscustommessage)
    + [OnOBSSourceVisibility](#onobssourcevisibility)
    + [OnOBSStreamStarted](#onobsstreamstarted)
    + [OnOBSStreamStopped](#onobsstreamstopped)
    + [OnOBSSwitchScenes](#onobsswitchscenes)
    + [OnOBSTransitionTo](#onobstransitionto)
  * [Actions](#obs-actions)
    + [OBS CurrentScene](#obs-currentscene)
    + [OBS Mute](#obs-mute)
    + [OBS Position](#obs-position)
    + [OBS Scene](#obs-scene)
    + [OBS SceneSource](#obs-scenesource)
    + [OBS Send](#obs-send)
    + [OBS Source](#obs-source)
    + [OBS Source Filter](#obs-source-filter)
    + [OBS Source Text](#obs-source-text)
    + [OBS Source URL](#obs-source-url)
    + [OBS StartStream](#obs-startstream)
    + [OBS StopStream](#obs-stopstream)
    + [OBS TakeSourceScreenshot](#obs-takesourcescreenshot)
    + [OBS Version](#obs-version)
    + [OBS Volume](#obs-volume)
- [Random](#random)
  * [Triggers](#random-triggers)
  * [Actions](#random-triggers)
    + [Random Equal](#random-equal)
    + [Random Number](#random-number)
    + [Random Probability](#random-probability)
- [SLOBS](#slobs)
  * [Triggers](#slobs-triggers)
    + [OnSLOBSStreamStarted](#onslobsstreamstarted)
    + [OnSLOBSStreamStopped](#onslobsstreamstopped)
    + [OnSLOBSSwitchScenes](#onslobsswitchscenes)
  * [Actions](#slobs-actions)
    + [SLOBS Flip](#slobs-flip)
    + [SLOBS Rotate](#slobs-rotate)
    + [SLOBS Scene](#slobs-scene)
    + [SLOBS SceneFolder](#slobs-scenefolder)
    + [SLOBS SceneSource](#slobs-scenesource)
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
    + [OnSLTwitchBits | OnSLTwitchBitsNoSync](#onsltwitchbits--onsltwitchbitsnosync)
    + [OnSLDonation | OnSLDonationNoSync](#onsldonation--onsldonationnosync)
    + [OnSLTiltifyDonation | OnSLTiltifyDonationNoSync](#onsltiltifydonation--onsltiltifydonationnosync)
    + [OnSLPatreonPledge | OnSLPatreonPledgeNoSync](#onslpatreonpledge--onslpatreonpledgenosync)
    + [OnSLTwitchFollow | OnSLTwitchFollowNoSync](#onsltwitchfollow--onsltwitchfollownosync)
    + [OnSLTwitchCommunityGiftSub | OnSLTwitchCommunityGiftSubNoSync](#onsltwitchcommunitygiftsub--onsltwitchcommunitygiftsubnosync)
    + [OnSLTwitchGiftSub | OnSLTwitchGiftSubNoSync](#onsltwitchgiftsub--onsltwitchgiftsubnosync)
    + [OnSLTwitchHost | OnSLTwitchHostNoSync](#onsltwitchhost--onsltwitchhostnosync)
    + [OnSLTwitchRaid | OnSLTwitchRaidNoSync](#onsltwitchraid--onsltwitchraidnosync)
    + [OnSLTwitchSub | OnSLTwitchSubNoSync](#onsltwitchsub--onsltwitchsubnosync)
  * [Actions](#streamlabs-actions)
- [Timer](#timer)
  * [Triggers](#timer-triggers)
    + [OnTimer](#ontimer)
  * [Actions](#timer-actions)
    + [Timer Reset](#timer-reset)
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
OnCommand f 0 !caseSensitive
Chat Send "Triggers and Actions are case insensitive"
```

The following is *also* correct.
```
Oncommand f 0 !caseSensitive
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
OnCommand e 10 !example
Chat Send "This is a silly example!"
```

***

### Parameters
Triggers and Actions can return data that is used in following actions. Take the following example:

```
OnCommand sb 10 !example
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
When `[parameter]` is used, the value of the parameter is JSON.stringify'd before replacement. **This is primarily for use with [Eval](#eval) or [Function](#function).** This allows parameters to be easily used and be properly escaped when used in javascript code.

For example, here's the result when used in an [Eval](#eval) action.
```
Eval '(function() { var name = [user]; var data = [data]; // rest of code ... }())
> (function() { var name = "Kruiser8"; var data = {"property": value}; // rest of code ... }())'
```
Here's an example in the [Function](#function) action.
```
Function 'var name = [user]; var data = [data]; // rest of code ... }())
> (function() { var name = "Kruiser8"; var data = {"property": value}; // rest of code ...'
```

***

## Default Parameters
The following parameters are always available. Use the `_successful_` and `_unsuccessful_` parameters to test that the <a href="https://github.com/Kruiser8/Kruiz-Control/blob/master/settings/Settings.md#kruiz-control-settings">Kruiz Control settings</a> are correct.

#### Parameters
| | |
------------ | -------------
**\_successful\_** | A comma delimited list of handlers that initialized correctly.
**\_unsuccessful\_** | A comma delimited list of handlers that did not initialize correctly.

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

_Note: Default channel point rewards are not supported: `Unlock a Random Sub Emote`, `Send a Message in Sub-Only Mode`, `Choose an Emote to Unlock`, `Highlight My Message`, and `Modify a Single Emote`._

##### Parameters
| | |
------------ | -------------
**reward** | The name of the channel point reward that was redeemed.
**user** | The display name of the user that redeemed the channel point reward.
**message** | The message included with the channel point redemption (if one is provided)
**data** | The complete json channel point message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnCommunityGoalComplete
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a community goal is completed. Using `*` as the `<goal_title>` will execute the trigger for all channel point rewards.
**Format** | `OnCommunityGoalComplete <goal_title>`
**Example** | `OnCommunityGoalComplete "Example Goal"`

##### Parameters
| | |
------------ | -------------
**goal** | The title of the community goal.
**user** | The display name of the user that completed the goal.
**amount** | The amount of points donated to complete the goal.
**user_total** | The total amount of points contributed by the user.
**progress** | The current amount of points contributed towards the goal.
**total** | The amount of points required to complete the goal.
**data** | The complete json community goal message (for use with [Eval](#eval) or [Function](#function)).

#### OnCommunityGoalProgress
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a user contributes towards a goal. Using `*` as the `<goal_title>` will execute the trigger for all channel point rewards.
**Format** | `OnCommunityGoalProgress <goal_title>`
**Example** | `OnCommunityGoalProgress "Example Goal"`

##### Parameters
| | |
------------ | -------------
**goal** | The title of the community goal.
**user** | The display name of the user that completed the goal.
**amount** | The amount of points donated to complete the goal.
**user_total** | The total amount of points contributed by the user.
**progress** | The current amount of points contributed towards the goal.
**total** | The amount of points required to complete the goal.
**data** | The complete json community goal message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnCommunityGoalStart
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the streamer starts a goal. Using `*` as the `<goal_title>` will execute the trigger for all channel point rewards.
**Format** | `OnCommunityGoalStart <goal_title>`
**Example** | `OnCommunityGoalStart "Example Goal"`

##### Parameters
| | |
------------ | -------------
**goal** | The title of the community goal.
**data** | The complete json community goal message (for use with [Eval](#eval) or [Function](#function)).

***

### Channel Point Actions
None at the moment.

***

## Chat
Enables the ability to take actions on chat message and send messages. Note that Kruiz Control can respond to messages sent by Kruiz Control.

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
OnCommand u kruiser8 10 !secret
```

Chat triggers also use a `<cooldown>` parameter to put the command or keyword on cooldown for the specified number of seconds. The `<cooldown>` can be any number 0 or higher.

***

#### OnCommand
_WARNING: Kruiz Control responds to messages sent by Kruiz Control. Please be mindful of your commands, keywords, and messages so that you do not trigger an infinite loop of messages. Twitch has [chat limits](https://dev.twitch.tv/docs/irc/guide#command--message-limits) and will block you from chatting._
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a command is used at the beginning of a message.
**Format** | `OnCommand <permission> <optional_info> <cooldown> <command>`
**Example** | `OnCommand e 0 !example`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that sent the command.
**after** | The message excluding the command.
**message** | The entire chat message, including the command.
**data** | An object with all metadata about the message (for use with [Eval](#eval) or [Function](#function)).
**arg#** | The numbered arguments in the message. Replace `#` with a number, starting at 1 and ending at the last argument passed into the command.

***

#### OnEveryChatMessage
_WARNING: Kruiz Control responds to messages sent by Kruiz Control. Please be mindful of your commands, keywords, and messages so that you do not trigger an infinite loop of messages. Twitch has [chat limits](https://dev.twitch.tv/docs/irc/guide#command--message-limits) and will block you from chatting._

| | |
------------ | -------------
**Info** | Used to trigger a set of actions when every chat message is sent. By default, this ignores the broadcaster.
**Format** | `OnEveryChatMessage`
**Example** | `OnEveryChatMessage`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that sent the command.
**message** | The entire chat message, including the command.
**data** | An object with all metadata about the message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnKeyword
_WARNING: Kruiz Control responds to messages sent by Kruiz Control. Please be mindful of your commands, keywords, and messages so that you do not trigger an infinite loop of messages. Twitch has [chat limits](https://dev.twitch.tv/docs/irc/guide#command--message-limits) and will block you from chatting._

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
**data** | An object with all metadata about the message (for use with [Eval](#eval) or [Function](#function)).
**arg#** | The numbered arguments in the message. Replace `#` with a number, starting at 1 and ending at the last argument passed into the command.

***

#### OnSpeak
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a user speaks in chat for the first time. Using `*` as the `<name>` will execute the trigger for all users.
**Format** | `OnSpeak <name>`
**Example** | `OnSpeak Kruiser8`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that triggered the speak event.

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

## Hype Train
A handler to allow you to trigger events from twitch hype trains.

### Hype Train Triggers

#### OnHypeTrainCooldownExpired
| | |
------------ | -------------
**Info** | Used to fire a set of actions when the hype train is no longer on cooldown and can be triggered again.
**Format** | `OnHypeTrainCooldownExpired`
**Example** | `OnHypeTrainCooldownExpired`

***

#### OnHypeTrainConductor
| | |
------------ | -------------
**Info** | Used to fire a set of actions when the conductor is changed for a given type (sub or cheer). Note that this fires every time progress is made in the hype train regardless of if the conductor changes.
**Format** | `OnHypeTrainConductor`
**Example** | `OnHypeTrainConductor`

##### Parameters
| | |
------------ | -------------
**cheer_conductor_id** | Id of the current cheer conductor if one exists.
**sub_conductor_id** | Id of the current sub conductor if one exists.
**type** | `SUBS` or `CHEER` to designate the type of conductor changed.
**data** | Data included with the message.

***

#### OnHypeTrainEnd
| | |
------------ | -------------
**Info** | Used to fire a set of actions when the hype train ends.
**Format** | `OnHypeTrainEnd`
**Example** | `OnHypeTrainEnd`

##### Parameters
| | |
------------ | -------------
**cheer_conductor_id** | Id of the current cheer conductor if one exists.
**sub_conductor_id** | Id of the current sub conductor if one exists.
**data** | Data included with the message.

***

#### OnHypeTrainLevel
| | |
------------ | -------------
**Info** | Used to fire a set of actions when the hype train levels up.
**Format** | `OnHypeTrainLevel`
**Example** | `OnHypeTrainLevel`

##### Parameters
| | |
------------ | -------------
**level** | The current level of the hype train.
**progress** | The current progress towards the next level (designated by `total`).
**total** | The amount needed to reach the next level in the hype train.
**time** | The amount of seconds left in the hype train.
**data** | Data included with the message.

***

#### OnHypeTrainProgress
| | |
------------ | -------------
**Info** | Used to fire a set of actions when someone contributes to the hype train.
**Format** | `OnHypeTrainProgress`
**Example** | `OnHypeTrainProgress`

##### Parameters
| | |
------------ | -------------
**user_id** | The twitch id of the user that contributed.
**level** | The current level of the hype train.
**progress** | The current progress towards the next level (designated by `total`).
**total** | The amount needed to reach the next level in the hype train.
**time** | The amount of seconds left in the hype train.
**data** | Data included with the message.

***

#### OnHypeTrainStart
| | |
------------ | -------------
**Info** | Used to fire a set of actions when a hype train starts.
**Format** | `OnHypeTrainStart`
**Example** | `OnHypeTrainStart`

##### Parameters
| | |
------------ | -------------
**data** | Data included with the message.

***

### Hype Train Actions
None at the moment.

***

## List
A small handler to allow you to store and update lists of items.

### List Triggers
None at the moment.

***

### List Actions

#### List Add
| | |
------------ | -------------
**Info** | Adds an item to the list. `<index>` is optional to add at a specific index.
**Format** | `List Add <list> <value> <index>`
**Example** | `List Add MyList {user}`
**Example with index** | `List Add MyList {user} 2`

##### Parameters
| | |
------------ | -------------
**position** | The position of the value in the list (starting from 1) or `-1` if not found.
**index** | The index of the value in the list (starting from 0) or `-1` if not found.

***

#### List Contains
| | |
------------ | -------------
**Info** | Check if an item exists in a list.
**Format** | `List Contains <list> <value>`
**Example** | `List Contains MyList {user}`

##### Parameters
| | |
------------ | -------------
**contains** | [true/false] If the list contains the value.

***

#### List Count
| | |
------------ | -------------
**Info** | Check how many items are in a list.
**Format** | `List Count <list>`
**Example** | `List Count MyList`

##### Parameters
| | |
------------ | -------------
**count** | The number of items in the list.

***

#### List Export
| | |
------------ | -------------
**Info** | Returns the list as a string using `JSON.stringify`.
**Format** | `List Export <list>`
**Example** | `List Export MyList`

##### Parameters
| | |
------------ | -------------
**\<list\>** | The list in string form where **\<list\>** is the name of the list.

_Note: The above example, `List Export MyList`, would return the parameter **MyList**._

***

#### List Get
| | |
------------ | -------------
**Info** | Returns a value from the list. `<index>` is an optional index. If no index is included, a random element is returned. "First" and "Last" are valid `<index>` values.
**Format** | `List Get <list> <index/First/Last>`
**Example** | `List Get MyList`
**Example with Index** | `List Get MyList 1`
**Example with Index (Last)** | `List Get MyList Last`

##### Parameters
| | |
------------ | -------------
**value** | The value returned from the list or "None found" if there are no items in the list.
**position** | The position of the value in the list (starting from 1) or `-1` if not found.
**index** | The index of the value in the list (starting from 0) or `-1` if not found.

***

#### List Import
| | |
------------ | -------------
**Info** | Used to import a list from an input `JSON.stringify`'d array.
**Format** | `List Import <list> <import>`
**Example** | `List Import MyList '["item 1","item 2","item 3"]'`

***

#### List Index
| | |
------------ | -------------
**Info** | Returns the position and index (0-based) of a value in the list.
**Format** | `List Index <list> <value>`
**Example** | `List Index MyList {user}`

##### Parameters
| | |
------------ | -------------
**position** | The position of the value in the list (starting from 1) or `-1` if not found.
**index** | The index of the value in the list (starting from 0) or `-1` if not found.

***

#### List Remove
| | |
------------ | -------------
**Info** | Used to remove and return an item from a list. `<index>` is an optional index. If no index is included, a random element is returned. "First" and "Last" are valid `<index>` values.
**Format** | `List Remove <list> <index/First/Last>`
**Example** | `List Remove MyList`
**Example with Index** | `List Remove MyList 1`
**Example with Index (Last)** | `List Remove MyList Last`

##### Parameters
| | |
------------ | -------------
**value** | The value returned from the list or "None found" if there are no items in the list.
**position** | The position of the value in the list (starting from 1) or `-1` if not found.
**index** | The index of the value in the list (starting from 0) or `-1` if not found.

***

#### List Set
| | |
------------ | -------------
**Info** | Adds an item to the list. `<index>` is optional to add at a specific index.
**Format** | `List Set <list> <index> <value>`
**Example** | `List Set MyList 1 {user}`

##### Parameters
| | |
------------ | -------------
**position** | The position of the value in the list (starting from 1) or `-1` if not found.
**index** | The index of the value in the list (starting from 0) or `-1` if not found.
**value** | The value added to the list.

***

## Message
A small handler to allow you to trigger events from another event without using an external application (like OBS or Chat).

### Message Triggers

#### OnMessage
| | |
------------ | -------------
**Info** | Used to fire a set of actions when a message is sent with [`Message Send`](#message-send). Using `*` as the `<message>` will execute the trigger for all messages.
**Format** | `OnMessage <message>`
**Example** | `OnMessage MyCustomMessage`

##### Parameters
| | |
------------ | -------------
**message** | Name of the message.
**data** | Data included with the message.

***

### Message Actions

#### Message Send
| | |
------------ | -------------
**Info** | Used to send a message and trigger other events. `<message>` is used to identify the message for [`OnMessage`](#onmessage) events. `<data>` is any information you want to pass through.
**Format** | `Message Send <message> <data>`
**Example** | `Message Send MyCustomMessage {user}`

***

## Miscellaneous
A small selection of actions that are included for increased usability.

### Miscellaneous Triggers

#### OnInit
| | |
------------ | -------------
**Info** | Used to fire a set of actions when Kruiz Control starts.
**Format** | `OnInit`
**Example** | `OnInit`

***

### Miscellaneous Actions

#### Cooldown Apply
| | |
------------ | -------------
**Info** | Used to apply a cooldown to triggers. `<name>` is the identifier for the cooldown. `<seconds>` is the number of seconds before the trigger can fire again.
**Format** | `Cooldown Apply <name> <seconds>`
**Example** | `Cooldown Apply MyCustomTrigger 30`

***

#### Cooldown Check
| | |
------------ | -------------
**Info** | Used to check if a cooldown is active. `<name>` is the identifier for the cooldown.
**Format** | `Cooldown Check <name>`
**Example** | `Cooldown Check MyCustomTrigger`

##### Parameters
| | |
------------ | -------------
**\<name\>** | [True/False] Whether or not the cooldown is active where **\<name\>** is the name of the cooldown.

_Note: The above example, `Cooldown Check MyCustomTrigger`, would return the parameter **MyCustomTrigger**._

***

#### Delay
| | |
------------ | -------------
**Info** | Used to wait a specific number of seconds before taking the next action.
**Format** | `Delay <seconds>`
**Example** | `Delay 8`

***

#### Error
| | |
------------ | -------------
**Info** | Used to `console.error` log a message for use in debugging or testing.
**Format** | `Error <message>`
**Example** | `Error "Is this called?"`

***

#### Eval
**USE [Function](#function) FOR MORE COMPLEX LOGIC**

| | |
------------ | -------------
**Info** | Used with eval() evaluate a string as a function. This enables custom logic to be used in the script. `<expression_or_function>` is explained below.
**Format** | `Eval <expression_or_function>`
**Example** | `Eval ({total: {total} + 1})`

`<expression_or_function>` is a javascript expression or function that returns an Object. Each property of the Object is usable as a parameter in the rest of the trigger.

If you need a _simple_ expression to return parameters, wrap the expression in parenthesis. The example below increments a parameter named _total_ by 1.
```js
Eval '({total: {total} + 1})'
```

If you need a function rather than an expression, use the below format. The below returns a random element from an array in _api_data_.
```js
Eval '(function() { var arr = [api_data]; return {random: arr[Math.floor(Math.random() * arr.length)]}}())'
```

If a `continue` parameter is returned and the value is `false`, the trigger will exit and not continue processing actions.

If an `actions` array parameter is returned, each item of the array will be inserted into the event and processed.

***

#### Exit
| | |
------------ | -------------
**Info** | Used to exit an event without processing the rest of the actions.
**Format** | `Exit`
**Example** | `Exit`

***

#### Function
| | |
------------ | -------------
**Info** | Used to create a javascript function using the input text. This enables custom logic to be used in the script. `<function>` is explained below.
**Format** | `Function <function>`
**Example** | `Function 'return {total: {total} + 1}'`

`<function>` is a javascript function body. For reference, please see this [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function). If the function returns an object, each property of the Object is usable as a parameter in the rest of the trigger.

The below returns a random element from an array in _api_data_.
```js
Function 'var arr = [api_data]; return {random: arr[Math.floor(Math.random() * arr.length)]}'
```

If a `continue` parameter is returned and the value is `false`, the trigger will exit and not continue processing actions.

If an `actions` array parameter is returned, each item of the array will be inserted into the event and processed.

***

#### If
The **If** action lets you exit out of a trigger if a specific criteria isn't met by comparing two values.

The following `<comparator>` values are valid: `=`, `<`, `>`, `<=`, `>=`, `!=` (not equal).

Multiple comparisons can be combined in one **If** line using the following `<conjunction>` values: `and`, `or`.

The `<optional_skip>` value allows you to specify the number of lines to skip if the criteria is not met. This value is completely optional and allows for advanced logic handling.


| | |
------------ | -------------
**Info** | Used to determine whether or not the trigger should complete the rest of the actions.
**Format** | `If <optional_skip> <value_a> <comparator> <value_b> <conjunction> <value_c> <comparator> <value_d> ...`
**Example (single comparison)** | `If {amount} >= 100`
**Example (single comparison with skip value)** | `If 3 {amount} >= 100`
**Example (two comparisons)** | `If {amount} >= 100 and {amount} < 1000`
**Example (two comparisons with skip value)** | `If 2 {amount} >= 100 and {amount} < 1000`
**Example (multiple comparisons)** | `If {amount} >= 100 and {amount} < 1000 and {amount} != 123`
**Example (multiple comparisons with skip value)** | `If 6 {amount} >= 100 and {amount} < 1000 and {amount} != 123`

***

#### Log
| | |
------------ | -------------
**Info** | Used to `console.log` log a message for use in debugging or testing. Logs do not show in the OBS log file but [`Error`](#error) logs do.
**Format** | `Log <message>`
**Example** | `Log "Is this called?"`

***

#### Play
| | |
------------ | -------------
**Info** | Used to play a sound effect inside of the _sounds_ folder. `<volume>` is a number between 1 and 100. `<wait/nowait>` determines whether or not the script waits until the song is done playing before completing the next action.
**Format** | `Play <volume> <wait/nowait> <song_file>`
**Example** | `Play 30 wait MashiahMusic__Kygo-Style-Melody.wav`

***

#### Reset
| | |
------------ | -------------
**Info** | Used to reload Kruiz Control and read in the most recent trigger information.
**Format** | `Reset`
**Example** | `Reset`

***

#### Skip
| | |
------------ | -------------
**Info** | Used to skip over the next `<number>` of lines in an event.
**Format** | `Skip <number>`
**Example** | `Skip 3`

***

## OBS
Enables the ability to interact with and respond to OBS.

### OBS Triggers

#### OnOBSCustomMessage
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a custom message is sent. Used to receive triggers from [OBS Send](#obs-send). Using `*` as the `<message>` will execute the trigger for all messages.
**Format** | `OnOBSCustomMessage <message>`
**Example** | `OnOBSCustomMessage "My Custom Message"`

##### Parameters
| | |
------------ | -------------
**message** | The name of the custom message.
**data** | The data included with the message (or an empty string).

***

#### OnOBSSourceVisibility
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a source's visibility is changed.
**Format** | `OnOBSSourceVisibility <scene> <source> <on/off/toggle>`
**Example** | `OnOBSSourceVisibility Webcam Camera off`

##### Parameters
| | |
------------ | -------------
**visible** | The current visibility setting.

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
**Info** | Used to trigger a set of actions when the scene changes in OBS. This is fired once the new scene is loaded. Using `*` as the `<scene>` will execute the trigger for all scenes.
**Format** | `OnOBSSwitchScenes <scene>`
**Example** | `OnOBSSwitchScenes BRB`

##### Parameters
| | |
------------ | -------------
**scene** | The scene switched to.

***

#### OnOBSTransitionTo
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a transition to a scene starts. Allows triggers to occur prior to a scene switch. Using `*` as the `<scene>` will execute the trigger for all scenes.
**Format** | `OnOBSTransitionTo <scene>`
**Example** | `OnOBSTransitionTo BRB`

##### Parameters
| | |
------------ | -------------
**from** | The scene being switched from.
**scene** | The scene being switched to.

***

### OBS Actions

#### OBS CurrentScene
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

#### OBS Mute
| | |
------------ | -------------
**Info** | Used to mute or unmute the specified audio source in OBS. Using `toggle` alternates the mute setting.
**Format** | `OBS Mute <source> <on/off/toggle>`
**Example** | `OBS Mute Mic/Aux on`

***

#### OBS Position
| | |
------------ | -------------
**Info** | Use this to move an OBS source to the specified `<x>` and `<y>` coordinate.
**Format** | `OBS Position <scene> <source> <x> <y>`
**Example** | `OBS Position BRB Webcam 240 600`

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

#### OBS SceneSource
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source in a specific scene in OBS. Using `toggle` switches the visibility.
**Format** | `OBS SceneSource <scene> <source> <on/off/toggle>`
**Example** | `OBS SceneSource Webcam Camera on`

***

#### OBS Send
| | |
------------ | -------------
**Info** | Used to send a custom event to through the OBS websocket. `<message>` is the identifier of the message. (Optional) `<data>` is anything to send with the message.
**Format** | `OBS Send <message> <data>`
**Example** | `OBS Send PlayShikaka`
**Example (with data)** | `OBS Send PlayAudio Shikaka`

_Note: Messages are echo'd to all websocket-connected clients. This is useful for connecting other browser sources or triggering other triggers._

***

#### OBS Source
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source in OBS. Only works if the source is in the current scene. Using `toggle` switches the visibility.
**Format** | `OBS Source <source> <on/off/toggle>`
**Example** | `OBS Source Webcam off`

_Note: The source must be in the current/active scene for this to trigger._

***

#### OBS Source Filter
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source filter in OBS.
**Format** | `OBS Source <source> Filter <filter> <on/off/toggle>`
**Example** | `OBS Source Webcam Filter Rainbow on`

_Note: The source does not need to be in current/active scene for this to trigger._

***

#### OBS Source Text
| | |
------------ | -------------
**Info** | Used to change the text of a text source in OBS.
**Format** | `OBS Source <source> Text <text>`
**Example** | `OBS Source RecentFollow Text {user}`

_Note: The text source does not need to be in current/active scene for this to trigger._

***

#### OBS Source URL
| | |
------------ | -------------
**Info** | Used to change the URL of a browser source in OBS.
**Format** | `OBS Source <source> URL <url>`
**Example** | `OBS Source "Browser" URL "https://github.com/Kruiser8/Kruiz-Control"`

_Note: The browser source does not need to be in current/active scene for this to trigger._

***

#### OBS StartStream
| | |
------------ | -------------
**Info** | Used to start the stream in OBS. If the stream is already live, nothing will happen.
**Format** | `OBS StartStream`
**Example** | `OBS StartStream`

***

#### OBS StopStream
| | |
------------ | -------------
**Info** | Used to stop the stream in OBS. If the stream is already stopped, nothing will happen.
**Format** | `OBS StopStream`
**Example** | `OBS StopStream`

***

#### OBS TakeSourceScreenshot
| | |
------------ | -------------
**Info** | Used to take a screenshot of an OBS source and save it to a file. `<file>` is the absolute path to a file.
**Format** | `OBS TakeSourceScreenshot <source> <file>`
**Example** | `OBS TakeSourceScreenshot Webcam "C:\Users\YOUR_USER_NAME\Documents\Stream\screenshot.png"`

***

#### OBS Version
| | |
------------ | -------------
**Info** | Used to retrieve the version of the OBS Websocket. This is helpful when debugging newer features.
**Format** | `OBS Version`
**Example** | `OBS Version`

##### Parameters
| | |
------------ | -------------
**version** | The version of the websocket.

***

#### OBS Volume
| | |
------------ | -------------
**Info** | Used to change the volume of an audio source. `<volume>` must be a number between 0.0 and 1.0. Note, volume stands for the is not a percentage.
**Format** | `OBS Volume <source> <volume>`
**Example** | `OBS Volume "Desktop Audio" 0.2`

##### Parameters
| | |
------------ | -------------
**previous_volume** | The volume of the source before changing. This allows users to revert the volume to the prior level.

***

## Random
Adds the ability to randomly choose between multiple actions.

### Random Triggers
None at the moment.

***

### Random Actions

#### Random Equal
| | |
------------ | -------------
**Info** | Randomly selects an action. Note that "Equal" is optional.
**Format** | `Random Equal <action> <action> ...`
**Example** | `Random Equal "chat send 'hello world'" "chat send 'did you know tarantulas molt?'"`
**Example without "Equal"** | `Random "chat send 'a'" "chat send 'b'" "chat send 'c'"`

***

#### Random Number
| | |
------------ | -------------
**Info** | Randomly generates an integer between a min and max value (`[min, max)`). If no input is specified, 0 is used as the min and 100 is used as the max.
**Format** | `Random Number <optional_min> <optional_max>`
**Example** | `Random Number 30 75`
**Example without values** | `Random Number`
**Example with min only** | `Random Number 20`

##### Parameters
| | |
------------ | -------------
**number** | The number produced by the random generation.

***

#### Random Probability
| | |
------------ | -------------
**Info** | Randomly selects an action based on the input probabilities. The `<number>` values are scaled to 100 to provide a normalized probability.
**Format** | `Random Probability <action> <number> <action> <number> ...`
**Example** | `Random Probability "chat send 'hello world'" 3 "chat send 'did you know tarantulas molt?'" 1`

***

## SLOBS
Enables the ability to interact with and respond to SLOBS.

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
**Info** | Used to trigger a set of actions when the scene changes in SLOBS. Using `*` as the `<scene>` will execute the trigger for all scenes.
**Format** | `OnSLOBSSwitchScenes <scene>`
**Example** | `OnSLOBSSwitchScenes BRB`

##### Parameters
| | |
------------ | -------------
**scene** | The scene switched to.

***

### SLOBS Actions

#### SLOBS CurrentScene
| | |
------------ | -------------
**Info** | Used to get the current active scene in SLOBS.
**Format** | `SLOBS CurrentScene`
**Example** | `SLOBS CurrentScene`

##### Parameters
| | |
------------ | -------------
**current_scene** | The name of the active scene.

***

#### SLOBS Flip
| | |
------------ | -------------
**Info** | Used to flip a source in SLOBS.
**Format** | `SLOBS Flip <scene> <source> <x/y>`
**Example** | `SLOBS Flip Webcam Camera x`

***

#### SLOBS Rotate
| | |
------------ | -------------
**Info** | Used to rotate a source in SLOBS. `<degree>` is any number (decimals allowed). This resets the base rotation to 0 before applying the rotation.
**Format** | `SLOBS Rotate <scene> <source> <degree>`
**Example** | `SLOBS Rotate Webcam Camera 90`

***

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

#### SLOBS SceneFolder
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a folder (and all nested sources) in a specific scene in SLOBS.
**Format** | `SLOBS SceneFolder <scene> <folder> <on/off>`
**Example** | `SLOBS SceneFolder Videos Reaction on`

***

#### SLOBS SceneSource
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source in a specific scene in SLOBS.
**Format** | `SLOBS SceneSource <scene> <source> <on/off>`
**Example** | `SLOBS SceneSource Webcam Camera on`

***

#### SLOBS Source
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source in SLOBS. Defaults to the current scene.
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
**data** | The complete json event (for use with [Eval](#eval) or [Function](#function)).

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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

### StreamElements Actions
None at the moment.

***

## Streamlabs
Enables the ability to trigger actions based on Streamlabs alerts.

The default alert triggers require that your Streamlabs alert box is open. This allows Kruiz Control to synchronize with your alerts and trigger actions at the same time as the alerts.

Use the `NoSync` version of a trigger if:
- You do not use the alert box for a specific alert type.
- You want a trigger to run as soon as alerts come in.
- You do not always have the alert box open but need the trigger to always run.

### Streamlabs Triggers

#### OnSLTwitchBits | OnSLTwitchBitsNoSync
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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLDonation | OnSLDonationNoSync
| | |
------------ | -------------
**Info** | Used to trigger actions when someone donates through Streamlabs.
**Format** | `OnSLDonation`
**Example** | `OnSLDonation`

##### Parameters
| | |
------------ | -------------
**user** | The user that donated.
**amount** | The numeric amount of the donation. Use this in comparisons.
**formatted** | The formatted amount using the locale's currency format.
**message** | The message included with the donation.
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLTiltifyDonation | OnSLTiltifyDonationNoSync
| | |
------------ | -------------
**Info** | Used to trigger actions when someone triggers a tiltify donation through Streamlabs.
**Format** | `OnSLTiltifyDonation`
**Example** | `OnSLTiltifyDonation`

##### Parameters
| | |
------------ | -------------
**user** | The user that donated.
**amount** | The numeric amount of the donation. Use this in comparisons.
**formatted** | The formatted amount using the locale's currency format.
**message** | The message included with the donation.
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLPatreonPledge | OnSLPatreonPledgeNoSync
| | |
------------ | -------------
**Info** | Used to trigger actions when someone pledges on Patreon through Streamlabs.
**Format** | `OnSLPatreonPledge`
**Example** | `OnSLPatreonPledge`

##### Parameters
| | |
------------ | -------------
**user** | The user that donated.
**amount** | The numeric amount of the donation. Use this in comparisons.
**formatted** | The formatted amount using the locale's currency format.
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLTwitchFollow | OnSLTwitchFollowNoSync
| | |
------------ | -------------
**Info** | Used to trigger actions when someone follows the channel.
**Format** | `OnSLTwitchFollow`
**Example** | `OnSLTwitchFollow`

##### Parameters
| | |
------------ | -------------
**user** | The user that followed.
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLTwitchCommunityGiftSub | OnSLTwitchCommunityGiftSubNoSync
| | |
------------ | -------------
**Info** | Used to trigger actions when someone gifts community subscriptions to the channel.
**Format** | `OnSLTwitchCommunityGiftSub`
**Example** | `OnSLTwitchCommunityGiftSub`

##### Parameters
| | |
------------ | -------------
**gifter** | The user that gifted the subscription.
**amount** | The number of subscriptions gifted by the gifter.
**tier** | The tier of the subscription. Possible values are `Tier 1`, `Tier 2`, `Tier 3`, and `Prime`.
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLTwitchGiftSub | OnSLTwitchGiftSubNoSync
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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLTwitchHost | OnSLTwitchHostNoSync
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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLTwitchRaid | OnSLTwitchRaidNoSync
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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

***

#### OnSLTwitchSub | OnSLTwitchSubNoSync
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
**data** | The complete json message (for use with [Eval](#eval) or [Function](#function)).

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
**Format** | `OnTimer <name> <interval> <offset>`
**Example** | `OnTimer MyTimer 300 10`

***

### Timer Actions

#### Timer Reset
| | |
------------ | -------------
**Info** | Used to reset a timer based on the `<name>`. This can be used to interrupt a timer and restart it.
**Format** | `Timer Reset <name>`
**Example** | `Timer Reset MyTimer`

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
**\<name\>** | The variable value where **\<name\>** is the name of the variable.

_Note: The above example, `Variable Load Recent_Sub`, would return the parameter **Recent_Sub**._

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
**\<name\>** | The variable value where **\<name\>** is the name of the variable.

_Note: The above example, `Variable Set Recent_Sub Kruiser8`, would return the parameter **Recent_Sub**._

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
**\<name\>** | The variable value where **\<name\>** is the name of the variable.

_Note: The above example, `Variable Global Load Recent_Sub`, would return the parameter **Recent_Sub**._

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
**\<name\>** | The variable value where **\<name\>** is the name of the variable.

_Note: The above example, `Variable Global Set Recent_Sub Kruiser8`, would return the parameter **Recent_Sub**._
