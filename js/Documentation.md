# Kruiz Control Documentation
Each handler provides its own triggers and actions that can be used in a triggers file. These are detailed below after the general formatting.

## Table of Contents

- [General](#general)
  * [Triggers and Actions](#triggers-and-actions)
  * [Quotes](#quotes)
  * [Comments](#comments)
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
- [Miscellaneous](#miscellaneous)
  * [Triggers](#miscellaneous-triggers)
  * [Actions](#miscellaneous-actions)
    + [Delay](#delay)
	+ [Play](#play)
- [OBS](#obs)
  * [Triggers](#obs-triggers)
	+ [OnOBSCustomMessage](#onobscustommessage)
	+ [OnOBSStreamStarted](#onobsstreamstarted)
	+ [OnOBSStreamStopped](#onobsstreamstopped)
	+ [OnOBSSwitchScenes](#onobsswitchscenes)
  * [Actions](#obs-actions)
    + [OBS Scene](#obs-scene)
	+ [OBS Source](#obs-source)
	+ [OBS Source Filter](#obs-source-filter)
	+ [OBS Send](#obs-send)
- [StreamElements](#streamelements)
  * [Triggers](#streamelements-triggers)
	+ [OnSETwitchBits](#onsetwitchbits)
	+ [OnSEDonation](#onsedonation)
	+ [OnSETwitchFollow](#onsetwitchfollow)
	+ [OnSETwitchHost](#onsetwitchhost)
	+ [OnSETwitchRaid](#onsetwitchraid)
	+ [OnSETwitchSub](#onsetwitchsub)
  * [Actions](#streamelements-actions)
- [Streamlabs](#streamlabs)
  * [Triggers](#streamlabs-triggers)
	+ [OnSLTwitchBits](#onsltwitchbits)
	+ [OnSLDonation](#onsldonation)
	+ [OnSLTwitchFollow](#onsltwitchfollow)
	+ [OnSLTwitchHost](#onsltwitchhost)
	+ [OnSLTwitchRaid](#onsltwitchraid)
	+ [OnSLTwitchSub](#onsltwitchsub)
  * [Actions](#streamlabs-actions)

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

### Triggers and Actions
Triggers and Actions are currently case sensitive. The following example sends a message after a command.
```
OnCommand !caseSensitive
Chat Send "Triggers and Actions are case sensitive"
```

The following is an **INCORRECT** example due to rogue capitalization.
```
Oncommand !caseSensitive
chat SEND "Triggers and Actions are case sensitive"
```

### Quotes
It is recommended to use quotes when providing multi-word arguments. For example,
```
Chat Send "Some really long message"
OBS Scene "Starting Soon"
```

### Comments
Trigger files support comments using the **#** character. This allows you to leave text in the trigger file that is not treated as a trigger or action.

#### Comment Example
```
# My really complicated trigger
OnCommand !example
Chat Send "This is a silly example!""
```

***

## Channel Points
Enables the ability to run actions when channel point rewards are redeemed.

### Channel Point Triggers

#### OnChannelPoint
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a channel point reward is redeemed.
**Format** | `OnChannelPoint <reward_name>`
**Example** | `OnChannelPoint Example Reward`

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

Additionally, you can use *u* as the permission to specify a specific user that can use a command or keyword. In this case, an optional parameter is required to specify the user. The username input is case insensitive.

**Example**:
```
OnCommand u kruiser8 !secret
```

#### OnCommand
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a command is used at the beginning of a message.
**Format** | `OnCommand <permission> <optional_info> <command>`
**Example** | `OnCommand a !example`

#### OnKeyword
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a keyword or phrase appears in a message.
**Format** | `OnKeyword <permission> <optional_info> <command>`
**Example** | `OnKeyword smv "music"`

### Actions

#### Chat Send
| | |
------------ | -------------
**Info** | Used to send a message to chat.
**Format** | `Chat Send <message>`
**Example** | `Chat Send "Hello World"`

***

## Miscellaneous
A small selection of actions that are included for increased usability.

### Miscellaneous Triggers
None at the moment.

### Miscellaneous Actions

#### Delay
| | |
------------ | -------------
**Info** | Used to wait a specific number of seconds before taking the next action.
**Format** | `Delay <seconds>`
**Example** | `Delay 8`

#### Play
| | |
------------ | -------------
**Info** | Used to play a sound effect inside of the _sounds_ folder. `<volume>` is a number between 1 and 100.
**Format** | `Play <volume> <song_file>`
**Example** | `Play 30 MashiahMusic__Kygo-Style-Melody.wav`

***

## OBS
Enables the ability to take interact with and respond to OBS.

### OBS Triggers

#### OnOBSCustomMessage
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a custom message is sent. Used to receive triggers from [OBS Send](#obssend).
**Format** | `OnOBSCustomMessage <message>`
**Example** | `OnOBSCustomMessage "My Custom Message"`

#### OnOBSStreamStarted
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the stream starts.
**Format** | `OnOBSStreamStarted`
**Example** | `OnOBSStreamStarted`

#### OnOBSStreamStopped
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the stream stops.
**Format** | `OnOBSStreamStopped`
**Example** | `OnOBSStreamStopped`

#### OnOBSSwitchScenes
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when the scene changes in OBS.
**Format** | `OnOBSSwitchScenes <scene>`
**Example** | `OnOBSSwitchScenes BRB`

### OBS Actions

#### OBS Scene
| | |
------------ | -------------
**Info** | Used to change the scene in OBS.
**Format** | `OBS Scene <scene>`
**Example** | `OBS Scene Ending`

#### OBS Source
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source in OBS.
**Format** | `OBS Source <source> <on/off>`
**Example** | `OBS Source Webcam off`

#### OBS Source Filter
| | |
------------ | -------------
**Info** | Used to toggle the visibility of a source filter in OBS.
**Format** | `OBS Source <source> Filter <filter> <on/off>`
**Example** | `OBS Source Webcam Filter Rainbow on`

#### OBS Send
| | |
------------ | -------------
**Info** | Used to send a custom event to the OBS websocket that is echo'd to all connected clients. Useful for connecting other browser sources or triggering other triggers.
**Format** | `OBS Send <message>`
**Example** | `OBS Send PlayShikaka`

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

#### OnSEDonation
| | |
------------ | -------------
**Info** | Used to trigger actions when someone donates through StreamElements.
**Format** | `OnSEDonation`
**Example** | `OnSEDonation`

#### OnSETwitchFollow
| | |
------------ | -------------
**Info** | Used to trigger actions when someone follows the channel.
**Format** | `OnSETwitchFollow`
**Example** | `OnSETwitchFollow`

#### OnSETwitchHost
| | |
------------ | -------------
**Info** | Used to trigger actions when someone hosts the channel.
**Format** | `OnSETwitchHost`
**Example** | `OnSETwitchHost`

#### OnSETwitchRaid
| | |
------------ | -------------
**Info** | Used to trigger actions when someone raids the channel.
**Format** | `OnSETwitchRaid`
**Example** | `OnSETwitchRaid`

#### OnSETwitchSub
| | |
------------ | -------------
**Info** | Used to trigger actions when someone subscribes to the channel.
**Format** | `OnSETwitchSub`
**Example** | `OnSETwitchSub`

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

#### OnSLDonation
| | |
------------ | -------------
**Info** | Used to trigger actions when someone donates through StreamElements.
**Format** | `OnSLDonation`
**Example** | `OnSLDonation`

#### OnSLTwitchFollow
| | |
------------ | -------------
**Info** | Used to trigger actions when someone follows the channel.
**Format** | `OnSLTwitchFollow`
**Example** | `OnSLTwitchFollow`

#### OnSLTwitchHost
| | |
------------ | -------------
**Info** | Used to trigger actions when someone hosts the channel.
**Format** | `OnSLTwitchHost`
**Example** | `OnSLTwitchHost`

#### OnSLTwitchRaid
| | |
------------ | -------------
**Info** | Used to trigger actions when someone raids the channel.
**Format** | `OnSLTwitchRaid`
**Example** | `OnSLTwitchRaid`

#### OnSLTwitchSub
| | |
------------ | -------------
**Info** | Used to trigger actions when someone subscribes to the channel.
**Format** | `OnSLTwitchSub`
**Example** | `OnSLTwitchSub`

### Streamlabs Actions
None at the moment.
