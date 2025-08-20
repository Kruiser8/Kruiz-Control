# Kruiz Control Documentation
Each handler provides its own triggers and actions that can be used in a triggers file. These are detailed below after the general formatting.

## Table of Contents

- [General](#general)
  * [Case Sensitivity](#case-sensitivity)
  * [Quotes](#quotes)
  * [Multi-line Inputs](#multi-line-inputs)
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
- [Chat](#chat)
  * [Triggers](#chat-triggers)
    + [OnCommand](#oncommand)
    + [OnEveryChatMessage](#oneverychatmessage)
    + [OnHypeChat](#onhypechat)
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
    + [Debug Chat](#debug-chat)
    + [Debug Controller](#debug-controller)
    + [Debug Debug](#debug-debug)
    + [Debug MQTT](#debug-mqtt)
    + [Debug OBS](#debug-obs)
    + [Debug Parser](#debug-parser)
    + [Debug SLOBS](#debug-slobs)
    + [Debug Storage](#debug-storage)
    + [Debug StreamElements](#debug-streamelements)
    + [Debug StreamLabs](#debug-streamlabs)
    + [Debug Twitch](#debug-twitch)
    + [Debug Voicemod](#debug-voicemod)
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
    + [List Set](#list-set)
    + [List Unique](#list-Unique)
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
    + [Ignore](#ignore)
    + [Log](#log)
    + [Loop](#loop)
    + [Play](#play)
    + [Play Stop](#play-stop)
    + [Reset](#reset)
    + [Skip](#skip)
- [MQTT](#mqtt)
  * [Triggers](#mqtt-triggers)
    + [OnMQTT](#onmqtt)
  * [Actions](#mqtt-actions)
    + [MQTT Publish](#mqtt-publish)
- [OBS](#obs)
  * [Triggers](#obs-triggers)
    + [OnOBSCustomMessage](#onobscustommessage)
    + [OnOBSRecordingPaused](#onobsrecordingpaused)
    + [OnOBSRecordingResumed](#onobsrecordingresumed)
    + [OnOBSRecordingStarted](#onobsrecordingstarted)
    + [OnOBSRecordingStopped](#onobsrecordingstopped)
    + [OnOBSSourceFilterVisibility](#onobssourcefiltervisibility)
    + [OnOBSSourceVisibility](#onobssourcevisibility)
    + [OnOBSStreamStarted](#onobsstreamstarted)
    + [OnOBSStreamStopped](#onobsstreamstopped)
    + [OnOBSSwitchScenes](#onobsswitchscenes)
    + [OnOBSTransitionTo](#onobstransitionto)
  * [Actions](#obs-actions)
    + [OBS AddSceneItem](#obs-addsceneitem)
    + [OBS CreateSource](#obs-createsource)
    + [OBS Crop](#obs-crop)
    + [OBS CurrentScene](#obs-currentscene)
    + [OBS DuplicateSceneItem](#obs-duplicatesceneitem)
    + [OBS Flip](#obs-flip)
    + [OBS GetCrop](#obs-getcrop)
    + [OBS GetPosition](#obs-getposition)
    + [OBS GetSourceSettings](#obs-getsourcesettings)
    + [OBS GetSourceTypes](#obs-getsourcetypes)
    + [OBS IsSceneSourceVisible](#obs-isscenesourcevisible)
    + [OBS IsSourceActive](#obs-issourceactive)
    + [OBS Media Duration](#obs-media-duration)
    + [OBS Media Path](#obs-media-path)
    + [OBS Media Pause](#obs-media-pause)
    + [OBS Media Play](#obs-media-play)
    + [OBS Media Restart](#obs-media-restart)
    + [OBS Media Stop](#obs-media-stop)
    + [OBS Mute](#obs-mute)
    + [OBS Order](#obs-order)
    + [OBS PauseRecording](#obs-pauserecording)
    + [OBS Position](#obs-position)
    + [OBS RecordingStatus](#obs-recordingstatus)
    + [OBS Refresh](#obs-refresh)
    + [OBS RemoveSceneItem](#obs-removesceneitem)
    + [OBS ResumeRecording](#obs-resumerecording)
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
    + [OBS StartRecording](#obs-startrecording)
    + [OBS StartReplayBuffer](#obs-startreplaybuffer)
    + [OBS StartStream](#obs-startstream)
    + [OBS Stats](#obs-stats)
    + [OBS StopRecording](#obs-stoprecording)
    + [OBS StopReplayBuffer](#obs-stopreplaybuffer)
    + [OBS StopStream](#obs-stopstream)
    + [OBS StreamStatus](#obs-streamstatus)
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
- [Twitch](#twitch)
  * [Triggers](#twitch-triggers)
    + [OnTWCommunityGoalComplete](#ontwcommunitygoalcomplete)
    + [OnTWCommunityGoalProgress](#ontwcommunitygoalprogress)
    + [OnTWCommunityGoalStart](#ontwcommunitygoalstart)
    + [OnTWAd](#ontwad)
    + [OnTWBan](#ontwban)
    + [OnTWChannelPoint](#ontwchannelpoint)
    + [OnTWChannelPointCompleted](#ontwchannelpointcompleted)
    + [OnTWChannelPointRejected](#ontwchannelpointrejected)
    + [OnTWChannelUpdate](#ontwchannelupdate)
    + [OnTWCharityDonation](#ontwcharitydonation)
    + [OnTWCharityProgress](#ontwcharityprogress)
    + [OnTWCharityStarted](#ontwcharitystarted)
    + [OnTWCharityStopped](#ontwcharitystopped)
    + [OnTWChatClear](#ontwchatclear)
    + [OnTWChatClearUser](#ontwchatclearuser)
    + [OnTWCheer](#ontwcheer)
    + [OnTWFollow](#ontwfollow)
    + [OnTWGoalCompleted](#ontwgoalcompleted)
    + [OnTWGoalFailed](#ontwgoalfailed)
    + [OnTWGoalProgress](#ontwgoalprogress)
    + [OnTWGoalStart](#ontwgoalstart)
    + [OnTWHypeTrainConductor](#ontwhypetrainconductor)
    + [OnTWHypeTrainEnd](#ontwhypetrainend)
    + [OnTWHypeTrainLevel](#ontwhypetrainlevel)
    + [OnTWHypeTrainProgress](#ontwhypetrainprogress)
    + [OnTWHypeTrainStart](#ontwhypetrainstart)
    + [OnTWModAdd](#ontwmodadd)
    + [OnTWModRemove](#ontwmodremove)
    + [OnTWPoll](#ontwpoll)
    + [OnTWPollEnd](#ontwpollend)
    + [OnTWPollUpdate](#ontwpollupdate)
    + [OnTWPrediction](#ontwprediction)
    + [OnTWPredictionEnd](#ontwpollend)
    + [OnTWPredictionLock](#ontwpredictionlock)
    + [OnTWPredictionUpdate](#ontwpredictionupdate)
    + [OnTWRaid](#ontwraid)
    + [OnTWShieldStart](#ontwshieldstart)
    + [OnTWShieldStop](#ontwshieldstop)
    + [OnTWShoutout](#ontwshoutout)
    + [OnTWShoutoutReceived](#ontwshoutoutreceived)
    + [OnTWStreamStarted](#ontwstreamstarted)
    + [OnTWStreamStopped](#ontwstreamstopped)
    + [OnTWSub](#ontwsub)
    + [OnTWSubGift](#ontwsubgift)
    + [OnTWSubMessage](#ontwsubmessage)
    + [OnTWSuspiciousUser](#ontwsuspicioususer)
    + [OnTWTimeout](#ontwtimeout)
    + [OnTWUnban](#ontwunban)
    + [OnTWUnVIP](#ontwunvip)
    + [OnTWVIP](#ontwvip)
  * [Actions](#twitch-actions)
    + [Twitch AddBlockedTerm](#twitch-addblockedterm)
    + [Twitch AdSchedule](#twitch-adschedule)
    + [Twitch Announcement](#twitch-announcement)
    + [Twitch Auth](#twitch-auth)
    + [Twitch Authenticate](#twitch-authenticate)
    + [Twitch Ban](#twitch-ban)
    + [Twitch BitsLeaderboard](#twitch-bitsleaderboard)
    + [Twitch Block](#twitch-block)
    + [Twitch ChannelInfo](#twitch-channelinfo)
    + [Twitch Chatters](#twitch-chatters)
    + [Twitch ChattersPaginated](#twitch-chatterspaginated)
    + [Twitch ClearChat](#twitch-clearchat)
    + [Twitch ClipById](#twitch-clipbyid)
    + [Twitch ClipsByUser](#twitch-clipsbyuser)
    + [Twitch Color](#twitch-color)
    + [Twitch Commercial](#twitch-commercial)
    + [Twitch Complete](#twitch-complete)
    + [Twitch Copy](#twitch-copy)
    + [Twitch CreateClip](#twitch-createclip)
    + [Twitch CreateReward](#twitch-createreward)
    + [Twitch DeleteMessage](#twitch-deletemessage)
    + [Twitch Description](#twitch-description)
    + [Twitch EmoteOnly](#twitch-emoteonly)
    + [Twitch EmoteOnlyOff](#twitch-emoteonlyoff)
    + [Twitch Emotes](#twitch-emotes)
    + [Twitch FollowCount](#twitch-followcount)
    + [Twitch Followers](#twitch-followers)
    + [Twitch FollowersOff](#twitch-followersoff)
    + [Twitch Game](#twitch-game)
    + [Twitch Goals](#twitch-goals)
    + [Twitch IsFollower](#twitch-isfollower)
    + [Twitch IsShieldMode](#twitch-isshieldmode)
    + [Twitch IsSubscriber](#twitch-issubscriber)
    + [Twitch Mod](#twitch-mod)
    + [Twitch Marker](#twitch-marker)
    + [Twitch Mods](#twitch-mods)
    + [Twitch Poll Cancel](#twitch-prediction-cancel)
    + [Twitch Poll Choice](#twitch-prediction-choice)
    + [Twitch Poll Clear](#twitch-prediction-clear)
    + [Twitch Poll Create](#twitch-prediction-create)
    + [Twitch Poll End](#twitch-prediction-end)
    + [Twitch Poll PointsPerVote](#twitch-prediction-pointspervote)
    + [Twitch Poll Time](#twitch-prediction-time)
    + [Twitch Poll Title](#twitch-prediction-title)
    + [Twitch Prediction Cancel](#twitch-prediction-cancel)
    + [Twitch Prediction Clear](#twitch-prediction-clear)
    + [Twitch Prediction Complete](#twitch-prediction-complete)
    + [Twitch Prediction Create](#twitch-prediction-create)
    + [Twitch Prediction Lock](#twitch-prediction-lock)
    + [Twitch Prediction Outcome](#twitch-prediction-outcome)
    + [Twitch Prediction Time](#twitch-prediction-time)
    + [Twitch Prediction Title](#twitch-prediction-title)
    + [Twitch Raid](#twitch-raid)
    + [Twitch Reject](#twitch-reject)
    + [Twitch RemoveBlockedTerm](#twitch-removeblockedterm)
    + [Twitch Reward](#twitch-reward)
    + [Twitch RewardCost](#twitch-rewardcost)
    + [Twitch RewardDescription](#twitch-rewarddescription)
    + [Twitch RewardName](#twitch-rewardname)
    + [Twitch Shield](#twitch-shield)
    + [Twitch Shoutout](#twitch-shoutout)
    + [Twitch Slow](#twitch-slow)
    + [Twitch SlowOff](#twitch-slowoff)
    + [Twitch Streams](#twitch-streams)
    + [Twitch SubCount](#twitch-subcount)
    + [Twitch Subscribers](#twitch-subscribers)
    + [Twitch SubscribersOff](#twitch-subscribersoff)
    + [Twitch Tags](#twitch-tags)
    + [Twitch Teams](#twitch-teams)
    + [Twitch Timeout](#twitch-timeout)
    + [Twitch Title](#twitch-title)
    + [Twitch Unban](#twitch-unban)
    + [Twitch Unblock](#twitch-unblock)
    + [Twitch UniqueChat](#twitch-uniquechat)
    + [Twitch UniqueChatOff](#twitch-uniquechatoff)
    + [Twitch Unmod](#twitch-unmod)
    + [Twitch Unraid](#twitch-unraid)
    + [Twitch UnVIP](#twitch-unvip)
    + [Twitch User](#twitch-user)
    + [Twitch UserColor](#twitch-usercolor)
    + [Twitch Videos](#twitch-videos)
    + [Twitch VIP](#twitch-vip)
    + [Twitch VIPs](#twitch-vips)
    + [Twitch Warn](#twitch-warn)
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
- [Voicemod](#voicemod)
  * [Triggers](#voicemod-triggers)
  * [Actions](#voicemod-actions)
    + [Voicemod Background](#voicemod-background)
    + [Voicemod Beep](#voicemod-beep)
    + [Voicemod Hear](#voicemod-hear)
    + [Voicemod Mute](#voicemod-mute)
    + [Voicemod Play](#voicemod-play)
    + [Voicemod Random](#voicemod-random)
    + [Voicemod Stop](#voicemod-stop)
    + [Voicemod Voice](#voicemod-voice)
    + [Voicemod VoiceChanger](#voicemod-voicechanger)

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

### Multi-line Inputs
As of Kruiz Control v2.0.6, the inputs to triggers and actions can be split over multiple lines. For example, the below action provides a [`Function`](#function) input via multiple lines.
```
OnInit
Function "
  var data = 4; 
  return { value: data * 2 };
"
Error {data}
```

_Note: While an individual input can be multiple lines, inputs cannot be distributed over multiple lines._

The below events are **NOT** valid.

```
# Invalid because the inputs are provided on the following lines.
OnInit
Random 
  "Chat Send 'Option 1'"
  "Chat Send 'Option 2'"

# Invalid because the first input ends on the first line.
# The second option will be skipped.
OnInit
Random "Chat Send 'Option 1'"
  "Chat Send 'Option 2'"
```

The below is technically valid, albeit funky looking. As long as a quote is not terminated until the following line, it will be parsed as a multi-line input.

```
# Since the end double quote for the first input is on the second line, the second line is included when processing the action.
OnInit
Random "Chat Send 'Option 1'
  " "Chat Send 'Option 2'"
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

#### parameter#
Some triggers and actions provide parameters of the format `param#`. When you see a `#` on a parameter, that means there are multiple values returned and you have to loop over them. There is always a `param_count` parameter provided that states how many values were returned.

For example, [`Twitch Emotes`](#twitch-emotes) retrieves all custom emotes available on the broadcaster's channel. The action provides an `emote#` parameter as well as an `emote_count`. The emotes would be looped through using the example below.

```m
OnCommand e 0 !emotes
Twitch Emotes
Loop 1 {emote_count}
Chat Send {emote{loop}}
```

For a nicely formatted message:
```m
OnCommand e 0 !emotes
Twitch Emotes
Loop 1 {emote_count}
List Add Emotes {emote{loop}}
List Join Emotes " "
Chat Send "Channel Emotes: {joined}"
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
- OnSpeak
- OnMessage
- OnTWChannelPoint
- OnTWCommunityGoalStart
- OnTWCommunityGoalProgress
- OnTWCommunityGoalComplete
- OnOBSSwitchScenes
- OnOBSTransitionTo
- OnOBSCustomMessage
- OnSLOBSSwitchScenes

***

## Default Parameters
The following parameters are always available. Use the `_successful_` and `_unsuccessful_` parameters to test that the <a href="settings/Settings.md#kruiz-control-settings">Kruiz Control settings</a> are correct.

#### Parameters
| | |
------------ | -------------
**\_successful\_** | A comma delimited list of handlers that initialized correctly.
**\_unsuccessful\_** | A comma delimited list of handlers that did not initialize correctly.
**\_kc\_event\_id\_** | A unique id (UUID) for each event occurrence in Kruiz Control. If you need a unique identifier for an event, use this.

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
**in_count** | The number of arguments passed to the action.

***

### Action Actions

#### Action
| | |
------------ | -------------
**Info** | Used to run an action by passing it through. This allows actions to be fired dynamically within an event. `<action>` is the full action that you want to complete. The action can be provided as a single argument (inside of quotes) or written out normally.
**Format** | `Action <action>`
**Example** | `Action Chat Send "Hello world"`
**Example w/ Single Argument** | `Action "Chat Send 'Hello world'"`

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

## Chat
Enables the ability to take actions on chat message and send messages. Note that Kruiz Control can respond to messages sent by Kruiz Control.

### Chat Triggers
Chat triggers use a `<permission>` parameter to specify who can use a command. The following values can be combined in any order.

- *b* - Broadcaster
- *s* - Subscriber
- *f* - Follower
- *o* - Founder
- *v* - VIP
- *m* - Moderator
- *n* - Check if a user has _none_ of the permissions above.
- *e* - Everyone

Additionally, you can use *u* as the permission to specify a user or group of users that can use a command or keyword. In this case, `<optional_info>` is required to specify the user. The username input is case insensitive. If multiple users are provided, they must be comma delimited without any spaces.

**Example**:
```
OnCommand u kruiser8 10 !secret
```
**Example w/ Multiple Users**:
```
OnCommand u kruiser8,kruizbot 10 !secret
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
**message_id** | The id of the message (used with [Twitch DeleteMessage](#twitch-deletemessage)). If the message was sent by Kruiz Control, the id will be an empty string (`""`).
**data** | An object with all metadata about the message (for use with [Function](#function)).
**arg#** | The numbered arguments in the message. Replace `#` with a number, starting at 1 and ending at the last argument passed into the command.
**arg_count** | The number of arguments in the message. This indicates the number of `arg#` parameters returned.

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
**message_id** | The id of the message (used with [Twitch DeleteMessage](#twitch-deletemessage)). If the message was sent by Kruiz Control, the id will be an empty string (`""`).
**data** | An object with all metadata about the message (for use with [Function](#function)).

***

#### OnHypeChat
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a user sends a hype chat. Using `*` as the `<name>` will execute the trigger for all users.
**Format** | `OnHypeChat <name>`
**Format w/ Aliases** | `OnHypeChat <name1> <name2> <name3>`
**Example** | `OnHypeChat Kruiser8`
**Example w/ Aliases** | `OnHypeChat Kruiser8 Kruizbot`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that sent the command.
**message** | The entire chat message, including the command.
**message_id** | The id of the message (used with [Twitch DeleteMessage](#twitch-deletemessage)). If the message was sent by Kruiz Control, the id will be an empty string (`""`).
**amount** | The value of the Hype Chat sent by the user. Example: `500` if $5 was tipped.
**formatted_amount** | The formatted value of the Hype Chat sent by the user. Example: `5.00` is $5 was tipped.
**currency** | The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) alphabetic currency code the user has sent the Hype Chat in.
**exponent** | Indicates how many decimal points this currency represents partial amounts in. Decimal points start from the right side of the value defined in `amount`.
**level** | The level of the Hype Chat, in English. Possible values are [`ONE`, `TWO`, ..., `TEN`], written in all caps.
**is_system_message** | A boolean value that determines if the message sent with the Hype Chat was filled in by the system.
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
**message_id** | The id of the message (used with [Twitch DeleteMessage](#twitch-deletemessage)). If the message was sent by Kruiz Control, the id will be an empty string (`""`).
**data** | An object with all metadata about the message (for use with [Function](#function)).
**arg#** | The numbered arguments in the message. Replace `#` with a number, starting at 1 and ending at the last argument passed into the command.
**arg_count** | The number of arguments in the message. This indicates the number of `arg#` parameters returned.

***

#### OnSpeak
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a user speaks in chat for the first time. Using `*` as the `<name>` will execute the trigger for all users.
**Format** | `OnSpeak <name>`
**Format w/ Aliases** | `OnSpeak <name1> <name2> <name3>`
**Example** | `OnSpeak Kruiser8`

##### Parameters
| | |
------------ | -------------
**user** | The display name of the user that sent the command.
**message** | The entire chat message, including the command.
**message_id** | The id of the message (used with [Twitch DeleteMessage](#twitch-deletemessage)). If the message was sent by Kruiz Control, the id will be an empty string (`""`).
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
**\<name\>** | [true/false] Whether or not the cooldown is active where **\<name\>** is the name of the cooldown.
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
**\<name\>** | [true/false] Whether or not the cooldown is active where **\<name\>** is the name of the cooldown.
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

#### Debug Chat
| | |
------------ | -------------
**Info** | Used to enable debugging for Chat events.
**Format** | `Debug Chat`
**Example** | `Debug Chat`

***

#### Debug Controller
| | |
------------ | -------------
**Info** | Used to enable debugging for internal event handling.
**Format** | `Debug Controller`
**Example** | `Debug Controller`

***

#### Debug Debug
| | |
------------ | -------------
**Info** | Used to enable debugging for internal debug handling.
**Format** | `Debug Debug`
**Example** | `Debug Debug`

***

#### Debug MQTT
| | |
------------ | -------------
**Info** | Used to enable debugging for MQTT events.
**Format** | `Debug MQTT`
**Example** | `Debug MQTT`

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

#### Debug Storage
| | |
------------ | -------------
**Info** | Used to enable debugging of Kruiz Control's storage emitter class (used to pass the Twitch auth token internally)
**Format** | `Debug Storage`
**Example** | `Debug Storage`

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

#### Debug Voicemod
| | |
------------ | -------------
**Info** | Used to enable debugging for Voicemod messages.
**Format** | `Debug Voicemod`
**Example** | `Debug Voicemod`

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
**Example w/ Relative Path** | `Discord File "GeneralChannel" "screenshots/screenshot.png"`

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

## List
A small handler to allow you to store and update lists of items.

### List Triggers
None at the moment.

***

### List Actions

#### List Add
| | |
------------ | -------------
**Info** | Adds an item to the list. `<list>` is the name of the list to update. `<value>` is what gets added to the list. `<index>` is optional to add at a specific index.
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
**Info** | Check if an item exists in a list. `<list>` is the name of the list to check. `<value>` is the item being checked.
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
**Info** | Check how many items are in a list. `<list>` is the name of the list.
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
**Info** | Removes all items from a list. `<list>` is the name of the list to update.
**Format** | `List Empty <list>`
**Example** | `List Empty MyList`

***

#### List Export
| | |
------------ | -------------
**Info** | Returns the list as a string using `JSON.stringify`. `<list>` is the name of the list to export.
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
**Info** | Returns a value from the list. `<list>` is the name of the list. `<index>` is an optional index. If no index is included, a random element is returned. "First" and "Last" are valid `<index>` values.
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
**Info** | Designates a list as global so that it will persist between sessions (i.e. the list remains after a reset). `<list>` is the name of the list. `<on/off>` determines whether to make the list global (`on`) or remove it as a global list (`off`).
**Format** | `List Global <list> <on/off>`
**Example** | `List Global MyList on`

***

#### List Import
| | |
------------ | -------------
**Info** | Used to import a list from an input `JSON.stringify`'d array. `<list>` is the name of the list.
**Format** | `List Import <list> <import>`
**Example** | `List Import MyList '["item 1","item 2","item 3"]'`

***

#### List Index
| | |
------------ | -------------
**Info** | Returns the position and index (0-based) of a value in the list. `<list>` is the name of the list.
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
**Info** | Used to combine all items in a list into a text value with the specified `<delimiter>` as a separator. `<list>` is the name of the list. 
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
**Info** | Used to remove and return an item from a list. `<list>` is the name of the list. `<index>` is an optional index. If no index is included, a random element is returned. "First" and "Last" are valid `<index>` values.
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
**Info** | Adds an item to the list. `<list>` is the name of the list. `<index>` is optional to add at a specific index. `<value>` is the item to add.
**Format** | `List Set <list> <index> <value>`
**Example** | `List Set MyList 1 {user}`

##### Parameters
| | |
------------ | -------------
**position** | The position of the value in the list (starting from 1) or `-1` if not found.
**index** | The index of the value in the list (starting from 0) or `-1` if not found.
**value** | The value added to the list.

***

#### List Unique
| | |
------------ | -------------
**Info** | Remove any duplicates from the list.  `<list>` is the name of the list to update.
**Format** | `List Unique <list>`
**Example** | `List Unique MyList`

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

`<function>` is a javascript function body. For reference, please see this [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function). 

If the function returns an object, each property of the Object is usable as a parameter in the rest of the trigger.

- If a `continue` parameter is returned and the value is `false`, the trigger will exit and not continue processing actions.

- If an `actions` array parameter is returned, each item of the array will be inserted into the event and processed.

##### Example Usage

<table>
<tr>
<td>The below returns a random element from an array in <code>api_data</code>.</td>
</tr>
<tr>
<td>

```m
Function 'var arr = [api_data]; return {random: arr[Math.floor(Math.random() * arr.length)]}'
```

</td>
</tr>
</table>

<table>
<tr>
<td><em>Note: As of Kruiz Control v2.0.6, multi-line inputs are now supported.</em>

The above example can be rewritten as the multi-line <code>function</code> below.</td>
</tr>
<tr>
<td>

```m
OnInit
Function "
  var arr = [api_data];
  return {
    random: arr[Math.floor(Math.random() * arr.length)]
  };
"
```

</td>
</tr>
</table>

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

The `<optional_skip>` value allows you to specify the number of lines to skip if the criteria is not met. This value is completely optional and allows for advanced logic handling. When skipping lines, multi-line inputs are considered one line and comments are not considered.


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

#### Ignore
| | |
------------ | -------------
**Info** | Used to run an action without updating the number of actions in an event. This is used internally by Kruiz Control to add actions to an event without messing up [`Loop`](#loop) or [`If`](#if) actions that track the number of actions. `<action>` is the full action that you want to complete. The action can be provided as a single argument (inside of quotes) or written out normally.
**Format** | `Ignore <action>`
**Example** | `Ignore Chat Send "Hello world"`
**Example w/ Single Argument** | `Ignore "Chat Send 'Hello world'"`

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
**Info** | Used to repeat a set of actions a specified number of times. `<lines>` is the number of actions/lines to repeat. When counting lines, multi-line inputs are considered one line and comments are not considered. `<times>` is the number of times to repeat the actions/lines.
**Format** | `Loop <lines> <times>`
**Example** | `Loop 8 10`

##### Parameters
| | |
------------ | -------------
**loop** | The loop iteration, starting at 1.
**loop_i** | The loop index, starting at 0.

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
**Info** | Used to skip over the next `<number>` of lines in an event. When skipping lines, multi-line inputs are considered one line and comments are not considered.
**Format** | `Skip <number>`
**Example** | `Skip 3`

***

## MQTT
Enables the ability to publish messages to and receive messages from an MQTT broker.

### MQTT Triggers

#### OnMQTT

| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a message is reveived on a topic.
**Format** | `OnMQTT <topic>`
**Example** | `OnMQTT "kc/example"`

##### Parameters
| | |
------------ | -------------
**topic** | The topic the message was received from.
**message** | The content of the message.

***

### MQTT Actions

#### MQTT Publish
| | |
------------ | -------------
**Info** | Used to publish a message to an MQTT broker. `<topic>` is the topic to publish to. `<message>` is the message to send.
**Format** | `MQTT Publish <topic> <message>`
**Example** | `MQTT Publish "kc/notification" "New follower !"`

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

#### OnOBSRecordingPaused
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a recording is paused.
**Format** | `OnOBSRecordingPaused`
**Example** | `OnOBSRecordingPaused`

***

#### OnOBSRecordingResumed
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a recording resumes after being paused.
**Format** | `OnOBSRecordingResumed`
**Example** | `OnOBSRecordingResumed`

***

#### OnOBSRecordingStarted
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a recording is started.
**Format** | `OnOBSRecordingStarted`
**Example** | `OnOBSRecordingStarted`

***

#### OnOBSRecordingStopped
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a recording is stopped.
**Format** | `OnOBSRecordingStopped`
**Example** | `OnOBSRecordingStopped`

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
**Info** | Used to trigger a set of actions when a source's visibility is changed. Using `*` as the `<source>` will execute the trigger for all source visibility changes within a scene.
**Format** | `OnOBSSourceVisibility <scene> <source> <on/off/toggle>`
**Example** | `OnOBSSourceVisibility Webcam Camera off`

##### Parameters
| | |
------------ | -------------
**source** | The name of the source that changed visibility.
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

#### OBS CreateSource
| | |
------------ | -------------
**Info** | Used to create a new source in the specified scene. `<scene>` is the scene to create the source. `<type>` is the source type to create. The types of sources are available using [`OBS GetSourceTypes`](#obs-getsourcetypes). `<source>` is the name of the source to create. `<on/off>` (default: `on`) is an optional visibility that determines if the source is visible when it's added.
**Format** | `OBS CreateSource <scene> <type> <source> <on/off>`
**Example** | `OBS CreateSource BeeScene image_source Bee on`

_Note: OBS source types look like `image_source` or `text_gdiplus_v3`, and don't always correspond perfectly to the name you see in OBS, so you should use `OBS GetSourceTypes` to see the list of type names._

##### Parameters
| | |
------------ | -------------
**source_name** | The name of the created source.
**uuid** | The UUID of the created scene item
**id** | The numeric ID of the scene item in the scene

***

#### OBS Crop
| | |
------------ | -------------
**Info** | Used to set the cropping on a source. `<scene>` is the scene containing the source, `<source>` is the source to crop, `<top>`, `<left>`, `<bottom>`, and `<right>` specify the number of pixels to crop from each side of the source.
**Format** | `OBS Crop <scene> <source> <top> <left> <bottom> <right>`
**Example** | `OBS Crop BeeScene Bee 10 16 10 32`

##### Parameters
| | |
------------ | -------------
**init_top** | The initial value of the top crop before cropping the source.
**init_left** | The initial value of the left crop before cropping the source.
**init_bottom** | The initial value of the bottom crop before cropping the source.
**init_right** | The initial value of the right crop before cropping the source.
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

#### OBS DuplicateSceneItem
| | |
------------ | -------------
**Info** | Used to duplicate a source as a reference in OBS. `<scene>` is the scene the source is in. `<source>` is the name of the source to duplicate. `<dest>` (default: `<scene>`) is an optional scene name that determines the scene the duplicate is placed in.
**Format** | `OBS DuplicateSceneItem <scene> <source> <dest>`
**Example** | `OBS DuplicateSceneItem BeeScene Bee OtherScene`

***

#### OBS Flip
| | |
------------ | -------------
**Info** | Used to flip a source in OBS.
**Format** | `OBS Flip <scene> <source> <x/y>`
**Example** | `OBS Flip Webcam Camera x`

***

#### OBS GetCrop
| | |
------------ | -------------
**Info** | Gets the crop for a source in a given scene in OBS. `<scene>` is the scene the source is in. `<source>` is the source to get the crop for. Note that the same source can have different crops in different scenes.
**Format** | `OBS GetCrop <scene> <source>`
**Example** | `OBS GetCrop Webcam Camera`

##### Parameters
| | |
------------ | -------------
top | The number of pixels cropped from the top of the source
left | The number of pixels cropped from the left side of the source
bottom | The number of pixels cropped from the bottom of the source
right | The number of pixels cropped from the right side of the source

***

#### OBS GetPosition
| | |
------------ | -------------
**Info** | Gets the position for a source in a given scene in OBS. `<scene>` is the scene the source is in. `<source>` is the source to get the position for. Note that the same source can have different positions in different scenes.
**Format** | `OBS GetPosition <scene> <source>`
**Example** | `OBS GetPosition Webcam Camera`

##### Parameters
| | |
------------ | -------------
x | The x position of the source
y | The y position of the source

***

#### OBS GetSourceSettings
| | |
------------ | -------------
**Info** | Gets the settings for a source in OBS. `<source>` is the source to get the settings for. Different source types will have different settings available to them.
**Format** | `OBS GetSourceSettings <source>`
**Example** | `OBS GetSourceSettings Webcam`

_The parameters returned by this command will vary with the source type._

***

#### OBS GetSourceTypes
| | |
------------ | -------------
**Info** | Gets the source types available in OBS. Different source types may be available depending on what plugins you have installed.
**Format** | `OBS GetSourceTypes`
**Example** | `OBS GetSourceTypes`

##### Parameters
| | |
------------ | -------------
**source_types#** | The numbered source types returned by OBS. These can be used when creating a source with `OBS CreateSource`.zz

***

#### OBS Image
| | |
------------ | -------------
**Info** | Used to set the file path of an image source. `<source>` is the name of the source. `<path>` is the absolute path to the file.
**Format** | `OBS Image <source> <path>`
**Example** | `OBS Image RecordingDot "C:/Users/YOUR_USER_NAME/Stream/recording.png"`

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

#### OBS Order
| | |
------------ | -------------
**Info** | Use this to move an OBS source up or down with the scene's source list. `<up/down>` is the direction to move the source.
**Format** | `OBS Order <scene> <source> <up/down>`
**Example** | `OBS Order BRB Webcam up`

***

#### OBS PauseRecording
| | |
------------ | -------------
**Info** | Used to pause an in-progress recording. Use [`OBS ResumeRecording`](#obs-resumerecording) to start the recording again.
**Format** | `OBS PauseRecording`
**Example** | `OBS PauseRecording`

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

#### OBS RecordingStatus
| | |
------------ | -------------
**Info** | Use this to get the status of the current recording.
**Format** | `OBS RecordingStatus`
**Example** | `OBS RecordingStatus`

##### Parameters
| | |
------------ | -------------
**is_active** | [true/false] Whether OBS is recording.
**is_paused** | [true/false] Whether OBS has paused the recording.
**recording_duration** | The duration of the file in seconds. Defaults to `0` if no recording found.
**recording_size** | The number of bytes in the recording. May contain the size of the previous recording if not currently recording.
**data** | The complete response from the OBS `GetRecordStatus` call.

***

#### OBS Refresh
| | |
------------ | -------------
**Info** | Used to refresh a browser source in OBS.
**Format** | `OBS Refresh <source>`
**Example** | `OBS Refresh "Kruiz Control"`

***

#### OBS RemoveSceneItem
| | |
------------ | -------------
**Info** | Used to remove an instance of a source from a scene in OBS. `<scene>` is the scene the source is in. `<source>` is the name of the source to remove. Note that if this is the last instance of `<source>` anywhere in the scene collection, OBS will delete the source.
**Format** | `OBS RemoveSceneItem <scene> <source>`
**Example** | `OBS RemoveSceneItem BeeScene Bee`

***

#### OBS ResumeRecording
| | |
------------ | -------------
**Info** | Used to resume a paused recording (see [`OBS PauseRecording`](#obs-pauserecording)).
**Format** | `OBS ResumeRecording`
**Example** | `OBS ResumeRecording`

***

#### OBS Rotate
| | |
------------ | -------------
**Info** | Used to rotate a source in SLOBS. `<degree>` is any number (decimals allowed). This resets the base rotation to 0 before applying the rotation.
**Format** | `SLOBS Rotate <scene> <source> <degree>`
**Example** | `SLOBS Rotate Webcam Camera 90`

_Note: If you want the source to spin in place, right-click the source and select `Transform` > `Edit Transform`. Change the `Positional Alignment` to `Center`._

***

#### OBS SaveReplayBuffer
| | |
------------ | -------------
**Info** | Used to save the current replay buffer.
**Format** | `OBS SaveReplayBuffer`
**Example** | `OBS SaveReplayBuffer`

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

#### OBS StartRecording
| | |
------------ | -------------
**Info** | Used to start the recording.
**Format** | `OBS StartRecording`
**Example** | `OBS StartRecording`

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

#### OBS StopRecording
| | |
------------ | -------------
**Info** | Used to stop the recording.
**Format** | `OBS StopRecording`
**Example** | `OBS StopRecording`

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

#### OBS StreamStatus
| | |
------------ | -------------
**Info** | Used to retrieve OBS statistics.
**Format** | `OBS StreamStatus`
**Example** | `OBS StreamStatus`

##### Parameters
| | |
------------ | -------------
**is_active** | [true/false] Whether or not the stream is active.
**is_reconnecting** | [true/false] Whether or not the stream is currently reconnecting.
**output_skipped_frames** | Number of output frames skipped by OBS (the frames being streamed).
**output_total_frames** | Total number of frames delivered by the stream.
**data** | The entire [OBS Websocket getStreamStatus output](https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md#getstreamstatus).

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
**version** | The version of the websocket. If OBS is not connected, `Disconnected` will be returned.

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
**exists** | [true/false] Whether or not the parameter has a value.

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
**matched** | [true/false] Whether or not the keyword was found in the parameter.
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
**Example w/ Default Pitch & Rate** | `TTS "Microsoft David - English (United States)" 70 - - wait "Hey there!"`

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

## Twitch
Enables the ability to run actions when channel point rewards are redeemed.

### Twitch Triggers

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

#### OnTWAd
| | |
------------ | -------------
**Info** | Triggers when a stream runs a midroll commercial break, either manually or automatically via ads manager..
**Format** | `OnTWAd`
**Example** | `OnTWAd`

##### Parameters
| | |
------------ | -------------
**duration** | The duration of the advertisement in seconds.
**is_automatic** | [true/false] `true` if the ad was run automatically. Otherwise, `false`..
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWBan
| | |
------------ | -------------
**Info** | Triggers when a viewer is banned from the channel.
**Format** | `OnTWBan`
**Example** | `OnTWBan`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who was banned.
**login** | The user login of the user who was banned.
**name** | The user display name of the user who was banned.
**mod** | The user name of the issuer of the ban.
**reason** | The reason given for the ban.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWChannelPoint
| | |
------------ | -------------
**Info** | Used to trigger a set of actions when a channel point reward is redeemed. Using `*` as the `<reward_name>` will execute the trigger for all channel point rewards.
**Format** | `OnTWChannelPoint <reward_name>`
**Format w/ Aliases** | `OnTWChannelPoint <reward_name1> <reward_name2> ...`
**Example** | `OnTWChannelPoint "Example Reward"`
**Example w/ Aliases** | `OnTWChannelPoint "Resize" "Left View"`

##### Parameters
| | |
------------ | -------------
**id** | The user ID of the user that redeemed the reward.
**login** | The user login of the user that redeemed the reward.
**name** | The user display name of the user that redeemed the reward.
**message** | The message included with the channel point redemption.
**reward** | The name of the reward.
**reward_id** | The id of the channel point reward (used with [Twitch Complete](#twitch-complete) or [Twitch Reject](#twitch-reject)).
**redemption_id** | The id of the channel point redemption (used with [Twitch Complete](#twitch-complete) or [Twitch Reject](#twitch-reject)).
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWChannelPointCompleted
| | |
------------ | -------------
**Info** | Triggers when a channel point redemption has been marked as completed. Using `*` as the `<reward_name>` will execute the trigger for all channel point rewards.
**Format** | `OnTWChannelPointCompleted <reward_name>`
**Format w/ Aliases** | `OnTWChannelPointCompleted <reward_name1> <reward_name2> ...`
**Example** | `OnTWChannelPointCompleted "Example Reward"`
**Example w/ Aliases** | `OnTWChannelPointCompleted "Resize" "Left View"`

##### Parameters
| | |
------------ | -------------
**id** | The user ID of the user that redeemed the reward.
**login** | The user login of the user that redeemed the reward.
**name** | The user display name of the user that redeemed the reward.
**message** | The message included with the channel point redemption.
**reward** | The name of the reward.
**reward_id** | The id of the channel point reward (used with [Twitch Complete](#twitch-complete) or [Twitch Reject](#twitch-reject)).
**redemption_id** | The id of the channel point redemption (used with [Twitch Complete](#twitch-complete) or [Twitch Reject](#twitch-reject)).
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWChannelPointRejected
| | |
------------ | -------------
**Info** | Triggers when a channel point redemption has been rejected and points are refunded to the user. Using `*` as the `<reward_name>` will execute the trigger for all channel point rewards.
**Format** | `OnTWChannelPointRejected <reward_name>`
**Format w/ Aliases** | `OnTWChannelPointRejected <reward_name1> <reward_name2> ...`
**Example** | `OnTWChannelPointRejected "Example Reward"`
**Example w/ Aliases** | `OnTWChannelPointRejected "Resize" "Left View"`

##### Parameters
| | |
------------ | -------------
**id** | The user ID of the user that redeemed the reward.
**login** | The user login of the user that redeemed the reward.
**name** | The user display name of the user that redeemed the reward.
**message** | The message included with the channel point redemption.
**reward** | The name of the reward.
**reward_id** | The id of the channel point reward (used with [Twitch Complete](#twitch-complete) or [Twitch Reject](#twitch-reject)).
**redemption_id** | The id of the channel point redemption (used with [Twitch Complete](#twitch-complete) or [Twitch Reject](#twitch-reject)).
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWChannelUpdate
| | |
------------ | -------------
**Info** | Triggers when a broadcaster updates their channel name, title, or category (game).
**Format** | `OnTWChannelUpdate`
**Example** | `OnTWChannelUpdate`

##### Parameters
| | |
------------ | -------------
**game** | The name of the category (game) of the channel.
**name** | The broadcaster's name.
**title** | The broadcaster's stream title.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWCharityDonation
| | |
------------ | -------------
**Info** | Triggers when a user donates to the broadcaster's charity campaign.
**Format** | `OnTWCharityDonation`
**Example** | `OnTWCharityDonation`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who donated.
**login** | The user login of the user who donated.
**name** | The user display name of the user who donated.
**charity** | The charity's name.
**description** | A description of the charity.
**website** | A URL to the charity's website.
**amount** | The donation amount.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWCharityProgress
| | |
------------ | -------------
**Info** | Triggers when progress is made towards the campaign's goal or when the broadcaster changes the fundraising goal.
**Format** | `OnTWCharityProgress`
**Example** | `OnTWCharityProgress`

##### Parameters
| | |
------------ | -------------
**charity** | The charity's name.
**description** | A description of the charity.
**website** | A URL to the charity's website.
**current** | The current amount of donations that the campaign has received.
**target** | The campaign's target fundraising goal.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWCharityStarted
| | |
------------ | -------------
**Info** | Triggers when the broadcaster starts a charity campaign.
**Format** | `OnTWCharityStarted`
**Example** | `OnTWCharityStarted`

##### Parameters
| | |
------------ | -------------
**charity** | The charity's name.
**description** | A description of the charity.
**website** | A URL to the charity's website.
**current** | The current amount of donations that the campaign has received.
**target** | The campaign's target fundraising goal.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWCharityStopped
| | |
------------ | -------------
**Info** | Triggers when the broadcaster stops a charity campaign.
**Format** | `OnTWCharityStopped`
**Example** | `OnTWCharityStopped`

##### Parameters
| | |
------------ | -------------
**charity** | The charity's name.
**description** | A description of the charity.
**website** | A URL to the charity's website.
**current** | The current amount of donations that the campaign has received.
**target** | The campaign's target fundraising goal.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWChatClear
| | |
------------ | -------------
**Info** | Triggers when a moderator or bot clears all messages from the chat room.
**Format** | `OnTWChatClear`
**Example** | `OnTWChatClear`

##### Parameters
| | |
------------ | -------------
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWChatClearUser
| | |
------------ | -------------
**Info** | Triggers when a moderator or bot clears all messages for a specific user.
**Format** | `OnTWChatClearUser`
**Example** | `OnTWChatClearUser`

##### Parameters
| | |
------------ | -------------
**id** | The user ID of the user that had their messages cleared.
**login** | The user login of the user that had their messages cleared.
**name** | The user display name of the user that had their messages cleared.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWCheer
| | |
------------ | -------------
**Info** | Triggers when a user cheers in the channel.
**Format** | `OnTWCheer`
**Example** | `OnTWCheer`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who cheered.
**login** | The user login of the user who cheered.
**name** | The user display name of the user who cheered.
**message** | The message sent with the cheer.
**amount** | The number of bits cheered.
**is_anonymous** | Whether the user cheered anonymously or not.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWFollow
| | |
------------ | -------------
**Info** | Triggers when the broadcaster receives a follow.
**Format** | `OnTWFollow`
**Example** | `OnTWFollow`

##### Parameters
| | |
------------ | -------------
**id** | The user ID of the user now following.
**login** | The user login of the user now following.
**name** | The user display name of the user now following.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWGoalCompleted
| | |
------------ | -------------
**Info** | Triggers when a broadcaster finishes a goal successfully. This does not occur automatically when a goal is met as goals are continuous and can be repeatedly _completed_. This trigger requires the goal to be ended through the Twitch UI (or API) after a goal has been met.
**Format** | `OnTWGoalCompleted`
**Example** | `OnTWGoalCompleted`

##### Parameters
| | |
------------ | -------------
**type** | The type of goal created. Possible values are `follow`, `subscription`, `subscription_count`, `new_subscription`, and `new_subscription_count`.
**description** | A description of the goal, if specified.
**current** | The goal's current value.
**target** | The goal's target value.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWGoalFailed
| | |
------------ | -------------
**Info** | Triggers when a broadcaster ends a goal that was not completed.
**Format** | `OnTWGoalFailed`
**Example** | `OnTWGoalFailed`

##### Parameters
| | |
------------ | -------------
**type** | The type of goal created. Possible values are `follow`, `subscription`, `subscription_count`, `new_subscription`, and `new_subscription_count`.
**description** | A description of the goal, if specified.
**current** | The goal's current value.
**target** | The goal's target value.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWGoalProgress
| | |
------------ | -------------
**Info** | Triggers when progress (either positive or negative) is made towards a broadcaster's goal.
**Format** | `OnTWGoalProgress`
**Example** | `OnTWGoalProgress`

##### Parameters
| | |
------------ | -------------
**type** | The type of goal created. Possible values are `follow`, `subscription`, `subscription_count`, `new_subscription`, and `new_subscription_count`.
**description** | A description of the goal, if specified.
**current** | The goal's current value.
**target** | The goal's target value.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWGoalStart
| | |
------------ | -------------
**Info** | Triggers when the broadcaster begins a channel goal.
**Format** | `OnTWGoalStart`
**Example** | `OnTWGoalStart`

##### Parameters
| | |
------------ | -------------
**type** | The type of goal created. Possible values are `follow`, `subscription`, `subscription_count`, `new_subscription`, and `new_subscription_count`.
**description** | A description of the goal, if specified.
**current** | The goal's current value.
**target** | The goal's target value.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWHypeTrainConductor
| | |
------------ | -------------
**Info** | Triggers when a Hype Train conductor updates.
**Format** | `OnTWHypeTrainConductor`
**Example** | `OnTWHypeTrainConductor`

##### Parameters
| | |
------------ | -------------
**bit_conductor** | The user display name of the top cheer contributor, if one exists.
**sub_conductor** | The user display name of the top sub contributor, if one exists.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWHypeTrainEnd
| | |
------------ | -------------
**Info** | Triggers when a Hype Train ends on the specified channel.
**Format** | `OnTWHypeTrainEnd`
**Example** | `OnTWHypeTrainEnd`

##### Parameters
| | |
------------ | -------------
**level** | The final level of the Hype Train.
**bit_conductor** | The user display name of the top cheer contributor, if one exists.
**sub_conductor** | The user display name of the top sub contributor, if one exists.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWHypeTrainLevel
| | |
------------ | -------------
**Info** | Used to fire a set of actions when the hype train levels up.
**Format** | `OnTWHypeTrainLevel`
**Example** | `OnTWHypeTrainLevel`

##### Parameters
| | |
------------ | -------------
**level** | The current level of the Hype Train.
**progress** | Total points contributed to the Hype Train.
**goal** | The number of points required to reach the next level.
**bit_conductor** | The user display name of the top cheer contributor, if one exists.
**sub_conductor** | The user display name of the top sub contributor, if one exists.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWHypeTrainProgress
| | |
------------ | -------------
**Info** | Triggers when a Hype Train makes progress on the specified channel.
**Format** | `OnTWHypeTrainProgress`
**Example** | `OnTWHypeTrainProgress`

##### Parameters
| | |
------------ | -------------
**level** | The current level of the Hype Train.
**progress** | Total points contributed to the Hype Train.
**goal** | The number of points required to reach the next level.
**bit_conductor** | The user display name of the top cheer contributor, if one exists.
**sub_conductor** | The user display name of the top sub contributor, if one exists.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWHypeTrainStart
| | |
------------ | -------------
**Info** | Triggers when Hype Train begins on the channel.
**Format** | `OnTWHypeTrainStart`
**Example** | `OnTWHypeTrainStart`

##### Parameters
| | |
------------ | -------------
**level** | The starting level of the Hype Train.
**progress** | Total points contributed to the Hype Train.
**goal** | The number of points required to reach the next level.
**bit_conductor** | The user display name of the top cheer contributor, if one exists.
**sub_conductor** | The user display name of the top sub contributor, if one exists.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWModAdd
| | |
------------ | -------------
**Info** | Triggers when moderator privileges were added to a user.
**Format** | `OnTWModAdd`
**Example** | `OnTWModAdd`

##### Parameters
| | |
------------ | -------------
**id** | The user ID of the new moderator.
**login** | The user login of the new moderator.
**name** | The user display name of the new moderator.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWModRemove
| | |
------------ | -------------
**Info** | Triggers when moderator privileges were removed from a user.
**Format** | `OnTWModRemove`
**Example** | `OnTWModRemove`

##### Parameters
| | |
------------ | -------------
**id** | The user ID of the removed moderator.
**login** | The user login of the removed moderator.
**name** | The user display name of the removed moderator.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWPoll
| | |
------------ | -------------
**Info** | Triggers when a poll starts in the channel.
**Format** | `OnTWPoll`
**Example** | `OnTWPoll`

##### Parameters
| | |
------------ | -------------
**title** | The title of the poll.
**duration** | The duration (in seconds) of the poll.
**bits_enabled** | [true/false] `true` if voting with bits is enabled. Otherwise, `false`.
**bits_amount** | The number of bits required to vote once.
**points_enabled** | [true/false] `true` if voting with channel points is enabled. Otherwise, `false`.
**points_amount** | The number of channel points required to vote once.
**choice_count** | The number of choices (answers, options, etc.) in the poll.
**choice#** | The text displayed for the choice in the poll. Replace `#` with a number, starting at 1 and ending at `choice_count`.
**choice_id#** | The id of the choice in the poll. Replace `#` with a number, starting at 1 and ending at `choice_count`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

_Note: Bit voting is not currently supported, however Twitch provides these values. Kruiz Control forwards them incase they are ever implemented._

***

#### OnTWPollEnd
| | |
------------ | -------------
**Info** | Triggers when a poll ends in the channel. Canceled or deleted polls do not trigger this.
**Format** | `OnTWPollEnd`
**Example** | `OnTWPollEnd`

##### Parameters
| | |
------------ | -------------
**title** | The title of the poll.
**duration** | The duration (in seconds) of the poll.
**winner** | The winning option in the poll.
**votes** | The number of votes cast for the winning option.
**bits_enabled** | [true/false] `true` if voting with bits is enabled. Otherwise, `false`.
**bits_amount** | The number of bits required to vote once.
**points_enabled** | [true/false] `true` if voting with channel points is enabled. Otherwise, `false`.
**points_amount** | The number of channel points required to vote once.
**choice_count** | The number of choices (answers, options, etc.) in the poll.
**choice#** | The text displayed for the choice in the poll. Replace `#` with a number, starting at 1 and ending at `choice_count`.
**choice_votes#** | The number of votes for a choice in the poll. Replace `#` with a number, starting at 1 and ending at `choice_count`.
**choice_id#** | The id of the choice in the poll. Replace `#` with a number, starting at 1 and ending at `choice_count`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

_Note: Bit voting is not currently supported, however Twitch provides these values. Kruiz Control forwards them incase they are ever implemented._

***

#### OnTWPollUpdate
| | |
------------ | -------------
**Info** | Triggers when any user votes in the poll.
**Format** | `OnTWPollUpdate`
**Example** | `OnTWPollUpdate`

##### Parameters
| | |
------------ | -------------
**title** | The title of the poll.
**duration** | The duration (in seconds) of the poll.
**time_left** | The time left (in seconds) for the poll.
**bits_enabled** | [true/false] `true` if voting with bits is enabled. Otherwise, `false`.
**bits_amount** | The number of bits required to vote once.
**points_enabled** | [true/false] `true` if voting with channel points is enabled. Otherwise, `false`.
**points_amount** | The number of channel points required to vote once.
**choice_count** | The number of choices (answers, options, etc.) in the poll.
**choice#** | The text displayed for the choice in the poll. Replace `#` with a number, starting at 1 and ending at `choice_count`.
**choice_votes#** | The number of votes for a choice in the poll. Replace `#` with a number, starting at 1 and ending at `choice_count`.
**choice_id#** | The id of the choice in the poll. Replace `#` with a number, starting at 1 and ending at `choice_count`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

_Note: Bit voting is not currently supported, however Twitch provides these values. Kruiz Control forwards them incase they are ever implemented._

***

#### OnTWPrediction
| | |
------------ | -------------
**Info** | Triggers when a prediction starts in the channel.
**Format** | `OnTWPrediction`
**Example** | `OnTWPrediction`

##### Parameters
| | |
------------ | -------------
**title** | The title of the prediction.
**duration** | The duration (in seconds) of the prediction.
**outcome_count** | The number of outcomes (options, etc.) in the prediction.
**outcome#** | The text displayed for the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_color#** | The color of the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_id#** | The id of the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWPredictionEnd
| | |
------------ | -------------
**Info** | Triggers when a prediction ends on the channel. This does not trigger if the prediction is canceled.
**Format** | `OnTWPredictionEnd`
**Example** | `OnTWPredictionEnd`

##### Parameters
| | |
------------ | -------------
**title** | The title of the prediction.
**result** | The winning prediction outcome.
**outcome_count** | The number of outcomes (options, etc.) in the prediction.
**outcome#** | The text displayed for the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_color#** | The color of the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_points#** | The number of points contributed towards the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`
**outcome_users#** | The number of users contributing towards the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_id#** | The id of the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWPredictionLock
| | |
------------ | -------------
**Info** | Triggers when participation in a prediction was locked.
**Format** | `OnTWPredictionLock`
**Example** | `OnTWPredictionLock`

##### Parameters
| | |
------------ | -------------
**title** | The title of the prediction.
**outcome_count** | The number of outcomes (options, etc.) in the prediction.
**outcome#** | The text displayed for the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_color#** | The color of the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_points#** | The number of points contributed towards the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`
**outcome_users#** | The number of users contributing towards the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_id#** | The id of the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).


***

#### OnTWPredictionUpdate
| | |
------------ | -------------
**Info** | Triggers when user participates in a prediction in the channel.
**Format** | `OnTWPredictionUpdate`
**Example** | `OnTWPredictionUpdate`

##### Parameters
| | |
------------ | -------------
**title** | The title of the prediction.
**duration** | The duration (in seconds) of the prediction.
**time_left** | The time left (in seconds) for the prediction.
**outcome_count** | The number of outcomes (options, etc.) in the prediction.
**outcome#** | The text displayed for the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_color#** | The color of the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_points#** | The number of points contributed towards the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`
**outcome_users#** | The number of users contributing towards the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**outcome_id#** | The id of the outcome in the prediction. Replace `#` with a number, starting at 1 and ending at `outcome_count`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWRaid
| | |
------------ | -------------
**Info** | Triggers when another streamer raids the broadcaster's channel.
**Format** | `OnTWRaid`
**Example** | `OnTWRaid`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who created the raid.
**login** | The user login of the user who created the raid.
**name** | The user display name of the user who created the raid.
**raiders** | The number of viewers in the raid.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWShieldStart
| | |
------------ | -------------
**Info** | Triggers when a moderator activates shield mode on the channel.
**Format** | `OnTWShieldStart`
**Example** | `OnTWShieldStart`

##### Parameters
| | |
------------ | -------------
**mod** | The user name of the moderator who activated shield mode.
**mod_id** | The user id of the moderator who activated shield mode.
**mod_login** | The user login of the moderator who activated shield mode.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWShieldStop
| | |
------------ | -------------
**Info** | Triggers when a moderator deactivates shield mode on the channel.
**Format** | `OnTWShieldStop`
**Example** | `OnTWShieldStop`

##### Parameters
| | |
------------ | -------------
**mod** | The user name of the moderator who deactivated shield mode.
**mod_id** | The user id of the moderator who deactivated shield mode.
**mod_login** | The user login of the moderator who deactivated shield mode.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWShoutout
| | |
------------ | -------------
**Info** | Triggers when a moderator sends a shoutout in the channel.
**Format** | `OnTWShoutout`
**Example** | `OnTWShoutout`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who received the shoutout.
**login** | The user login of the user who received the shoutout.
**name** | The user display name of the user who received the shoutout.
**mod** | The user display name of the mod who created the shoutout.
**viewers** | The number of users that were watching the stream at the time of the shoutout.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWShoutoutReceived
| | |
------------ | -------------
**Info** | Triggers when the channel receives a shoutout from another broadcaster.
**Format** | `OnTWShoutoutReceived`
**Example** | `OnTWShoutoutReceived`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who sent the shoutout.
**login** | The user login of the user who sent the shoutout.
**name** | The user display name of the user who sent the shoutout.
**viewers** | The number of users watching the other stream at the time of the shoutout.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWStreamStarted
| | |
------------ | -------------
**Info** | Triggers when the channel starts a stream.
**Format** | `OnTWStreamStarted`
**Example** | `OnTWStreamStarted`

##### Parameters
| | |
------------ | -------------
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWStreamStopped
| | |
------------ | -------------
**Info** | Triggers when the channel stops a stream.
**Format** | `OnTWStreamStopped`
**Example** | `OnTWStreamStopped`

##### Parameters
| | |
------------ | -------------
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWSub
| | |
------------ | -------------
**Info** | Triggers when the channel receives a subscriber. This does not include resubscribers.
**Format** | `OnTWSub`
**Example** | `OnTWSub`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who subscribed.
**login** | The user login of the user who subscribed.
**name** | The user display name of the user who subscribed.
**tier** | `1`, `2`, `3`, or `Prime` depending on what subscription tier the user is.
**is_gift** | [true/false] `true` if the user's subscription was a gifted sub. Otherwise, `false`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWSubGift
| | |
------------ | -------------
**Info** | Triggers when a viewer gives a gift subscription to one or more users in the specified channel.
**Format** | `OnTWSubGift`
**Example** | `OnTWSubGift`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who sent the subscription gift.
**login** | The user login of the user who sent the subscription gift.
**name** | The user display name of the user who sent the subscription gift.
**tier** | The tier of subscriptions in the subscription gift. `1`, `2`, or `3` depending on what subscription tier the user is.
**amount** | The number of subscriptions in the subscription gift.
**total_gifts** | The number of subscriptions gifted by this user in the channel. This value is empty for anonymous gifts or if the gifter has opted out of sharing this information.
**is_anonymous** | [true/false] `true` if the subscription gift was anonymous. Otherwise, `false`.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWSubMessage
| | |
------------ | -------------
**Info** | Triggers when a user sends a resubscription chat message in the channel.
**Format** | `OnTWSubMessage`
**Example** | `OnTWSubMessage`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who sent the resubscription chat message.
**login** | The user login of the user who sent the resubscription chat message.
**name** | The user display name of the user who sent the resubscription chat message.
**tier** | The tier of subscription in the resubscription chat message. `1`, `2`, or `3` depending on what subscription tier the user is.
**message** | The resubscription message.
**months** | The total number of months the user has been subscribed to the channel.
**streak** | The number of consecutive months the user’s current subscription has been active. This value is empty if the user has opted out of sharing this information.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWSuspiciousUser
| | |
------------ | -------------
**Info** | Triggers when a chat message has been sent from a suspicious user.
**Format** | `OnTWSuspiciousUser`
**Example** | `OnTWSuspiciousUser`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the suspicious user that sent the message.
**login** | The user login of the suspicious user that sent the message.
**name** | The user display name of the suspicious user that sent the message.
**type** | The type of suspicious user, i.e. `ban_evader`. `unknown` if no type provided by Twitch.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWTimeout
| | |
------------ | -------------
**Info** | Triggers when a viewer is timed out from the channel.
**Format** | `OnTWTimeout`
**Example** | `OnTWTimeout`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who was timed out.
**login** | The user login of the user who was timed out.
**name** | The user display name of the user who was timed out.
**mod** | The user name of the issuer of the timeout.
**reason** | The reason given for the timeout.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWUnban
| | |
------------ | -------------
**Info** | Triggers when a viewer is unbanned from the channel.
**Format** | `OnTWUnban`
**Example** | `OnTWUnban`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who was unbanned.
**login** | The user login of the user who was unbanned.
**name** | The user display name of the user who was unbanned.
**mod** | The user name of the issuer of the unban.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWUnVIP
| | |
------------ | -------------
**Info** | Triggers when a VIP is removed from the channel.
**Format** | `OnTWUnVIP`
**Example** | `OnTWUnVIP`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who was removed as a VIP.
**login** | The user login of the user who was removed as a VIP.
**name** | The user display name of the user who was removed as a VIP.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

#### OnTWVIP
| | |
------------ | -------------
**Info** | Triggers when a VIP is added to the channel.
**Format** | `OnTWVIP`
**Example** | `OnTWVIP`

##### Parameters
| | |
------------ | -------------
**id** | The user id of the user who was added as a VIP.
**login** | The user login of the user who was added as a VIP.
**name** | The user display name of the user who was added as a VIP.
**data** | The complete Twitch EventSub event data (for use with [Function](#function)).

***

### Twitch Actions

#### Twitch AddBlockedTerm
| | |
------------ | -------------
**Info** | Used to add a word or phrase to the broadcaster's list of blocked terms. These are the terms that the broadcaster doesn't want used in their chat room. `<term>` is the term or phrase to remove.
**Format** | `Twitch AddBlockedTerm <term>`
**Example** | `Twitch AddBlockedTerm "bad word"`
**Example w/ Aliases** | `Twitch AddBlockedTerm "phrase to block" "bad term"`

***

#### Twitch AdSchedule
| | |
------------ | -------------
**Info** | Used to retrieve upcoming scheduled ad, snooze, and pre-roll related information.
**Format** | `Twitch AdSchedule`
**Example** | `Twitch AdSchedule`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Ad Schedule API.
**next_ad_time** | The number of seconds until the next scheduled ad. The value is `-1` if no upcoming ad is scheduled.
**next_ad_duration** | The duration (in seconds) of the next scheduled ad.
**preroll_free_time** | The amount (in seconds) of pre-roll free time remaining for the channel.
**next_snooze_time** | The number of seconds until the broadcaster receives an additional ad snooze.
**snooze_count** | The number of snoozes available for the broadcaster.

***

#### Twitch Announcement
| | |
------------ | -------------
**Info** | Sends an announcement to the broadcaster's chat room. `<message>` is the announcement to make (500 characters or less). `<optional_color>` is an optional color used to highlight the announcement. The color must be one of `blue`, `green`, `orange`, `purple`, `primary` (the default).
**Format** | `Twitch Announcement <message> <optional_color>`
**Example** | `Twitch Announcement "Check out this announcement!"`
**Example w/ Color** | `Twitch Announcement "Check out this announcement!" blue`

***

#### Twitch Auth
| | |
------------ | -------------
**Info** | Request the current twitch credentials. Useful if running additional API calls not included in Kruiz Control.
**Format** | `Twitch Auth`
**Example** | `Twitch Auth`

##### Parameters
| | |
------------ | -------------
**channel_id** | The broadcaster's Twitch channel ID.
**client_id** | The Twitch client ID.
**client_secret** | The Twitch client secret.
**access_token** | The current Twitch OAuth access token (The _bearer_ token).

***

#### Twitch Authenticate
| | |
------------ | -------------
**Info** | Generate an login URL to authenticate a user and generate an access code.
**Format** | `Twitch Authenticate`
**Example** | `Twitch Authenticate`

##### Parameters
| | |
------------ | -------------
**auth_url** | The URL to open to authenticate a Twitch user.

***

#### Twitch Ban
| | |
------------ | -------------
**Info** | Ban a user from participating in the specified broadcaster's chat room. `<user>` is the Twitch user to ban. `<optional_reason>` is text to define the reason for the ban.
**Format** | `Twitch Ban <user> <optional_reason>`
**Example** | `Twitch Ban testUser`
**Example w/ Reason** | `Twitch Ban testUser "Inappropriate behavior"`

***

#### Twitch BitsLeaderboard
| | |
------------ | -------------
**Info** | Gets the Bits leaderboard for the authenticated broadcaster. `<optional_count>` is the number of users to return (default is 10). `<optional_period>` is the time period over which data is aggregated. Possible values are `day`, `week`, `month`, `year`, and `all` (default).
**Format** | `Twitch BitsLeaderboard <optional_count> <optional_period>`
**Example** | `Twitch BitsLeaderboard`
**Example w/ Count** | `Twitch BitsLeaderboard 3`
**Example w/ Count and Period** | `Twitch BitsLeaderboard 3 day`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Bit Leaderboard API.
**user_count** | The number of users retrieved on the leaderboard.
**user#** | The users on the leaderboard. Replace `#` with a number, starting at 1 and ending at `user_count`.
**bits#** | The bits given by the users on the leaderboard. Replace `#` with a number, starting at 1 and ending at `user_count`.

##### Example Usage

<table>
<tr>
<td>Retrieve the top 3 cheerers from the past month.</td>
</tr>
<tr>
<td>

```m
OnInit
Twitch BitsLeaderboard 3 month
if 2 {user_count} == 0
Chat Send "There are no users for this period."
Exit
Param Create i 1
Loop 2 {user_count}
Chat Send "#{i} {user{i}} cheered {bits{i}} bits this month!"
Param Add i 1
```

</td>
</tr>
</table>

***

#### Twitch Block
| | |
------------ | -------------
**Info** | Blocks the specified user from interacting with or having contact with the broadcaster. `<user>` is the Twitch user to block.
**Format** | `Twitch Block <user>`
**Example** | `Twitch Block testUser`

***

#### Twitch ChannelInfo
| | |
------------ | -------------
**Info** | Retrieves basic information about the specified channel. `<optional_user>` is the name of the twitch channel to retrieve. If no user is given, the `settings/twitch/user.txt` value is used.
**Format** | `Twitch ChannelInfo <optional_user>`
**Example** | `Twitch ChannelInfo`
**Example w/ User** | `Twitch ChannelInfo Kruiser8`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Channel Information API.
**game** | The game (or category) of the Twitch stream.
**language** | The broadcaster's preferred language.
**name** | The specified Twitch stream's display name.
**title** | The title of the specified Twitch stream.
**tag_count** | The number of tags retrieved for the channel.
**tag#** | The tags on the specified channel. Replace `#` with a number, starting at 1 and ending at `tag_count`.

***

#### Twitch Chatters
| | |
------------ | -------------
**Info** | Gets the list of all users that are connected to the broadcaster's chat session.
**Format** | `Twitch Chatters`
**Example** | `Twitch Chatters`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Chatters API.
**chatter_count** | The number of chatters in the channel.
**user#** | The users in the specified channel. Replace `#` with a number, starting at 1 and ending at `chatter_count`.

***

#### Twitch ChattersPaginated
| | |
------------ | -------------
**Info** | Gets a paginated list of users that are connected to the broadcaster's chat session. `<first>` is the number of chatters to get on this page between 1 and 1000. `<optional_cursor>` is the pagination cursor to use when retrieving the next page. On the first page, the cursor should not be supplied.
**Format** | `Twitch Chatters <first> <optional_cursor>`
**Example** | `Twitch Chatters 1000`
**Example w/ Cursor** | `Twitch Chatters 1000 eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Chatters API.
**chatter_count** | The number of chatters in the channel.
**cursor** | The pagination value to retrieve the next page of results.
**user#** | The users in the specified channel. Replace `#` with a number, starting at 1 and ending at `chatter_count`.

***

#### Twitch ClearChat
| | |
------------ | -------------
**Info** | Clears the broadcaster's chatroom. This is the equivalent of using the `/clear` chat command.
**Format** | `Twitch ClearChat`
**Example** | `Twitch ClearChat`

***

#### Twitch ClipById
| | |
------------ | -------------
**Info** | Retrieves the information for the specified clip id.
**Format** | `Twitch ClipById <id>`
**Example** | `Twitch ClipById AltruisticWiseNewtNomNom`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Clip API.
**clip** | The URL for the clip.
**name** | The name of the Twitch clip.
**duration** | The duration of the Twitch clip in seconds.

***

#### Twitch ClipsByUser
| | |
------------ | -------------
**Info** | Returns the top clips that were captured for the specified user. `<user>` is the channel to retrieve clips for. `<optional_count>` is the number of clips to retrieve (20 by default).
**Format** | `Twitch ClipsByUser <user> <optional_count>`
**Example** | `Twitch ClipsByUser Kruiser8`
**Example w/ Count** | `Twitch ClipsByUser Kruiser8 1`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Clip API.
**clip_count** | The number of clips retrieved.
**clip#** | The URL of the clip from the specified channel. Replace `#` with a number, starting at 1 and ending at `clip_count`.
**name#** | The name of the clip from the specified channel. Replace `#` with a number, starting at 1 and ending at `clip_count`.
**duration#** | The duration of the clip from the specified channel. Replace `#` with a number, starting at 1 and ending at `clip_count`.

***

#### Twitch Color
| | |
------------ | -------------
**Info** | Updates the color used for the user's name in chat. `<color>` is the color to use for the user's name in chat. Turbo and Prime users may specify a named color or a Hex color code like `#9146FF`. Otherwise, the color must be one of `blue`, `blue_violet`, `cadet_blue`, `chocolate`, `coral`, `dodger_blue`, `firebrick`, `golden_rod`, `green`, `hot_pink`, `orange_red`, `red`, `sea_green`, `spring_green`, `yellow_green`.
**Format** | `Twitch Color <color>`
**Example** | `Twitch Color green`
**Example w/ Hex** | `Twitch Color #9146FF`

***

#### Twitch Commercial
| | |
------------ | -------------
**Info** | Starts a commercial on the Twitch channel. `<optional_duration>` is the number of seconds for the commercial to run (default is 60). Note that Twitch tries to serve a commercial that's the requested length, but it may be shorter or longer. The maximum length you should request is 180 seconds.
**Format** | `Twitch Commercial <optional_duration>`
**Example** | `Twitch Commercial`
**Example w/ Duration** | `Twitch Commercial 120`

***

#### Twitch Complete
| | |
------------ | -------------
**Info** | Mark a channel point reward redemption as complete. `<reward_id>` is the id of the channel point reward. `<redemption_id>` is the id of the channel point reward redemption. Both of these values are provided by `OnTWChannelPoint` as parameters. To reject a redemption and refund points, use [Twitch Reject](#twitch-reject).
**Format** | `Twitch Complete <reward_id> <redemption_id>`
**Example** | `Twitch Complete 92af127c-7326-4483-a52b-b0da0be61c01 17fa2df1-ad76-4804-bfa5-a40ef63efe63`
**Example using OnTWChannelPoint Parameters** | `Twitch Complete {reward_id} {redemption_id}`

_Note: Due to a Twitch API restriction, in order for Kruiz Control to interact with Channel Point rewards, Kruiz Control has to create the reward. Use [Twitch Copy](#twitch-copy) to create duplicates of existing channel point rewards._

***

#### Twitch Copy
| | |
------------ | -------------
**Info** | Create a copy of a channel point reward so that KC can manage the reward and redemptions. `<reward>` is the title of the channel point reward to copy. This action will create a copy of the reward with `kc_` in the title and will be disabled by default. The reward icon (image) will have to be re-added.
**Format** | `Twitch Copy <reward>`
**Example** | `Twitch Copy HeadPat`

***

#### Twitch CreateClip
| | |
------------ | -------------
**Info** | Creates a clip from the broadcaster's stream. If `<optional_should_delay>` is included and set to `true`, then Twitch adds a delay before capturing the clip (this basically shifts the capture window to the right slightly). Otherwise, no delay is added.
**Format** | `Twitch CreateClip <optional_should_delay>`
**Example** | `Twitch CreateClip`
**Example w/ optional_should_delay** | `Twitch CreateClip true`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Create Clip API.
**url** | The url of the created clip.
**id** | The ID of the created clip.

***

#### Twitch CreateReward
| | |
------------ | -------------
**Info** | Creates a channel point reward in the broadcaster's stream. `<name>` is the name of the channel point reward. `<optional_cost>` is an optional input to set the cost of the reward (default: 1000).
**Format** | `Twitch CreateReward <name> <optional_cost>`
**Example** | `Twitch CreateReward Waldo`
**Example w/ optional_cost** | `Twitch CreateReward Waldo 1234`

***

#### Twitch DeleteMessage
| | |
------------ | -------------
**Info** | Deletes a chat message by the provided id. `<message_id>` is the id of the chat message to delete. This can be used with the `message_id` parameter returned by [Chat Triggers](#chat-triggers).
**Format** | `Twitch DeleteMessage <message_id>`
**Example** | `Twitch DeleteMessage abc-123-def`

***

#### Twitch Description
| | |
------------ | -------------
**Info** | Updates the specified broadcaster's channel description. `<description>` is the text to update the channel's description to. The description is limited to a maximum of 300 characters.
**Format** | `Twitch Description <description>`
**Example** | `Twitch Description "Hey there -- Welcome to the Krew!"`

***

#### Twitch EmoteOnly
| | |
------------ | -------------
**Info** | Turn on emote only mode where chat messages must contain only emotes.
**Format** | `Twitch EmoteOnly`
**Example** | `Twitch EmoteOnly`

***

#### Twitch EmoteOnlyOff
| | |
------------ | -------------
**Info** | Turn off emote only mode where chat messages must contain only emotes.
**Format** | `Twitch EmoteOnlyOff`
**Example** | `Twitch EmoteOnlyOff`

***

#### Twitch Emotes
| | |
------------ | -------------
**Info** | Gets the channel's list of custom emotes. `<optional_user>` is the channel to query (Default is the `settings/twitch/user.txt` value).
**Format** | `Twitch Emotes <optional_user>`
**Example** | `Twitch Emotes`
**Example w/ User** | `Twitch Emotes Kruiser8`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Channel Emotes API.
**emote_count** | The number of emotes retrieved.
**emote#** | An emote from the specified channel. Replace `#` with a number, starting at 1 and ending at `emote_count`.

***

#### Twitch FollowCount
| | |
------------ | -------------
**Info** | Retrieve the number of followers for the given channel. `<optional_user>` is the channel to check. The broadcaster's follower count is used if no user is provided.
**Format** | `Twitch FollowCount <optional_user>`
**Example** | `Twitch FollowCount`
**Example w/ User** | `Twitch FollowCount Kruiser8`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Followed Streams API.
**follow_count** | The total number of users that follow the specified channel.

***

#### Twitch Followers
| | |
------------ | -------------
**Info** | Restricts the broadcaster's chat room to followers only. `<optional_duration>` is the number of minutes to be in follower mode. The default duration is 0 (no restriction) and the maximum is 129,600 (3 months).
**Format** | `Twitch Followers <optional_duration>`
**Example** | `Twitch Followers`
**Example w/ Duration** | `Twitch Followers 60`

***

#### Twitch FollowersOff
| | |
------------ | -------------
**Info** | Disable follower only mode in the broadcaster's chat.
**Format** | `Twitch FollowersOff`
**Example** | `Twitch FollowersOff`

***

#### Twitch Game
| | |
------------ | -------------
**Info** | Updates a channel's game (or category). `<game>` is the game to set for the channel. The `<game>` value must match a Twitch category exactly.
**Format** | `Twitch Game <game>`
**Example** | `Twitch Game "Rocket League"`

***

#### Twitch Goals
| | |
------------ | -------------
**Info** | Gets the broadcaster's list of active goals.
**Format** | `Twitch Goals`
**Example** | `Twitch Goals`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Creator Goals API.
**goal_count** | The number of goals retrieved.
**goal#** | The name (description) of the goal. Replace `#` with a number, starting at 1 and ending at `goal_count`.
**type#** | The type of the goal (follower, subscriber, etc.). Replace `#` with a number, starting at 1 and ending at `goal_count`.
**current#** | The current value of the goal. Replace `#` with a number, starting at 1 and ending at `goal_count`.
**target#** | The target value of the goal. Replace `#` with a number, starting at 1 and ending at `goal_count`.
**perc#** | The current progress percentage of the goal (between 0 and 100). Replace `#` with a number, starting at 1 and ending at `goal_count`.

***

#### Twitch IsFollower
| | |
------------ | -------------
**Info** | Check if the given user follows the channel. `<user>` is the channel to check.
**Format** | `Twitch IsFollower <user>`
**Example** | `Twitch IsFollower Kruiser8`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Channel Followers API.
**is_follower** | [true/false] `true` if the user follows the channel. Otherwise, `false`.

***

#### Twitch IsShieldMode
| | |
------------ | -------------
**Info** | Check if the stream has shield mode active.
**Format** | `Twitch IsShieldMode`
**Example** | `Twitch IsShieldMode`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Channel Followers API.
**is_shield_mode** | [true/false] `true` if the stream has shield mode active. Otherwise, `false`.

***

#### Twitch IsSubscriber
| | |
------------ | -------------
**Info** | Check if the given user subscribes to the channel. `<user>` is the channel to check.
**Format** | `Twitch IsSubscriber <user>`
**Example** | `Twitch IsSubscriber Kruiser8`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Channel Followers API.
**is_subscriber** | [true/false] `true` if the user subscribes to the channel. Otherwise, `false`.
**is_gifted** | [true/false] `true` if the user's subscription was a gifted sub. Otherwise, `false`.
**gifter** | If `is_gifted`, this will contain the name of the user who gifted the subscription.
**tier** | `1`, `2` or `3`, depending on what Tier the subscribed user is.

***

#### Twitch Marker
| | |
------------ | -------------
**Info** | Adds a marker to a live stream. A marker is an arbitrary point in a live stream that the broadcaster or editor wants to mark, so they can return to that spot later to create video highlights (see Video Producer, Highlights in the Twitch UX). `<optional_description>` is an optional short description of the marker to help remember why the location was marked. The maximum length of the description is 140 characters.
**Format** | `Twitch Marker <optional_description>`
**Example** | `Twitch Marker`
**Example w/ description** | `Twitch Marker "Amazing goal!"`

***

#### Twitch Mod
| | |
------------ | -------------
**Info** | Adds a moderator to the broadcaster's chat room. `<user>` is the Twitch user to mod.
**Format** | `Twitch Mod <user>`
**Example** | `Twitch Mod testUser`

***

#### Twitch Mods
| | |
------------ | -------------
**Info** | Gets the broadcaster's list of moderators.
**Format** | `Twitch Mods`
**Example** | `Twitch Mods`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Moderators API.
**mod_count** | The number of moderators retrieved.
**mod#** | The name of the moderator. Replace `#` with a number, starting at 1 and ending at `mod_count`.
**id#** | The user id (login) of the moderator. Replace `#` with a number, starting at 1 and ending at `mod_count`.

***

#### Twitch Poll Cancel
| | |
------------ | -------------
**Info** | Cancel the poll and send channel point refunds to the participants (if points enabled).
**Format** | `Twitch Poll Cancel`
**Example** | `Twitch Poll Cancel`

***

#### Twitch Poll Choice
| | |
------------ | -------------
**Info** | Provide the choices for the poll. `<choice>` is the poll option to add. Multiple choices can be added in the same action or across multiple actions.
**Format** | `Twitch Poll Choice <choice>`
**Example** | `Twitch Poll Choice Yes`
**Example to Add Multiple Outcomes** | `Twitch Poll Choice "Yes" "No"`

_Note: For a complete poll example, see [Twitch Poll Create](#twitch-poll-create)._

***

#### Twitch Poll Clear
| | |
------------ | -------------
**Info** | Clear the current poll data, removing any existing poll details.
**Format** | `Twitch Poll Clear`
**Example** | `Twitch Poll Clear`

***

#### Twitch Poll Create
| | |
------------ | -------------
**Info** | Creates a poll on the channel. The poll runs as soon as it's created. The broadcaster may run only one poll at a time.
**Format** | `Twitch Poll Create`
**Example** | `Twitch Poll Create`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Create Poll API.

##### Example Usage

<table>
<tr>
<td>Create a Poll</td>
</tr>
<tr>
<td>

```m
OnInit
Twitch Poll Title "Will Kruizy Die??"
Twitch Poll Choice "Yes" "No"
Twitch Poll Choice "MAYBE"
Twitch Poll Time 20
Twitch Poll Create
Delay 10
# End the poll early (to show you can)
Twitch Poll End
```

</td>
</tr>
</table>

***

#### Twitch Poll End
| | |
------------ | -------------
**Info** | Complete the poll early before time is up.
**Format** | `Twitch Poll End`
**Example** | `Twitch Poll End`

***

#### Twitch Poll PointsPerVote
| | |
------------ | -------------
**Info** | Enable viewers to cast additional votes using channel points. `<points>` is the number of points (between 1 and 1,000,000) that the viewer must spend to cast one additional vote. If `Twitch Poll PointsPerVote` isn't used, channel points may not be used to vote.
**Format** | `Twitch Poll PointsPerVote <points>`
**Example** | `Twitch Poll PointsPerVote 10000`

_Note: For a complete poll example, see [Twitch Poll Create](#twitch-poll-create)._

***

#### Twitch Poll Time
| | |
------------ | -------------
**Info** | Provide the number of seconds that the poll will run for. The minimum is 15 seconds and the maximum is 1800 seconds (30 minutes). `<seconds>` is the number of seconds. If no time is provided for a poll, `120` is used.
**Format** | `Twitch Poll Time <seconds>`
**Example** | `Twitch Poll Time 300`

_Note: For a complete poll example, see [Twitch Poll Create](#twitch-poll-create)._

***

#### Twitch Poll Title
| | |
------------ | -------------
**Info** | Provide the question that the broadcaster is asking. `<title>` is the title to use for the poll. The title may contain a maximum of 60 characters.
**Format** | `Twitch Poll Title <title>`
**Example** | `Twitch Poll Title "Do you believe?"`

_Note: For a complete poll example, see [Twitch Poll Create](#twitch-poll-create)._

***

#### Twitch Prediction Cancel
| | |
------------ | -------------
**Info** | Cancel the prediction and send channel point refunds to the participants.
**Format** | `Twitch Prediction Cancel`
**Example** | `Twitch Prediction Cancel`

***

#### Twitch Prediction Clear
| | |
------------ | -------------
**Info** | Clear the current Prediction data, removing any existing prediction details.
**Format** | `Twitch Prediction Clear`
**Example** | `Twitch Prediction Clear`

***

#### Twitch Prediction Complete
| | |
------------ | -------------
**Info** | Complete the prediction and provide the winning outcome. `<outcome>` is the prediction option that won. This must match the text of the outcome exactly.
**Format** | `Twitch Prediction Complete <outcome>`
**Example** | `Twitch Prediction Complete Yes`

***

#### Twitch Prediction Create
| | |
------------ | -------------
**Info** | Creates a Channel Points Prediction. The prediction runs as soon as it's created. The broadcaster may run only one prediction at a time.
**Format** | `Twitch Prediction Create`
**Example** | `Twitch Prediction Create`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Create Prediction API.

##### Example Usage

<table>
<tr>
<td>Create a Prediction</td>
</tr>
<tr>
<td>

```m
OnInit
Twitch Prediction Title "Will Kruizy Die??"
Twitch Prediction Outcome "Yes" "No"
Twitch Prediction Outcome "MAYBE"
Twitch Prediction Time 20
Twitch Prediction Create
Delay 25
# Mark "MAYBE" as the winning result
Twitch Prediction Complete "MAYBE"
```

</td>
</tr>
</table>

***

#### Twitch Prediction Lock
| | |
------------ | -------------
**Info** | Lock the current prediction, making it so viewers can no longer make predictions.
**Format** | `Twitch Prediction Lock`
**Example** | `Twitch Prediction Lock`

***

#### Twitch Prediction Outcome
| | |
------------ | -------------
**Info** | Provide the outcomes (or options) for the prediction. `<outcome>` is the prediction option to add. Multiple outcomes can be added in the same action or across multiple actions.
**Format** | `Twitch Prediction Outcome <outcome>`
**Example** | `Twitch Prediction Outcome Yes`
**Example to Add Multiple Outcomes** | `Twitch Prediction Outcome "Yes" "No"`

_Note: For a complete prediction example, see [Twitch Prediction Create](#twitch-prediction-create)._

***

#### Twitch Prediction Time
| | |
------------ | -------------
**Info** | Provide the number of seconds that the prediction will run for. The minimum is 30 seconds and the maximum is 1800 seconds (30 minutes). `<seconds>` is the number of seconds. If no time is provided for a prediction, `120` is used.
**Format** | `Twitch Prediction Time <seconds>`
**Example** | `Twitch Prediction Time 300`

_Note: For a complete prediction example, see [Twitch Prediction Create](#twitch-prediction-create)._

***

#### Twitch Prediction Title
| | |
------------ | -------------
**Info** | Provide the question that the broadcaster is asking. `<title>` is the title to use for the prediction. The title is limited to a maximum of 45 characters.
**Format** | `Twitch Prediction Title <title>`
**Example** | `Twitch Prediction Title "Do you believe?"`

_Note: For a complete prediction example, see [Twitch Prediction Create](#twitch-prediction-create)._

***

#### Twitch Raid
| | |
------------ | -------------
**Info** | Raid another channel by sending the broadcaster's viewers to the targeted channel. `<user>` is the Twitch channel to raid.
**Format** | `Twitch Raid <user>`
**Example** | `Twitch Raid testUser`

***

#### Twitch Reject
| | |
------------ | -------------
**Info** | Mark a channel point reward redemption as rejected and refund a user's points. `<reward_id>` is the id of the channel point reward. `<redemption_id>` is the id of the channel point reward redemption. Both of these values are provided by `OnTWChannelPoint` as parameters. To complete a redemption, use [Twitch Complete](#twitch-complete).
**Format** | `Twitch Reject <reward_id> <redemption_id>`
**Example** | `Twitch Reject 92af127c-7326-4483-a52b-b0da0be61c01 17fa2df1-ad76-4804-bfa5-a40ef63efe63`
**Example using OnTWChannelPoint Parameters** | `Twitch Reject {reward_id} {redemption_id}`

_Note: Due to a Twitch API restriction, in order for Kruiz Control to interact with Channel Point rewards, Kruiz Control has to create the reward. Use [Twitch Copy](#twitch-copy) to create duplicates of existing channel point rewards._

***

#### Twitch RemoveBlockedTerm
| | |
------------ | -------------
**Info** | Used to remove a word or phrase from the broadcaster's list of blocked terms. These are the terms that the broadcaster doesn't want used in their chat room. `<term>` is the term or phrase to remove.
**Format** | `Twitch RemoveBlockedTerm <term>`
**Example** | `Twitch RemoveBlockedTerm "bad word"`
**Example w/ Aliases** | `Twitch RemoveBlockedTerm "phrase to block" "bad term"`

***

#### Twitch Reward
| | |
------------ | -------------
**Info** | Used to update the status of a channel point reward. `<reward>` is the title of the reward to update. `<off/on/pause/toggle/unpause>` are the status options. `off`, `on`, and `toggle` enable or disable the reward. `pause` and `unpause` will pause or resume the ability for viewers to redeem the reward.
**Format** | `Twitch Reward <reward> <off/on/pause/toggle/unpause>`
**Example** | `Twitch Reward HeadPat off`

_Note: Due to a Twitch API restriction, in order for Kruiz Control to interact with Channel Point rewards, Kruiz Control has to create the reward. Use [Twitch Copy](#twitch-copy) to create duplicates of existing channel point rewards._

***

#### Twitch RewardCost
| | |
------------ | -------------
**Info** | Used to update the cost of a channel point reward. `<reward>` is the current name of the reward to update. `<cost>` is the new cost to apply.
**Format** | `Twitch RewardCost <reward> cost`
**Example** | `Twitch RewardCost HeadPat 300`

_Note: Due to a Twitch API restriction, in order for Kruiz Control to interact with Channel Point rewards, Kruiz Control has to create the reward. Use [Twitch Copy](#twitch-copy) to create duplicates of existing channel point rewards._

***

#### Twitch RewardDescription
| | |
------------ | -------------
**Info** | Used to update the description of a channel point reward. `<reward>` is the current name of the reward to update. `<description>` is the new description to apply.
**Format** | `Twitch RewardDescription <reward> <description>`
**Example** | `Twitch RewardDescription HeadPat "[Disabled while the camera is not shown]"`

_Note: Due to a Twitch API restriction, in order for Kruiz Control to interact with Channel Point rewards, Kruiz Control has to create the reward. Use [Twitch Copy](#twitch-copy) to create duplicates of existing channel point rewards._

***

#### Twitch RewardName
| | |
------------ | -------------
**Info** | Used to update the name of a channel point reward. `<reward>` is the current name of the reward to update. `<name>` is the new name to apply.
**Format** | `Twitch RewardName <reward> <name>`
**Example** | `Twitch RewardName HeadPat HeadBoop`

_Note: Due to a Twitch API restriction, in order for Kruiz Control to interact with Channel Point rewards, Kruiz Control has to create the reward. Use [Twitch Copy](#twitch-copy) to create duplicates of existing channel point rewards._

***

#### Twitch Shield
| | |
------------ | -------------
**Info** | Activates or deactivates the broadcaster's Shield Mode.
**Format** | `Twitch Shield <on/off/toggle>`
**Example** | `Twitch Shield toggle`

***

#### Twitch Shoutout
| | |
------------ | -------------
**Info** | Sends a Shoutout to the specified channel. `<user>` is the Twitch channel to shoutout.
**Format** | `Twitch Shoutout <user>`
**Example** | `Twitch Shoutout testUser`

***

#### Twitch Slow
| | |
------------ | -------------
**Info** | Limit how often users in the chat room are allowed to send messages. `<optional_duration>` is the number of seconds that users must wait between sending messages (default 30). The minimum duration is 3 seconds and the maximum is 120 (2 minutes).
**Format** | `Twitch Slow <optional_duration>`
**Example** | `Twitch Slow`
**Example w/ Duration** | `Twitch Slow 60`

***

#### Twitch SlowOff
| | |
------------ | -------------
**Info** | Disable slow mode in the broadcaster's chat.
**Format** | `Twitch SlowOff`
**Example** | `Twitch SlowOff`

***

#### Twitch Streams
| | |
------------ | -------------
**Info** | Gets the list of followed streams that are currently live.
**Format** | `Twitch Streams`
**Example** | `Twitch Streams`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Followed Streams API.
**stream_count** | The number of streams retrieved.
**stream#** | The name of the stream. Replace `#` with a number, starting at 1 and ending at `stream_count`.
**id#** | The user id (login) of the stream. Replace `#` with a number, starting at 1 and ending at `stream_count`.
**game#** | The game of the stream. Replace `#` with a number, starting at 1 and ending at `stream_count`.

***

#### Twitch SubCount
| | |
------------ | -------------
**Info** | Retrieve the number of followers for the given channel.
**Format** | `Twitch SubCount`
**Example** | `Twitch SubCount`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Broadcaster Subscriptions API.
**sub_count** | The total number of users that subscribe to this broadcaster.
**sub_points** | The current number of subscriber points earned by this broadcaster. Points are based on the subscription tier of each user. For example, a Tier 1 subscription is worth 1 point, Tier 2 is worth 2 points, and Tier 3 is worth 6 points.

***

#### Twitch Subscribers
| | |
------------ | -------------
**Info** | Restricts the broadcaster's chat room to subscribers only.
**Format** | `Twitch Subscribers`
**Example** | `Twitch Subscribers`

***

#### Twitch SubscribersOff
| | |
------------ | -------------
**Info** | Disable subscriber only mode in the broadcaster's chat.
**Format** | `Twitch SubscribersOff`
**Example** | `Twitch SubscribersOff`

***

#### Twitch Tags
| | |
------------ | -------------
**Info** | Update the channel-defined tags on the channel. `<tag>` is the tag to add. Up to 10 tags may be provided. Each tag is limited to a maximum of 25 characters and may not be an empty string or contain spaces or special characters. Tags are case insensitive.
**Format** | `Twitch Tags <tag1> <tag2> ... <tag10>`
**Example** | `Twitch Tags "Rocket League" "Champion" "Ranked"`

***

#### Twitch Teams
| | |
------------ | -------------
**Info** | Gets the list of Twitch teams that the broadcaster is a member of.
**Format** | `Twitch Teams`
**Example** | `Twitch Teams`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Teams API.
**team_count** | The number of teams retrieved.
**team#** | The name of the team. Replace `#` with a number, starting at 1 and ending at `team_count`.

***

#### Twitch Timeout
| | |
------------ | -------------
**Info** | Timeout a user from the chat room. `<user>` is the Twitch user to ban. `<optional_duration>` is an optional input with the number of seconds for a timeout (the default is 1). The minimum timeout is 1 second and the maximum is 1,209,600 seconds (2 weeks). `<optional_reason>` is text to define the reason for the timeout.
**Format** | `Twitch Timeout <user> <optional_duration> <optional_reason>`
**Example** | `Twitch Timeout testUser`
**Example w/ Duration** | `Twitch Timeout testUser 1`
**Example w/ Duration and Reason** | `Twitch Timeout testUser 1209600 "Inappropriate behavior, come back in two weeks!"`

***

#### Twitch Title
| | |
------------ | -------------
**Info** | Updates a channel's title. `<title>` is the title to set for the channel.
**Format** | `Twitch Title <title>`
**Example** | `Twitch Title "Rocket League with viewers!"`

***

#### Twitch Unban
| | |
------------ | -------------
**Info** | Unban a user from the specified broadcaster's chat room. `<user>` is the Twitch user to unban.
**Format** | `Twitch Unban <user>`
**Example** | `Twitch Unban testUser`

***

#### Twitch Unblock
| | |
------------ | -------------
**Info** | Unblock the specified user from interacting with or having contact with the broadcaster. `<user>` is the Twitch user to unblock.
**Format** | `Twitch Unblock <user>`
**Example** | `Twitch Unblock testUser`

***

#### Twitch UniqueChat
| | |
------------ | -------------
**Info** | Restricts the broadcaster's chat room to require users to post only unique messages in the chat room.
**Format** | `Twitch UniqueChat`
**Example** | `Twitch UniqueChat`

***

#### Twitch UniqueChatOff
| | |
------------ | -------------
**Info** | Disable unique chat mode in the broadcaster's chat.
**Format** | `Twitch UniqueChatOff`
**Example** | `Twitch UniqueChatOff`

***

#### Twitch Unmod
| | |
------------ | -------------
**Info** | Remove moderator status from a user in the broadcaster's chat room. `<user>` is the Twitch user to update.
**Format** | `Twitch Unmod <user>`
**Example** | `Twitch Unmod testUser`

***

#### Twitch Unraid
| | |
------------ | -------------
**Info** | Cancel a pending raid in the broadcaster's chat room. You can cancel a raid at any point up until the broadcaster clicks _Raid Now_ on Twitch or the 90-second countdown expires.
**Format** | `Twitch Unraid`
**Example** | `Twitch Unraid`

***

#### Twitch UnVIP
| | |
------------ | -------------
**Info** | Remove VIP status from a user in the broadcaster's chat room. `<user>` is the Twitch user to update.
**Format** | `Twitch UnVIP <user>`
**Example** | `Twitch UnVIP testUser`

***

#### Twitch User
| | |
------------ | -------------
**Info** | Retrieves user data for the provided channel. `<optional_user>` is the channel name to retrieve. If no user is provided, the broadcaster information retrieved.
**Format** | `Twitch User <optional_user>`
**Example** | `Twitch User`
**Example w/ User** | `Twitch User Kruiser8`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch User API.
**user** | The user's display name.
**description** | The user's channel description.
**profile_image** | The URL to the user's profile image.

***

#### Twitch UserColor
| | |
------------ | -------------
**Info** | Retrieves the color used for the user's name in chat. `<user>` is the name of the username to retrieve the chat color.
**Format** | `Twitch UserColor <user>`
**Example** | `Twitch UserColor Kruiser8`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch User Chat Color API.
**color** | The Hex color code that the user uses in chat for their name. If the user hasn't specified a color in their settings, the string is empty.
**name** | The user's display name.

***

#### Twitch Videos
| | |
------------ | -------------
**Info** | Gets information about one or more published videos. `<optional_type>` is the type of videos to return. The possible types are `archive` (VODS), `highlight`, `upload`, or `all` (default). `<optional_period>` is a filter used to filter the list of videos by when they were published. Possible periods are `day`, `week`, `month`, and `all` (default). `<optional_sort>` is the order to sort the returned videos in. Possible sort values are `time` (default: created, latest first), `trending` (biggest gain in viewership), or `views`.
**Format** | `Twitch Videos <optional_type> <optional_period> <optional_sort>`
**Example** | `Twitch Videos`
**Example w/ Type** | `Twitch Videos Upload`
**Example w/ Type and Period** | `Twitch Videos Archive month`
**Example w/ Type, Period, and Sort** | `Twitch Videos Highlight all views`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Videos API.
**video_count** | The number of users retrieved on the leaderboard.
**title#** | The title of the video. Replace `#` with a number, starting at 1 and ending at `video_count`.
**description#** | The description of the video. Replace `#` with a number, starting at 1 and ending at `video_count`.
**url#** | The url of the video. Replace `#` with a number, starting at 1 and ending at `video_count`.

***

#### Twitch VIP
| | |
------------ | -------------
**Info** | Adds a VIP to the broadcaster's chat room. `<user>` is the Twitch user to give VIP status.
**Format** | `Twitch VIP <user>`
**Example** | `Twitch VIP testUser`

***

#### Twitch VIPs
| | |
------------ | -------------
**Info** | Gets the broadcaster's list of VIPs.
**Format** | `Twitch VIPs`
**Example** | `Twitch VIPs`

##### Parameters
| | |
------------ | -------------
**data** | The complete response from the Twitch Moderators API.
**vip_count** | The number of moderators retrieved.
**vip#** | The name of the VIP. Replace `#` with a number, starting at 1 and ending at `vip_count`.
**id#** | The user id (login) of the VIP. Replace `#` with a number, starting at 1 and ending at `vip_count`.

***

#### Twitch Warn
| | |
------------ | -------------
**Info** | Warns a user in the broadcaster’s chat room, preventing them from chat interaction until the warning is acknowledged. `<user>` is the Twitch user to warn. `<reason>` is text to define the reason for the warning..
**Format** | `Twitch Warn <user> <reason>`
**Example** | `Twitch Warn testUser "This channel does not tolerate that type of language. This is your only warning."`

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

***

## Voicemod
Enables the ability to interact with Voicemod, a real-time voice changer and soundboard.

### Voicemod Triggers
None at the moment.

***

### Voicemod Actions

#### Voicemod Background
| | |
------------ | -------------
**Info** | Used to alter whether or not Voicemod background effects are enabled. `<on/off/toggle>` determines whether the background effect is turned on, off, or toggled.
**Format** | `Voicemod Background <on/off/toggle>`
**Example** | `Voicemod Background on`

***

#### Voicemod Beep
| | |
------------ | -------------
**Info** | Used to trigger the censor bleep for a period of time. `<optional_duration>` is the number of seconds to play the censor noise. If no duration is provided, the bleep is played for 1 second.
**Format** | `Voicemod Beep <optional_duration>`
**Example** | `Voicemod Beep`
**Example w/ duration** | `Voicemod Beep 3`

***

#### Voicemod Hear
| | |
------------ | -------------
**Info** | Used to alter whether or not the Voicemod hear myself setting is enabled. `<on/off/toggle>` determines whether the Voicemod hear myself setting is turned on, off, or toggled.
**Format** | `Voicemod Hear <on/off/toggle>`
**Example** | `Voicemod Hear on`

***

#### Voicemod Mute
| | |
------------ | -------------
**Info** | Used to mute yourself through Voicemod. `<on/off/toggle>` determines whether the Voicemod mute is turned on, off, or toggled.
**Format** | `Voicemod Mute <on/off/toggle>`
**Example** | `Voicemod Mute on`

***

#### Voicemod Play
| | |
------------ | -------------
**Info** | Used to play a sound from a Voicemod soundboard. `<soundboard>` is the name of the soundboard in Voicemod. `<sound>` is the name of the sound to play.
**Format** | `Voicemod Play <soundboard> <sound>`
**Example** | `Voicemod Play Prankster "Sad Trombone"`

***

#### Voicemod Random
| | |
------------ | -------------
**Info** | Used to select a random voice in Voicemod. `<optional_type>` is the type of random voice to choose. If no `<optional_type>` is provided, the random voice is selected from all available voices. If `<optional_type>` is `favorite` or `custom`, then only a favorite or custom voice in Voicemod will be randomly selected.
**Format** | `Voicemod Random <optional_type>`
**Example** | `Voicemod Random`
**Example w/ Type** | `Voicemod Random favorite`

***

#### Voicemod Stop
| | |
------------ | -------------
**Info** | Used to stop all sounds from the Voicemod soundboard.
**Format** | `Voicemod Stop`
**Example** | `Voicemod Stop`

***

#### Voicemod Voice
| | |
------------ | -------------
**Info** | Used to select a voice in Voicemod. `<voice>` is the name of the voice to select.
**Format** | `Voicemod Voice <voice>`
**Example** | `Voicemod Voice Chipmunk`

***

#### Voicemod VoiceChanger
| | |
------------ | -------------
**Info** | Used to alter whether or not the Voicemod voice changer setting is enabled. `<on/off/toggle>` determines whether the Voicemod voice changer setting is turned on, off, or toggled.
**Format** | `Voicemod VoiceChanger <on/off/toggle>`
**Example** | `Voicemod VoiceChanger on`
