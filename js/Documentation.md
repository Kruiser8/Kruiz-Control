# Kruiz Control Documentation
Each handler provides its own triggers and actions that can be used in a triggers file. These are detailed below after the general formatting.

## Table of Contents

- [General](#general)
  * [Case Sensitivity](#case-sensitivity)
  * [Quotes](#quotes)
  * [Comments](#comments)
  * [Parameters](#parameters)
  * [Aliases](#aliases)
- [Default Parameters](#default-parameters)
- [Action](#action)
  * [Triggers](#action-triggers)
    + [OnAction](#onaction)
  * [Actions](#action-actions)
    + [Action](#action-1)
- [API](#api)
  * [Triggers](#api-triggers)
  * [Actions](#api-actions)
    + [API Clear](#api-clear)
    + [API Data](#api-data)
    + [API Get](#api-get)
    + [API Header](#api-header)
    + [API Method](#api-method)
    + [API RawData](#api-rawdata)
    + [API Send](#api-send)
    + [API Url](#api-url)
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
- [Cooldown](#cooldown)
  * [Triggers](#cooldown-triggers)
  * [Actions](#cooldown-actions)
    + [Cooldown Apply](#cooldown-apply)
    + [Cooldown Check](#cooldown-check)
    + [Cooldown Clear](#cooldown-clear)
    + [Cooldown Global Apply](#cooldown-global-apply)
    + [Cooldown Global Check](#cooldown-global-check)
    + [Cooldown Global Clear](#cooldown-global-clear)
- [Debug](#debug)
  * [Triggers](#debug-triggers)
  * [Actions](#debug-actions)
    + [Debug](#debug-1)
    + [Debug OBS](#debug-obs)
    + [Debug Parser](#debug-parser)
    + [Debug SLOBS](#debug-slobs)
    + [Debug StreamElements](#debug-streamelements)
    + [Debug StreamLabs](#debug-streamlabs)
    + [Debug Twitch](#debug-twitch)
- [Discord](#discord)
  * [Triggers](#discord-triggers)
  * [Actions](#discord-actions)
    + [Discord Create](#discord-create)
    + [Discord Color](#discord-color)
    + [Discord Delete](#discord-delete)
    + [Discord Description](#discord-description)
    + [Discord Field](#discord-field)
    + [Discord File](#discord-file)
    + [Discord FooterIcon](#discord-footericon)
    + [Discord FooterText](#discord-footertext)
    + [Discord Image](#discord-image)
    + [Discord Message](#discord-message)
    + [Discord Send](#discord-send)
    + [Discord Thumbnail](#discord-thumbnail)
    + [Discord Title](#discord-title)
    + [Discord Update](#discord-update)
    + [Discord Url](#discord-url)
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
    + [List Empty](#list-empty)
    + [List Export](#list-export)
    + [List Get](#list-get)
    + [List Global](#list-global)
    + [List Import](#list-import)
    + [List Index](#list-index)
    + [List Join](#list-join)
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
    + [AsyncFunction](#asyncfunction)
    + [Delay](#delay)
    + [Error](#error)
    + [Exit](#exit)
    + [Function](#function)
    + [Globals](#globals)
    + [If](#if)
    + [Log](#log)
    + [Loop](#loop)
    + [Play](#play)
    + [Play Stop](#play-stop)
    + [Reset](#reset)
    + [Skip](#skip)
- [OBS](#obs)
  * [Triggers](#obs-triggers)
    + [OnOBSCustomMessage](#onobscustommessage)
    + [OnOBSSourceVisibility](#onobssourcevisibility)
    + [OnOBSSourceFilterVisibility](#onobssourcefiltervisibility)
    + [OnOBSStreamStarted](#onobsstreamstarted)
    + [OnOBSStreamStopped](#onobsstreamstopped)
    + [OnOBSSwitchScenes](#onobsswitchscenes)
    + [OnOBSTransitionTo](#onobstransitionto)
  * [Actions](#obs-actions)
    + [OBS AddSceneItem](#obs-addsceneitem)
    + [OBS CurrentScene](#obs-currentscene)
    + [OBS Flip](#obs-flip)
    + [OBS IsSceneSourceVisible](#obs-isscenesourcevisible)
    + [OBS IsSourceActive](#obs-issourceactive)
    + [OBS Media Duration](#obs-media-duration)
    + [OBS Media Path](#obs-media-path)
    + [OBS Media Pause](#obs-media-pause)
    + [OBS Media Play](#obs-media-play)
    + [OBS Media Restart](#obs-media-restart)
    + [OBS Media Stop](#obs-media-stop)
    + [OBS Mute](#obs-mute)
    + [OBS Position](#obs-position)
    + [OBS Refresh](#obs-refresh)
    + [OBS Rotate](#obs-rotate)
    + [OBS SaveReplayBuffer](#obs-savereplaybuffer)
    + [OBS Scene](#obs-scene)
    + [OBS SceneSource](#obs-scenesource)
    + [OBS Send](#obs-send)
    + [OBS Size](#obs-size)
    + [OBS Source](#obs-source)
    + [OBS Source Filter](#obs-source-filter)
    + [OBS Source Text](#obs-source-text)
    + [OBS Source URL](#obs-source-url)
    + [OBS StartReplayBuffer](#obs-startreplaybuffer)
    + [OBS StartStream](#obs-startstream)
    + [OBS Stats](#obs-stats)
    + [OBS StopReplayBuffer](#obs-stopreplaybuffer)
    + [OBS StopStream](#obs-stopstream)
    + [OBS TakeSourceScreenshot](#obs-takesourcescreenshot)
    + [OBS Transition](#obs-transition)
    + [OBS Version](#obs-version)
    + [OBS Volume](#obs-volume)
- [Param](#param)
  * [Triggers](#param-triggers)
  * [Actions](#param-actions)
    + [Param Add](#param-add)
    + [Param Copy](#param-copy)
    + [Param Create](#param-create)
    + [Param Exists](#param-exists)
    + [Param Keyword](#param-keyword)
    + [Param Lower](#param-lower)
    + [Param Negate](#param-negate)
    + [Param Proper](#param-proper)
    + [Param Replace](#param-replace)
    + [Param Subtract](#param-subtract)
    + [Param Upper](#param-upper)
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
    + [SLOBS CurrentScene](#slobs-currentscene)
    + [SLOBS Flip](#slobs-flip)
    + [SLOBS IsSceneSourceVisible](#slobs-isscenesourcevisible)
    + [SLOBS Mute](#slobs-mute)
    + [SLOBS Notification](#slobs-notification)
    + [SLOBS Position](#slobs-position)
    + [SLOBS Rotate](#slobs-rotate)
    + [SLOBS SaveReplayBuffer](#slobs-savereplaybuffer)
    + [SLOBS Scene](#slobs-scene)
    + [SLOBS SceneFolder](#slobs-scenefolder)
    + [SLOBS SceneSource](#slobs-scenesource)
    + [SLOBS Source](#slobs-source)
    + [SLOBS StartReplayBuffer](#slobs-startreplaybuffer)
    + [SLOBS StopReplayBuffer](#slobs-stopreplaybuffer)
    + [SLOBS ToggleStream](#slobs-togglestream)
    + [SLOBS Volume](#slobs-volume)
- [StreamElements](#streamelements)
  * [Triggers](#streamelements-triggers)
    + [OnSETwitchBits](#onsetwitchbits)
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
- [Text-To-Speech](#text-to-speech)
  * [Triggers](#text-to-speech-triggers)
  * [Actions](#text-to-speech-actions)
    + [TTS](#tts)
    + [TTS Stop](#tts-stop)
    + [TTS Voices](#tts-voices)
- [Timer](#timer)
  * [Triggers](#timer-triggers)
    + [OnTimer](#ontimer)
  * [Actions](#timer-actions)
    + [Timer Reset](#timer-reset)
    + [Timer Start](#timer-start)
    + [Timer Stop](#timer-stop)
- [Variable](#variable)
  * [Triggers](#variable-triggers)
  * [Actions](#variable-actions)
    + [Variable Load](#variable-load)
    + [Variable Remove](#variable-remove)
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
When `[parameter]` is used, the value of the parameter is JSON.stringify'd before replacement. **This is primarily for use with [Function](#function).** This allows parameters to be easily used and be properly escaped when used in javascript code.

For example, here's the result when used in the [Function](#function) action.
```
Function 'var name = [user]; var data = [data]; // rest of code ... }())
> (function() { var name = "Kruiser8"; var data = {"property": value}; // rest of code ...'
```

***

### Aliases
As of Kruiz Control v1.4, certain triggers now allow for multiple inputs. Consider the following example:
```
OnCommand mbv 0 !so !sh !caster !shout
Chat Send "Go check out {after} at twitch.tv/{after}"
```
The commands, `!so`, `!sh`, `!caster`, and `!shout` will all cause the message to be sent, regardless of which one is used. This allows you to easily set up _aliases_ for triggers. The following triggers now support aliases:
- OnAction
- OnCommand
- OnKeyword
- OnMessage
- OnChannelPoint
- OnCommunityGoalStart
- OnCommunityGoalProgress
- OnCommunityGoalComplete
- OnOBSSwitchScenes
- OnOBSTransitionTo
- OnOBSCustomMessage
- OnSLOBSSwitchScenes

***

## Default Parameters
The following parameters are always available. Use the `_successful_` and `_unsuccessful_` parameters to test that the <a href="https://github.com/Kruiser8/Kruiz-Control/blob/master/settings/Settings.md#kruiz-control-settings">Kruiz Control settings</a> are correct.

#### Parameters
| | |
------------ | -------------
**\_successful\_** | A comma delimited list of handlers that initialized correctly.
**\_unsuccessful\_** | A comma delimited list of handlers that did not initialize correctly.
**\_kc\_event\_id\_** | A unique id for each event occurrence in Kruiz Control. If you need a unique identifier, use this. The id resets to 0 after 1,000,000,000.

***

## Action
Enables the ability to create your own actions within Kruiz Control.

### Action Triggers

#### OnAction
| | |
------------ | -------------
**Info** | Used to define a list of actions that will get inserted into an event when the provided `<action>` is called.
**Format** | `OnAction <action>`
**Format w/ Aliases** | `OnAction <action1> <action2> ...`
**Example** | `OnAction ReadFile`
**Example w/ Aliases** | `OnAction ReadFile rf`

##### Parameters
| | |
------------ | -------------
**action** | The `<action>` performed that triggered this event.
**in#** | The numbered arguments passed to the action. Replace `#` with a number, starting at 1 and ending at the last argument passed into the command.

***

### Action Actions

#### Action
| | |
------------ | -------------
**Info** | Used to run an action by passing it through. This allows actions to be fired dynamically within an event. `<action>` is the full action that you want to complete. The action can be provided as a single argument (inside of quotes) or written out normally.
**Format** | `Action <action>`
**Example** | `Action Chat Send "Hello world"`
**Example w/ single argument** | `Action "Chat Send 'Hello world'"`

***

## API
Enables the ability to call an API and use the response.

### API Triggers
None at the moment.

***

### API Actions

#### API Clear
| | |
------------ | -------------
**Info** | Used to clear an API configuration. `<name>` is the name of the API to clear.
**Format** | `API Clear <name>`
**Example** | `API Clear HostLookup`

***

#### API Data
| | |
------------ | -------------
**Info** | Used to add a key-value pair as data to an API configuration. `<name>` is the name of the API to update. `<key>` and `<value>` are the inputs.
**Format** | `API Data <name> <key> <value>`
**Example** | `API Data TwitchAPI login {user}`

***

#### API Get
| | |
------------ | -------------
**Info** | Used to call an API and retrieve the data. `<url>` is the API to call.
**Format** | `API GET <url>`
**Example** | `API GET https://api.crunchprank.net/twitch/hosts/kruiser8?implode&display_name`

##### Parameters
| | |
------------ | -------------
**api_data** | The response from calling the API. If the API call succeeds and returns no data, this will be `success`. If the call fails, this will be `error`.

***

#### API Header
| | |
------------ | -------------
**Info** | Used to add a header to an API configuration. `<name>` is the name of the API to update. `<key>` and `<value>` are the input header.
**Format** | `API Header <name> <key> <value>`
**Example** | `API Header TwitchAPI "Authorization" "Oauth {token}"`

***

#### API Method
| | |
------------ | -------------
**Info** | Used to set the method of an API configuration. `<name>` is the name of the API to update. `<method>` is the type of API call (i.e. GET, POST, PUT, DELETE, etc.). If this is not called, the default method is `GET`.
**Format** | `API Method <name> <method>`
**Example** | `API Method TwitchAPI POST`

***

#### API RawData
| | |
------------ | -------------
**Info** | Used to add raw data to an API configuration. `<name>` is the name of the API to call. `<raw_data>` is the API data. This can be used to add json or other formats to the API body.
**Format** | `API RawData <name> <raw_data>`
**Example** | `API RawData DummyAPI "{ user: kruiser8, text: "my custom text" }"`

***

#### API Send
| | |
------------ | -------------
**Info** | Used to send an API configuration. `<name>` is the name of the API to call.
**Format** | `API Send <name>`
**Example** | `API Send TwitchAPI`

##### Parameters
| | |
------------ | -------------
**api_data** | The response from calling the API. If the API call succeeds and returns no data, this will be `success`. If the call fails, this will be `error`.

***

#### API Url
| | |
------------ | -------------
**Info** | Used to set the url of an API configuration. `<name>` is the name of the API to update. `<url>` is the API to call.
**Format** | `API Url <name> <url>`
**Example** | `API Url TwitchAPI "https://api.twitch.tv/helix/users/follows"`

***

## Channel Points
Enables the ability to run actions when channel point rewards are redeemed.

### Channel Point Triggers

#### OnChannelPoint
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a channel point reward is redeemed. Using `*` as the `<reward_name>` will execute the trigger for all channel point rewards.
**Format** | `OnChannelPoint <reward_name>`
**Format w/ Aliases** | `OnChannelPoint <reward_name1> <reward_name2> ...`
**Example** | `OnChannelPoint "Example Reward"`
**Example w/ Aliases** | `OnChannelPoint "Resize" "Left View"`

_Note: Default channel point rewards are not supported: `Unlock a Random Sub Emote`, `Send a Message in Sub-Only Mode`, `Choose an Emote to Unlock`, `Highlight My Message`, and `Modify a Single Emote`._

##### Parameters
| | |
------------ | -------------
**reward** | The name of the channel point reward that was redeemed.
**user** | The display name of the user that redeemed the channel point reward.
**message** | The message included with the channel point redemption (if one is provided)
**data** | The complete json channel point message (for use with [Function](#function)).

***

#### OnCommunityGoalComplete
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a community goal is completed. Using `*` as the `<goal_title>` will execute the trigger for all channel point rewards.
**Format** | `OnCommunityGoalComplete <goal_title>`
**Format w/ Aliases** | `OnCommunityGoalComplete <goal_title1> <goal_title2> ...`
**Example** | `OnCommunityGoalComplete "Example Goal"`
**Example w/ Aliases** | `OnCommunityGoalComplete "Example Goal" "Extra Sunday Stream" ...`

##### Parameters
| | |
------------ | -------------
**goal** | The title of the community goal.
**user** | The display name of the user that completed the goal.
**amount** | The amount of points donated to complete the goal.
**user_total** | The total amount of points contributed by the user.
**progress** | The current amount of points contributed towards the goal.
**total** | The amount of points required to complete the goal.
**data** | The complete json community goal message (for use with [Function](#function)).

#### OnCommunityGoalProgress
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a user contributes towards a goal. Using `*` as the `<goal_title>` will execute the trigger for all channel point rewards.
**Format** | `OnCommunityGoalProgress <goal_title>`
**Format w/ Aliases** | `OnCommunityGoalProgress <goal_title1> <goal_title2> ...`
**Example** | `OnCommunityGoalProgress "Example Goal"`
**Example w/ Aliases** | `OnCommunityGoalProgress "Example Goal" "Extra Sunday Stream" ...`

##### Parameters
| | |
------------ | -------------
**goal** | The title of the community goal.
**user** | The display name of the user that completed the goal.
**amount** | The amount of points donated to complete the goal.
**user_total** | The total amount of points contributed by the user.
**progress** | The current amount of points contributed towards the goal.
**total** | The amount of points required to complete the goal.
**data** | The complete json community goal message (for use with [Function](#function)).

***

#### OnCommunityGoalStart
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the streamer starts a goal. Using `*` as the `<goal_title>` will execute the trigger for all channel point rewards.
**Format** | `OnCommunityGoalStart <goal_title>`
**Format w/ Aliases** | `OnCommunityGoalStart <goal_title1> <goal_title2> ...`
**Example** | `OnCommunityGoalStart "Example Goal"`
**Example w/ Aliases** | `OnCommunityGoalStart "Example Goal" "Extra Sunday Stream" ...`

##### Parameters
| | |
------------ | -------------
**goal** | The title of the community goal.
**data** | The complete json community goal message (for use with [Function](#function)).

***

### Channel Point Actions
None at the moment.

***

## Chat
Enables the ability to take actions on chat message and send messages. Note that Kruiz Control can respond to messages sent by Kruiz Control.

### Chat Triggers
Chat triggers use a `<permission>` parameter to specify who can use a command. The following values can be combined in any order.

- *b* - Broadcaster
- *s* - Subscriber
- *f* - Founder
- *v* - VIP
- *m* - Moderator
- *n* - Check if a user has _none_ of the permissions above.
- *e* - Everyone

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
**Format w/ Aliases** | `OnCommand <permission> <optional_info> <cooldown> <command1> <command2> <command3> ...`
**Example** | `OnCommand e 0 !example`
**Example w/ Aliases** | `OnCommand bvm 0 !so !caster !sh !shout`

##### Parameters
| | |
------------ | -------------
**command** | The command that triggered the event.
**user** | The display name of the user that sent the command.
**after** | The message excluding the command.
**message** | The entire chat message, including the command.
**data** | An object with all metadata about the message (for use with [Function](#function)).
**arg#** | The numbered arguments in the message. Replace `#` with a number, starting at 1 and ending at the last argument passed into the command.

***

#### OnEveryChatMessage
_WARNING: Kruiz Control responds to messages sent by Kruiz Control. Please be mindful of your commands, keywords, and messages so that you do not trigger an infinite loop of messages. Twitch has [chat limits](https://dev.twitch.tv/docs/irc/guide#command--message-limits) and will block you from chatting._

| | |
------------ | -------------
**Info** | Used to trigger a set of actions when ever a chat message is sent.
**Format** | `OnEveryChatMessage`
**Example** | `OnEveryChatMessage`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that sent the command.
**message** | The entire chat message, including the command.
**data** | An object with all metadata about the message (for use with [Function](#function)).

***

#### OnKeyword
_WARNING: Kruiz Control responds to messages sent by Kruiz Control. Please be mindful of your commands, keywords, and messages so that you do not trigger an infinite loop of messages. Twitch has [chat limits](https://dev.twitch.tv/docs/irc/guide#command--message-limits) and will block you from chatting._

| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a keyword or phrase appears in a message.
**Format** | `OnKeyword <permission> <optional_info> <cooldown> <command>`
**Format w/ Aliases** | `OnKeyword <permission> <optional_info> <cooldown> <keyword1> <keyword2> <keyword3> ...`
**Example** | `OnKeyword smv 10 "music"`
**Example w/ Aliases** | `OnKeyword e 0 hi hello yo o7`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that triggered the keyword.
**keyword** | The keyword matched by the trigger.
**message** | The chat message.
**data** | An object with all metadata about the message (for use with [Function](#function)).
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
**user** | The display name of the user that sent the command.
**message** | The entire chat message, including the command.
**data** | An object with all metadata about the message (for use with [Function](#function)).

***

### Chat Actions

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

## Cooldown
Adds the ability to give events a cooldown so that they cannot be repeated within a period of time.

### Cooldown Triggers
None at the moment.

***

### Cooldown Actions

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
**cooldown** | The number of seconds (rounded to a whole number) left on the cooldown. This is only returned if the cooldown is active (`<name>` is True).
**cooldown_real** | The decimal number of seconds left on the cooldown. This is only returned if the cooldown is active (`<name>` is True).

_Note: The above example, `Cooldown Check MyCustomTrigger`, would return the parameter **MyCustomTrigger**._

***

#### Cooldown Clear
| | |
------------ | -------------
**Info** | Used to clear (remove) an existing cooldown. `<name>` is the identifier for the cooldown.
**Format** | `Cooldown Clear <name>`
**Example** | `Cooldown Clear MyCustomTrigger`

***

#### Cooldown Global Apply
| | |
------------ | -------------
**Info** | Used to apply a global cooldown to triggers. Global cooldowns persist between sessions (i.e. the cooldown remains after a reset). `<name>` is the identifier for the cooldown. `<seconds>` is the number of seconds before the trigger can fire again.
**Format** | `Cooldown Global Apply <name> <seconds>`
**Example** | `Cooldown Global Apply MyCustomTrigger 30`

***

#### Cooldown Global Check
| | |
------------ | -------------
**Info** | Used to check if a global cooldown is active. Global cooldowns persist between sessions (i.e. the cooldown remains after a reset). `<name>` is the identifier for the cooldown.
**Format** | `Cooldown Global Check <name>`
**Example** | `Cooldown Global Check MyCustomTrigger`

##### Parameters
| | |
------------ | -------------
**\<name\>** | [True/False] Whether or not the cooldown is active where **\<name\>** is the name of the cooldown.
**cooldown** | The number of seconds (rounded to a whole number) left on the cooldown. This is only returned if the cooldown is active (`<name>` is True).
**cooldown_real** | The decimal number of seconds left on the cooldown. This is only returned if the cooldown is active (`<name>` is True).

_Note: The above example, `Cooldown Global Check MyCustomTrigger`, would return the parameter **MyCustomTrigger**._

***

#### Cooldown Global Clear
| | |
------------ | -------------
**Info** | Used to clear (remove) an existing global cooldown. Global cooldowns persist between sessions (i.e. the cooldown remains after a reset). `<name>` is the identifier for the cooldown.
**Format** | `Cooldown Global Clear <name>`
**Example** | `Cooldown Global Clear MyCustomTrigger`

***

## Debug
Adds optional logging to Kruiz Control for debugging purposes.

### Debug Triggers
None at the moment.

***

### Debug Actions

#### Debug
| | |
------------ | -------------
**Info** | Used to enable all debugging.
**Format** | `Debug`
**Example** | `Debug`

***

#### Debug OBS
| | |
------------ | -------------
**Info** | Used to enable debugging for OBS events.
**Format** | `Debug OBS`
**Example** | `Debug OBS`

***

#### Debug Parser
| | |
------------ | -------------
**Info** | Used to enable debugging of Kruiz Control's parser to see how Kruiz Control is interpreting event code.
**Format** | `Debug Parser`
**Example** | `Debug Parser`

***

#### Debug SLOBS
| | |
------------ | -------------
**Info** | Used to enable debugging for SLOBS events.
**Format** | `Debug SLOBS`
**Example** | `Debug SLOBS`

***

#### Debug StreamElements
| | |
------------ | -------------
**Info** | Used to enable debugging for StreamElements events.
**Format** | `Debug StreamElements`
**Example** | `Debug StreamElements`

***

#### Debug Streamlabs
| | |
------------ | -------------
**Info** | Used to enable debugging for Streamlabs events.
**Format** | `Debug Streamlabs`
**Example** | `Debug Streamlabs`

***

#### Debug Twitch
| | |
------------ | -------------
**Info** | Used to enable debugging for Twitch events. This handles channel points, hype trains, and community goals. For alerts, see [`Debug StreamElements`](#debug-streamelements) or [`Debug Streamlabs`](#debug-streamlabs).
**Format** | `Debug Twitch`
**Example** | `Debug Twitch`

***

## Discord
Enables the ability to send messages to discord by creating webhooks and using discord embeds.

In order to create webhooks, follow the `Making a Webhook` section on this page: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks

Once created and configured, click the `Copy Webhook URL` button and put that into a [`Discord Create`](#discord-create) action.

### Discord Triggers
None at the moment.

***

### Discord Actions

#### Discord Clear
| | |
------------ | -------------
**Info** | Used to clear a webhook by name, removing all existing message data. `<name>` is the id that will be used to refer to this webhook in other discord actions. This does not remove the webhook URL.
**Format** | `Discord Clear <name>`
**Example** | `Discord Clear "GeneralChannel"`

***

#### Discord Color
| | |
------------ | -------------
**Info** | Used to customize the color on the left hand side of a discord embed. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<color>` is a hex code for a color (`#1a34b6`).
**Format** | `Discord Color <name> <description>`
**Example** | `Discord Color "GeneralChannel" "#1a34b6"`

***

#### Discord Create
| | |
------------ | -------------
**Info** | Used to create/register a webhook by name for use in later actions. `<name>` is the id that will be used to refer to this webhook in other discord actions. `<url>` is the url of the discord webhook that you create.
**Format** | `Discord Create <name> <url>`
**Example** | `Discord Create "GeneralChannel" https://discord.com/api/webhooks/419746549841564984/769fhue98uywe99ftr8hFEfe878wjfh9wuf988Et`

***

#### Discord Delete
| | |
------------ | -------------
**Info** | Used to delete a message sent via the webhook. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<message_id>` is optional. This defaults to the last sent message.
**Format** | `Discord Delete <name>`
**Example** | `Discord Delete "GeneralChannel"`
**Example w/ Message Id** | `Discord Delete "GeneralChannel" 810814654`

***

#### Discord Description
| | |
------------ | -------------
**Info** | Used to add a description to a discord embed. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<description>` is the text to add as the embed text.
**Format** | `Discord Description <name> <description>`
**Example** | `Discord Description "GeneralChannel" "Live on Twitch!"`

***

#### Discord Field
| | |
------------ | -------------
**Info** | Used to add a field to a discord embed. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<field>` is the text to add as the title of the field. `<value>` is the text to put in the field. `<inline_optional>` is an optional true/false value to specify whether or not to put this field inline (horizontally) with other fields.
**Format** | `Discord Field <name> <field> <value> <inline_optional>`
**Example** | `Discord Field "GeneralChannel" "Game" "The Binding of Isaac: Repentance"`

***

#### Discord File
| | |
------------ | -------------
**Info** | Used to upload a file attachment with a discord message. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<file>` is the relative path to a file to upload. Relative paths start at the Kruiz Control root directory.
**Format** | `Discord File <name> <file>`
**Example w/ relative path** | `Discord File "GeneralChannel" "screenshots/screenshot.png"`

***

#### Discord FooterIcon
| | |
------------ | -------------
**Info** | Used to add an icon to the discord embed footer. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<icon>` is the URL of the icon to add.
**Format** | `Discord FooterIcon <name> <icon>`
**Example** | `Discord FooterIcon "GeneralChannel" "https://static-cdn.jtvnw.net/jtv_user_pictures/4c5ff382-f697-4357-aebb-ff035a82b60c-profile_image-70x70.png"`

***

#### Discord FooterText
| | |
------------ | -------------
**Info** | Used to add text to a discord embed footer. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<text>` is the text to add as the footer text.
**Format** | `Discord FooterText <name> <text>`
**Example** | `Discord FooterText "GeneralChannel" "Kruiser8"`

***

#### Discord Image
| | |
------------ | -------------
**Info** | Used to add an image to a discord embed. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<image>` is the URL of the image to add in the body of the embed.
**Format** | `Discord Image <name> <image>`
**Example** | `Discord Image "GeneralChannel" "https://static-cdn.jtvnw.net/jtv_user_pictures/12a2c0d2-2be5-45fe-9ff9-46d05007c395-profile_banner-480.png"`


***

#### Discord Message
| | |
------------ | -------------
**Info** | Used to add a message to the discord webhook call. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<message>` is the text of the discord message.
**Format** | `Discord Message <name> <message>`
**Example w/ Message** | `Discord Message "GeneralChannel" "Hey folks!"`

***

#### Discord Send
| | |
------------ | -------------
**Info** | Used to send a message to discord, using any embed data currently set. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create).
**Format** | `Discord Send <name>`
**Example** | `Discord Send "GeneralChannel"`
**Example w/ Message** | `Discord Send "GeneralChannel" "Hey folks!"`

##### Parameters
| | |
------------ | -------------
**discord_msg_id** | The id of the message sent. This can be used with [`Discord Update`](#discord-update) and [`Discord Delete`](#discord-delete).

***

#### Discord Thumbnail
| | |
------------ | -------------
**Info** | Used to set the thumbnail for the next embed. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<thumbnail>` is the url to a thumbnail image.
**Format** | `Discord Thumbnail <name> <image>`
**Example** | `Discord Thumbnail "GeneralChannel" "https://static-cdn.jtvnw.net/jtv_user_pictures/4c5ff382-f697-4357-aebb-ff035a82b60c-profile_image-70x70.png"`

***

#### Discord Title
| | |
------------ | -------------
**Info** | Used to set the title for the next embed. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<title>` is the text to use as the title.
**Format** | `Discord Title <name> <image>`
**Example** | `Discord Title "GeneralChannel" "LIVE ON TWITCH"`

***

#### Discord Update
| | |
------------ | -------------
**Info** | Used to update a message previously sent via the webhook using any embed data currently set. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<message_id>` is optional. This defaults to the last sent message.
**Format** | `Discord Update <name> <message_id>`
**Example** | `Discord Update "GeneralChannel"`
**Example w/ Id** | `Discord Update "GeneralChannel" 801801891`

***

#### Discord URL
| | |
------------ | -------------
**Info** | Used to add a link to the discord embed title. `<name>` is the id that was used to register the webhook in a [`Discord Create`](#discord-create). `<url>` is the link URL for the embed.
**Format** | `Discord Url <name> <url>`
**Example** | `Discord Url "GeneralChannel" "https://twitch.tv/kruiser8"`

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

#### List Empty
| | |
------------ | -------------
**Info** | Removes all items from a list.
**Format** | `List Empty <list>`
**Example** | `List Empty MyList`

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

#### List Global
| | |
------------ | -------------
**Info** | Designates a list as global so that it will persist between sessions (i.e. the list remains after a reset). `<on/off>` determines whether to make the list global (`on`) or remove it as a global list (`off`).
**Format** | `List Global <list> <on/off>`
**Example** | `List Global MyList on`

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

#### List Join
| | |
------------ | -------------
**Info** | Used to combine all items in a list into a text value with the specified `<delimiter>` as a separator.
**Format** | `List Join <list> <delimiter>`
**Example** | `List Join MyList ", "`

##### Parameters
| | |
------------ | -------------
**joined** | The result of combining all of the items in a list.

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
**Format w/ Aliases** | `OnMessage <message1> <message2> ...`
**Example** | `OnMessage MyCustomMessage`
**Example w/ Aliases** | `OnMessage MyCustomMessage MyOtherCustomMessage`

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

#### AsyncFunction
`AsyncFunction` is an alternate to [`Function`](#function) that allows you to call javascript code using the `await` keyword. This is for advanced use cases that require API calls, promises, etc. For more information, please see this [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction).

| | |
------------ | -------------
**Info** | Used to create an async javascript function using the input text. For more information see [Function](#function).
**Format** | `AsyncFunction <function>`
**Example** | `AsyncFunction 'return {total: {total} + 1}'`

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

#### Globals
Use this to determine all global variables in Kruiz Control.
| | |
------------ | -------------
**Info** | Used to create a list of all current global variable names. `<name>` is the name of the [`List`](#List) to create.
**Format** | `Globals <name>`
**Example** | `Globals MyGlobals`

##### Example Usage

<table>
<tr>
<td>Sends all global variable names chat</td>
</tr>
<tr>
<td>

```m
OnInit
Globals MyGlobals
List Count MyGlobals
Loop 2 {count}
List Remove MyGlobals
Chat Send {value}
```

</td>
</tr>
</table>

<table>
<tr>
<td>Sends all global variable names and values to an example API</td>
</tr>
<tr>
<td>

```m
OnInit
Globals MyGlobals
List Count MyGlobals
Loop 7 {count}
List Remove MyGlobals
Variable Global Load {value}
API Method GlobalVariable Post
API Url GlobalVariable "http://localhost/api/variable"
API Data GlobalVariable name {value}
API Data GlobalVariable value [{value}]
API Send GlobalVariable
```

</td>
</tr>
</table>

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

#### Loop
| | |
------------ | -------------
**Info** | Used to repeat a set of actions a specified number of times. `<lines>` is the number of actions/lines to repeat. `<times>` is the number of times to repeat the actions/lines.
**Format** | `Loop <lines> <times>`
**Example** | `Loop 8 10`

***

#### Play
| | |
------------ | -------------
**Info** | Used to play a sound effect inside of the _sounds_ folder. `<volume>` is a number greater than 0 and can be greater than 100. `<wait/nowait>` determines whether or not the script waits until the song is done playing before completing the next action.
**Format** | `Play <volume> <wait/nowait> <song_file>`
**Example** | `Play 30 wait MashiahMusic__Kygo-Style-Melody.wav`

***

#### Play Stop
| | |
------------ | -------------
**Info** | Used to stop all sounds that are currently playing in Kruiz Control with `Play`.
**Format** | `Play Stop`
**Example** | `Play Stop`

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
**Format w/ Aliases** | `OnOBSCustomMessage <message1> <message2> ...`
**Example** | `OnOBSCustomMessage "My Custom Message"`
**Example w/ Aliases** | `OnOBSCustomMessage "WidgetConnection" "WidgetError"`

##### Parameters
| | |
------------ | -------------
**message** | The name of the custom message.
**data** | The data included with the message (or an empty string).

***

#### OnOBSSourceFilterVisibility
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a source filter's visibility is changed.
**Format** | `OnOBSSourceFilterVisibility <source> <filter> <on/off/toggle>`
**Example** | `OnOBSSourceFilterVisibility Webcam Rainbow on`

##### Parameters
| | |
------------ | -------------
**visible** | The current visibility setting.

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
**Format w/ Aliases** | `OnOBSSwitchScenes <scene1> <scene2> ...`
**Example** | `OnOBSSwitchScenes "BRB"`
**Example w/ Aliases** | `OnOBSSwitchScenes "BRB" "Intermission"`

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
**Format w/ Aliases** | `OnOBSTransitionTo <scene1> <scene2> ...`
**Example** | `OnOBSTransitionTo "BRB"`
**Example w/ Aliases** | `OnOBSTransitionTo "BRB" "Intermission"`

##### Parameters
| | |
------------ | -------------
**from** | The scene being switched from.
**scene** | The scene being switched to.

***

### OBS Actions

#### OBS AddSceneItem
| | |
------------ | -------------
**Info** | Used to add an existing source to the specified scene. `<scene>` is the scene to add the source. `<source>` is the name of the source to add to the scene. `<on/off>` (default: `on`) is an optional visibility that determines if the source is visible when it's added.
**Format** | `OBS AddSceneItem <scene> <source> <on/off>`
**Example** | `OBS AddSceneItem BRB Webcam off`

***

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

#### OBS Flip
| | |
------------ | -------------
**Info** | Used to flip a source in OBS.
**Format** | `OBS Flip <scene> <source> <x/y>`
**Example** | `OBS Flip Webcam Camera x`

***

#### OBS IsSceneSourceVisible
| | |
------------ | -------------
**Info** | Used to check if the specified source is turned on within the given scene in OBS.
**Format** | `OBS IsSceneSourceVisible <scene> <source>`
**Example** | `OBS IsSceneSourceVisible Alerts TwitchAlerts`

##### Parameters
| | |
------------ | -------------
**is_visible** | [true/false] `true` if the source is visible. Otherwise, `false`.

***

#### OBS IsSourceActive
| | |
------------ | -------------
**Info** | Used to check if the specified source is active in the current scene. A source is active if it could be rendered in the current scene, regardless of visibility status.
**Format** | `OBS IsSourceActive <source>`
**Example** | `OBS IsSourceActive TwitchAlerts`

##### Parameters
| | |
------------ | -------------
**is_active** | [true/false] `true` if the source is active. Otherwise, `false`.

***

#### OBS Media Duration
| | |
------------ | -------------
**Info** | Used to retrieve the duration of a media source. `<source>` is the name of the source. The `<source>` must be active to retrieve the duration.
**Format** | `OBS Media Duration <source>`
**Example** | `OBS Media Duration AlertVideo`

##### Parameters
| | |
------------ | -------------
**duration** | The duration of the file in seconds. If the duration could not be retrieved, `0` is returned.

***

#### OBS Media Path
| | |
------------ | -------------
**Info** | Used to set the file path of a media source. `<source>` is the name of the source. `<path>` is the absolute path to the file.
**Format** | `OBS Media Path <source> <path>`
**Example** | `OBS Media Path AlertVideo "C:/Users/YOUR_USER_NAME/Stream/alert.webm"`

***

#### OBS Media Pause
| | |
------------ | -------------
**Info** | Used to pause a media source. `<source>` is the name of the source.
**Format** | `OBS Media Pause <source>`
**Example** | `OBS Media Pause AlertVideo`

***

#### OBS Media Play
| | |
------------ | -------------
**Info** | Used to play a media source. `<source>` is the name of the source.
**Format** | `OBS Media Play <source>`
**Example** | `OBS Media Play AlertVideo`

***

#### OBS Media Restart
| | |
------------ | -------------
**Info** | Used to restart a media source. `<source>` is the name of the source.
**Format** | `OBS Media Restart <source>`
**Example** | `OBS Media Restart AlertVideo`

***

#### OBS Media Stop
| | |
------------ | -------------
**Info** | Used to stop a media source. `<source>` is the name of the source.
**Format** | `OBS Media Stop <source>`
**Example** | `OBS Media Stop AlertVideo`

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

##### Parameters
| | |
------------ | -------------
**init_x** | The initial value of the x coordinate before moving the source.
**init_y** | The initial value of the y coordinate before moving the source.

***

#### OBS SaveReplayBuffer
| | |
------------ | -------------
**Info** | Used to save the current replay buffer.
**Format** | `OBS SaveReplayBuffer`
**Example** | `OBS SaveReplayBuffer`

***

#### OBS Refresh
| | |
------------ | -------------
**Info** | Used to refresh a browser source in OBS.
**Format** | `OBS Refresh <source>`
**Example** | `OBS Refresh "Kruiz Control"`

***

#### OBS Rotate
| | |
------------ | -------------
**Info** | Used to rotate a source in SLOBS. `<degree>` is any number (decimals allowed). This resets the base rotation to 0 before applying the rotation.
**Format** | `SLOBS Rotate <scene> <source> <degree>`
**Example** | `SLOBS Rotate Webcam Camera 90`

_Note: If you want the source to spin in place, right-click the source and select `Transform` > `Edit Transform`. Change the `Positional Alignment` to `Center`._

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

#### OBS Size
| | |
------------ | -------------
**Info** | Use this to resize an OBS source to the specified `<width>` and `<height>` values.
**Format** | `OBS Size <scene> <source> <width> <height>`
**Example** | `OBS Size BRB Webcam 1920 1080`

_Note: `OBS Position` is not recommended for repositioning sources within groups. Sources in a group are positioned relative to the group, not the scene. Repositioning a source within a group may cause the size of the group to change, changing the source's relative position, and leading to unexpected results._

##### Parameters
| | |
------------ | -------------
**init_width** | The initial width value before resizing the source.
**init_height** | The initial height value before resizing the source.

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

#### OBS StartReplayBuffer
| | |
------------ | -------------
**Info** | Used to start the replay buffer.
**Format** | `OBS StartReplayBuffer`
**Example** | `OBS StartReplayBuffer`

***

#### OBS StartStream
| | |
------------ | -------------
**Info** | Used to start the stream in OBS. If the stream is already live, nothing will happen.
**Format** | `OBS StartStream`
**Example** | `OBS StartStream`

***

#### OBS Stats
| | |
------------ | -------------
**Info** | Used to retrieve OBS statistics.
**Format** | `OBS Stats`
**Example** | `OBS Stats`

##### Parameters
| | |
------------ | -------------
**cpu** | Percent CPU in use by OBS.
**memory** | Amount of memory in MB currently being used by OBS.
**disk_space** | Available disk space on the device being used for recording storage.
**fps** | Current FPS being rendered.
**average_render_time** | Average time in milliseconds that OBS is taking to render a frame.
**render_skipped_frames** | Number of rendered frames skipped by OBS (render frames are frames produced even when not recording or streaming).
**output_skipped_frames** | Number of output frames skipped by OBS (the frames being recorded or streamed).
**data** | The entire [OBS Websocket GetStats output](https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md#getstats).

##### Example Usage

<table>
<tr>
<td>Sends OBS statistics to chat</td>
</tr>
<tr>
<td>

```m
OnInit
OBS Stats
Error "OBS is using {cpu}% CPU and {memory}MB RAM."
Error "OBS is rendering {fps} FPS, skipping {render_skipped_frames} frames total ({output_skipped_frames} skipped during output). Each frames takes an average of {average_render_time}ms to render."
```

</td>
</tr>
</table>


***

#### OBS StopReplayBuffer
| | |
------------ | -------------
**Info** | Used to stop the replay buffer.
**Format** | `OBS StopReplayBuffer`
**Example** | `OBS StopReplayBuffer`

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
**Info** | Used to take a screenshot of an OBS source and save it to a file. `<file>` is the absolute path to a file. The extension put on the file is used to determine the type of file generate. For most users, these are the acceptable extensions: `bmp`, `jpeg`, `jpg`, `pbm`, `pgm`, `png`, `ppm`, `xbm`, `xpm`.
**Format** | `OBS TakeSourceScreenshot <source> <file>`
**Example** | `OBS TakeSourceScreenshot Webcam "C:\Users\YOUR_USER_NAME\Documents\Stream\screenshot.png"`

***

#### OBS Transition
| | |
------------ | -------------
**Info** | Used to change the scene transition. `<transition>` is the name of the scene transition that you want active.
**Format** | `OBS Transition <transition>`
**Example** | `OBS Transition Fade`

##### Parameters
| | |
------------ | -------------
**previous_transition** | The name of the transition prior to changing it.

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
**Info** | Used to change the volume of an audio source. `<useDecibel>` is an optional true/false value (defaults to false) to specify whether `<volume>` should be interpreted as decibels/dB (true) or amplitude/mul (false). If using decibels/dB, `<volume>` must be a number less than or equal to 0.0; note that OBS will interpret dB values below -100.0 as -Inf. If using amplitude/mul, `<volume>` must be a number between 0.0 and 1.0; note that the amplitude/mul value is NOT a percentage, please test for the expected result before usage.
**Format** | `OBS Volume <source> <volume> <useDecibel>`
**Example** | `OBS Volume "Desktop Audio" 0.2`
**Example (using decibels/dB)** | `OBS Volume "Desktop Audio" -3.6 true`

##### Parameters
| | |
------------ | -------------
**previous_volume** | The volume of the source before changing. This allows users to revert the volume to the prior level. The value will be returned as decibels/dB if `<useDecibel>` was true, and as amplitude/mul otherwise.

***

## Param
Adds the ability to easily manipulate parameters through actions.

### Param Triggers
None at the moment.

***

### Param Actions

#### Param Add
| | |
------------ | -------------
**Info** | Adds the given amount to an existing parameter. `<parameter>` is the name of the existing parameter. `<number>` is the value to add.
**Format** | `Param Add <parameter> <number>`
**Example** | `Param Add counter 1`

##### Parameters
| | |
------------ | -------------
**\<parameter\>** | The lowercased parameter value where **\<parameter\>** is the name of the parameter.

***

#### Param Copy
| | |
------------ | -------------
**Info** | Copy the given parameter into a new parameter. `<parameter>` is the name of the existing parameter. `<new>` is the name of the destination parameter to copy the value.
**Format** | `Param Copy <parameter> <new>`
**Example** | `Param Copy api_data image`

##### Parameters
| | |
------------ | -------------
**\<new\>** | The new parameter value where **\<new\>** is the name of the parameter.

***

#### Param Create
| | |
------------ | -------------
**Info** | Create a new parameter. `<parameter>` is the name of the new parameter to create. `<value>` is the initial value for the parameter.
**Format** | `Param Create <parameter> <value>`
**Example** | `Param Create Counter 0`

##### Parameters
| | |
------------ | -------------
**\<parameter\>** | The new parameter value where **\<parameter\>** is the name of the parameter.

***

#### Param Exists
| | |
------------ | -------------
**Info** | Use this to check if a given parameter exists. `<parameter>` is the name of the parameter to check.
**Format** | `Param Exists <parameter>`
**Example** | `Param Exists after`

##### Parameters
| | |
------------ | -------------
**exists** | [True/False] Whether or not the parameter has a value.

***

#### Param Keyword
| | |
------------ | -------------
**Info** | Checks if the specified keyword(s) exist(s) within a parameter. `<parameter>` is the name of the existing parameter. `<keyword>` is the value to look for in the parameter. More than one keyword can be supplied.
**Format** | `Param Keyword <parameter> <keyword>`
**Format w/ Multiple Keywords** | `Param Keyword <parameter> <keyword_1> <keyword_2> <keyword_3>`
**Example** | `Param Keyword after "apple"`
**Example w/ Multiple Keywords** | `Param Keyword after "apple" "banana" "cookie" "duck"`

##### Parameters
| | |
------------ | -------------
**matched** | [True/False] Whether or not the keyword was found in the parameter.
**match** | If `matched`, `match` will have the first keyword found in the parameter.
**keywords** | If `matched`, keywords will have the list of all keywords found in the parameter.

***

#### Param Lower
| | |
------------ | -------------
**Info** | Lowercase the value within a parameter. `<parameter>` is the name of the existing parameter.
**Format** | `Param Lower <parameter>`
**Example** | `Param Lower user`

##### Parameters
| | |
------------ | -------------
**\<parameter\>** | The lowercased parameter value where **\<parameter\>** is the name of the parameter.

***

#### Param Negate
| | |
------------ | -------------
**Info** | Negates the value within the parameter. The parameter value is converted into a string and lowercased. `"false"`, `"0"`, `"no"`, and `""` are interpreted as `false`. Everything else is interpreted as `true`. `<parameter>` is the name of the existing parameter.
**Format** | `Param Negate <parameter>`
**Example** | `Param Negate MyToggle`

##### Parameters
| | |
------------ | -------------
**\<parameter\>** | The negated parameter value where **\<parameter\>** is the name of the parameter.

***

#### Param Proper
| | |
------------ | -------------
**Info** | Proper case the value within a parameter. Proper case is where the first letter of every word is capitalized. `<parameter>` is the name of the existing parameter.
**Format** | `Param Proper <parameter>`
**Example** | `Param Proper user`

##### Parameters
| | |
------------ | -------------
**\<parameter\>** | The proper case parameter value where **\<parameter\>** is the name of the parameter.

***

#### Param Replace
| | |
------------ | -------------
**Info** | Replace a substring in a parameter with the specified text. Note that this replaces all occurrences inside of the parameter. `<parameter>` is the name of the existing parameter. `<to_replace>` is the value to be replaced. `<replacement>` is the value to overwrite the `<to_replace>` value.
**Format** | `Param Replace <parameter> <to_replace> <replacement>`
**Example** | `Param Replace after @ ''`

##### Parameters
| | |
------------ | -------------
**\<parameter\>** | The new parameter value where **\<parameter\>** is the name of the parameter.

***

#### Param Subtract
| | |
------------ | -------------
**Info** | Subtracts the given amount to an existing parameter. `<parameter>` is the name of the existing parameter. `<number>` is the value to subtract.
**Format** | `Param Subtract <parameter> <number>`
**Example** | `Param Subtract counter 1`

##### Parameters
| | |
------------ | -------------
**\<name\>** | The updated parameter value where **\<name\>** is the name of the parameter.

***

#### Param Upper
| | |
------------ | -------------
**Info** | Uppercase the value within a parameter. `<parameter>` is the name of the existing parameter.
**Format** | `Param Upper <parameter>`
**Example** | `Param Upper user`

##### Parameters
| | |
------------ | -------------
**\<parameter\>** | The uppercased parameter value where **\<parameter\>** is the name of the parameter.

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
**Info** | Randomly generates an integer between a min and max value (`[min, max]`). If no input is specified, 0 is used as the min and 100 is used as the max.
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
**Format w/ Aliases** | `OnSLOBSSwitchScenes <scene1> <scene2> ...`
**Example** | `OnSLOBSSwitchScenes "BRB"`
**Example w/ Aliases** | `OnSLOBSSwitchScenes "BRB" "Intermission"`

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

#### SLOBS IsSceneSourceVisible
| | |
------------ | -------------
**Info** | Used to check if the specified source is turned on within the given scene in SLOBS.
**Format** | `SLOBS IsSceneSourceVisible <scene> <source>`
**Example** | `SLOBS IsSceneSourceVisible Alerts TwitchAlerts`

##### Parameters
| | |
------------ | -------------
**is_visible** | [true/false] `true` if the source is visible. Otherwise, `false`.

***

#### SLOBS Mute
| | |
------------ | -------------
**Info** | Used to mute or unmute a source in SLOBS.
**Format** | `SLOBS Mute <source> <on/off/toggle>`
**Example** | `SLOBS Mute Mic/Aux toggle`

***

#### SLOBS Notification
| | |
------------ | -------------
**Info** | Used to add a notice to the SLOBS notification window. This is the `(i)` icon in the bottom left of SLOBS.
**Format** | `SLOBS Notification <message>`
**Example** | `SLOBS Notification "Pay attention to me!"`

***

#### SLOBS Position
| | |
------------ | -------------
**Info** | Used to move a source in SLOBS to the given `x` and `y` location.
**Format** | `SLOBS Position <scene> <source> <x> <y>`
**Example** | `SLOBS Position Alerts SLAlerts 100 350`

***

#### SLOBS Rotate
| | |
------------ | -------------
**Info** | Used to rotate a source in SLOBS. `<degree>` is any number (decimals allowed). This resets the base rotation to 0 before applying the rotation.
**Format** | `SLOBS Rotate <scene> <source> <degree>`
**Example** | `SLOBS Rotate Webcam Camera 90`

***

#### SLOBS SaveReplayBuffer
| | |
------------ | -------------
**Info** | Used to save the current replay buffer.
**Format** | `SLOBS SaveReplayBuffer`
**Example** | `SLOBS SaveReplayBuffer`

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

#### SLOBS StartReplayBuffer
| | |
------------ | -------------
**Info** | Used to start the replay buffer.
**Format** | `SLOBS StartReplayBuffer`
**Example** | `SLOBS StartReplayBuffer`

***

#### SLOBS StopReplayBuffer
| | |
------------ | -------------
**Info** | Used to stop the current replay buffer.
**Format** | `SLOBS StopReplayBuffer`
**Example** | `SLOBS StopReplayBuffer`

***

#### SLOBS ToggleStream
| | |
------------ | -------------
**Info** | Used to go live within SLOBSs or stop the given stream. Note, there's no way to specify if you're toggling the stream on or off.
**Format** | `SLOBS ToggleStream`
**Example** | `SLOBS ToggleStream`

***

#### SLOBS Volume
| | |
------------ | -------------
**Info** | Used to change the volume of an audio source. `<source>` is the name of the audio source in the mixer. `<volume>` is a number between 0 and 1.0. Unlike [`OBS Volume`](#obs-volume), the SLOBS `<volume>` value indicates a percentage.
**Format** | `SLOBS Volume <source> <volume>`
**Example** | `SLOBS Volume "Desktop Audio" 0.2`

##### Parameters
| | |
------------ | -------------
**previous_volume** | The volume of the source before changing. This allows users to revert the volume to the prior level.

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
**data** | The complete json event (for use with [Function](#function)).

***

##### Parameters
| | |
------------ | -------------
**user** | The user that gifted the subscriptions.
**amount** | The number of subscriptions the user is gifted.
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

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
**data** | The complete json message (for use with [Function](#function)).

***

### Streamlabs Actions
None at the moment.

***

## Text-To-Speech
Enables the ability to have input voiced with custom voices. This is powered by the text-to-speech (narration/speech) component on your computer.

### Text-To-Speech Triggers

None at the moment.

***

### Text-To-Speech Actions

#### TTS
| | |
------------ | -------------
**Info** | Used to read a message with the specified voice. `<voice>` is the name of a voice from your computer's narration system. You can check the available voices by using [`TTS Voices`](#tts-voices). `<volume>`, `<pitch>`, and `<rate>` are all numbers between 0 and 100. If a non-numerical value is provided, the default is used. `<wait/nowait>` determines whether or not the script waits until the audio is done playing before completing the next action. `<message>` is the text to read in the audio.
**Format** | `TTS <voice> <volume> <pitch> <rate> <wait/nowait> <message>`
**Example** | `TTS "Microsoft David - English (United States)" 70 50 20 wait "Hey there!"`
**Example w/ default pitch & rate** | `TTS "Microsoft David - English (United States)" 70 - - wait "Hey there!"`

_Note: For backwards compatibility, the `<pitch>` and `<rate>` inputs are optional, but they are both required if one of them is provided._

***

#### TTS Stop
| | |
------------ | -------------
**Info** | Used to stop playing text-to-speech audio.
**Format** | `TTS Stop`
**Example** | `TTS Stop`

***

#### TTS Voices
Use this to determine the available voices on your computer.
| | |
------------ | -------------
**Info** | Used to create a list of all available voices for text-to-speech based on what is installed on your computer. `<name>` is the name of the [`List`](#List) to create.
**Format** | `TTS Voices <name>`
**Example** | `TTS Voices MyVoices`

##### Example Usage

<table>
<tr>
<td>Sends all voice options to chat</td>
</tr>
<tr>
<td>

```m
OnInit
TTS Voices MyVoices
List Count MyVoices
Loop 2 {count}
List Remove MyVoices
Chat Send {value}
```

</td>
</tr>
</table>

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

#### Timer Start
| | |
------------ | -------------
**Info** | Used to start (or restart) a timer based on the `<name>`. This can be used to start a timer that has been stopped or restart a timer's current countdown.
**Format** | `Timer Start <name>`
**Example** | `Timer Start MyTimer`

***

#### Timer Stop
| | |
------------ | -------------
**Info** | Used to stop a timer based on the `<name>`. This can be used to interrupt a timer until it is reset or started.
**Format** | `Timer Stop <name>`
**Example** | `Timer Stop MyTimer`

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

#### Variable Remove
| | |
------------ | -------------
**Info** | Used to delete a previously set variable during the current session. `<name>` is the name assigned to the value.
**Format** | `Variable Remove <name>`
**Example** | `Variable Remove Recent_Sub`

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
