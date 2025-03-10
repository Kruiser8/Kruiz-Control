# Kruiz Control

<p align="center">
  <img src="logo.png" width="150" title="Kruiz Control Logo">
</p>

<p align="center"><i>
Kruiz Control enables a pseudo code approach to manage and automatically handle Twitch chat and events, OBS or SLOBS, and StreamElements or Streamlabs alerts.
</i></p>
<p align="center"><b>
  <a href="https://youtu.be/BwDzVOh1MCM">Tutorial</a> |
  <a href="https://github.com/Kruiser8/Kruiz-Control/archive/master.zip">Download</a> |
  <a href="js/Documentation.md#kruiz-control-documentation">Documentation</a> |
  <a href="settings/Settings.md#kruiz-control-settings">Settings</a>
</b></p>

<p align="center"><i><b>
  <a href="https://twitter.com/kruiser8">@Kruiser8</a> |
  <a href="https://trello.com/b/oIV3q6Im/kruiz-control">Trello (Roadmap)</a> |
  <a href="https://patreon.com/kruiser8">Patreon</a> |
  <a href="https://discord.gg/wU3ZK3Q">Support Discord</a>
</b></i></p>

## Table of Contents

- [Setup Guide](#setup-guide)
- [Compatibility](#compatibility)
- [Installation](#installation)
  + [Settings](#settings)
  + [Add as Browser Source](#add-as-browser-source)
  + [OBS Websocket](#obs-websocket)
- [Usage](#usage)
  + [Pseudo Code Format](#pseudo-code-format)
  + [triggers.txt](#triggerstxt)
  + [fileTriggers.txt and the triggers folder](#filetriggerstxt-and-the-triggers-folder)
  + [sounds folder](#sounds-folder)
- [FAQ](#faq)
  + [XSplit Support](#xsplit-support)
  + [Support for Youtube Alerts](#support-for-youtube-alerts)
  + [Support for Youtube Chat](#support-for-youtube-chat)
  + [Will you support X](#will-you-support-x)
- [Support the Project](#support-the-project)
- [Associated Projects](#associated-projects)
- [Credits](#credits)

***

## Setup Guide

- Add the **index.html** to OBS or SLOBS as a browser source.
- Fill out [the settings files](settings/Settings.md) in the settings folder.
- Type `!example` in your twitch chat. If your user responds with `Success! It worked!`, you're good to go!
- Customize the _triggers.txt_ with your own triggers from the [the documentation](js/Documentation.md).

_Note: If you're on OBS v27 or lower, you'll also have to install the [OBS Websocket Plugin](https://github.com/Palakis/obs-websocket/releases/latest). Reopen OBS after installing._

***

## Compatibility

Kruiz Control supports
- Twitch Channel Management
- Twitch Chat
- Twitch Events (alerts, channel points, hype trains)
- Streamlabs Alerts
- StreamElements Alerts
- OBS scene, source, and filter changes
- SLOBS scene and source changes
- Voicemod Voice Changer control
- Playing music (mp3, wav, ogg)
- Timers (triggering on an interval)
- Sending API calls

and more in [the documentation](js/Documentation.md)!

The script should run on any broadcast software that supports browser sources, however only OBS and SLOBS support changing scenes and sources. OBS.Live is supported.

***

## Installation

### Add as Browser Source
Add the **index.html** file as a browser source within your broadcast software. It is *recommended* to add this source to one scene that is included in all other scenes (like your alert scene) rather than recreate this source in every scene.

### Settings
Before the script will work, you'll need to fill out all of the settings files. Please see the [settings description](settings/Settings.md) for more information.

#### Steps for adding to OBS/SLOBS
- In OBS, under **Sources** click the + icon to add a new **Browser** source.
- Name it and select OK.
- Check the `Local file` checkbox.
- Click **Browse** and open the **index.html** file within the Kruiz Control script directory.
- Recommended to set the width/height to 100 or less to reduce the size of the source.

### OBS Websocket
In OBS, click **Tools** > **WebSockets Server Settings** and enable the websocket server.

It is **highly recommended** to use a password!

***

## Usage

### Pseudo Code Format
For information on the pseudo code format, please see [the documentation](js/Documentation.md).

### triggers.txt
Setup your triggers inside of this file if you do not need actions to be run one after another.

As an example, if the below is in the _triggers.txt_ file, then both sounds can be played at the same time.

#### triggers.txt
```
OnTWChannelPoint SHIKAKA
Play 30 wait Shikaka.mp3

OnCommand sbvm 0 !intervention
Play 45 nowait MashiahMusic__Kygo-Style-Melody.wav
```

### fileTriggers.txt and the triggers folder
When you need actions to be run one-after-another, create a file in the _triggers_ folder and add the name of the folder to _fileTriggers.txt_.

As an example, here's a setup to make sure multiple scene changes don't happen simultaneously.

#### _fileTriggers.txt_
```
obs.txt
```
#### _triggers/obs.txt_
```m
OnSLDonation
OBS Scene DonationCelebration
Delay 4

OnCommand mb 0 !brb
OBS Scene BRB
Delay 5
```

### sounds folder
In order to use a sound with [`Play`](js/Documentation.md#play), add the sound file to the *sounds* folder. The supported audio formats are mp3, wav, and ogg.

***

## FAQ

### XSplit Support
The script should work with XSplit _BUT_ the OBS-like functionality will not work. XSplit does not provide a direct websocket interface to do such actions. It may be possible to implement a plugin that provides a websocket interface to connect with xsplit. If you know a way to achieve this, [please reach out](mailto:kruiser.twitch@gmail.com).

### Support for Youtube Alerts
I can definitely add support for Youtube alerts from Streamlabs. I just haven't had the time to implement it yet.

More investigation time is needed to implement Youtube with StreamElements.

### Support for Youtube Chat
Potentially if I can find the libraries to implement it. Again, if you know a way to achieve this, please reach out via [twitter](https://twitter.com/kruiser8) or [discord](https://discord.gg/wU3ZK3Q).

### Will you support X
Please reach out if you have any ideas or other questions that were not covered in the documentation.

Discord: [Kruiz Control Support Discord](https://discord.gg/wU3ZK3Q)

Twitter: [@Kruiser8](https://twitter.com/kruiser8)

***

## Support the Project
There are a number of ways to support this project.

- Support Kruiser through <a href="https://patreon.com/kruiser8">Patreon</a>.
- <a href="https://github.com/Kruiser8/Kruiz-Control-Documentation">Translate the documentation</a>.
- Help others in the <a href="https://discord.gg/wU3ZK3Q">Support Discord</a>.
- Contribute ideas for the <a href="https://trello.com/b/oIV3q6Im/kruiz-control">roadmap</a>.
- Spread the word!

I do take commissions to implement custom functionality when necessary. Please reach out if you have a specific request.

***

## Associated Projects

- <a href="https://github.com/Kruiser8/Kruiz-Control-Documentation">Kruiz Control Documentation</a>.
- <a href="https://github.com/Kruiser8/Kruiz-Control-Widget">Kruiz Control Widget Template</a>.
- <a href="https://github.com/CrashKoeck/Kruiz-Control-Configurator">Kruiz Control Configurator</a> by <a href="https://github.com/CrashKoeck">CrashKoeck</a>.

***

## Credits
- [async](https://github.com/caolan/async) by Caolan McMahon (caolan)
- [comfyjs](https://github.com/instafluff/ComfyJS) by Instafluff (instafluff)
- [node-shlex](https://github.com/rgov/node-shlex) by Ryan Govostes (rgov)
- [obs-websocket-js](https://github.com/haganbmj/obs-websocket-js) by Brendan Hagan (haganbmj)
- [tesjs](https://github.com/mitchwadair/tesjs) by Mitchell Adair @mitchwadair

## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivs 4.0 Generic License</a>.
