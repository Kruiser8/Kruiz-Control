# Kruiz Control

<p align="center"><i>
Kruiz Control enables a pseudo code approach to manage and automatically handle Twitch Channel Points, Twitch Chat, OBS or SLOBS, and StreamElements or Streamlabs alerts.
</i></p>
<p align="center"><b>
  <a href="https://www.twitch.tv/videos/560557778">Demo (WIP)</a> |
  <a href="https://github.com/Kruiser8/Kruiz-Control/archive/master.zip">Download</a> |
  <a href="https://github.com/Kruiser8/Kruiz-Control/blob/master/js/Documentation.md">Documentation</a> |
  <a href="https://github.com/Kruiser8/Kruiz-Control/blob/master/settings/Settings.md">Settings</a>
</b></p>

<p align="center"><i><b>
  <a href="https://twitter.com/kruiser8">@Kruiser8</a> |
  <a href="mailto:kruiser.twitch@gmail.com">kruiser.twitch@gmail.com</a>
</b></i></p>

## Table of Contents

- [Getting Started](#getting-started)
- [Compatibility](#compatibility)
- [Installation](#installation)
  + [OBS Websocket](#obs-websocket)
  + [Settings](#settings)
  + [Add as Browser Source](#add-as-browser-source)
- [Usage](#usage)
  + [Pseudo Code Format](#pseudo-code-format)
  + [triggers.txt](#triggerstxt)
  + [fileTriggers.txt and the triggers folder](#filetriggerstxt-and-the-triggers-folder)
  + [sounds folder](#sounds-folder)
- [FAQ](#faq)
  + [SLOBS Support](#slobs-support)
  + [XSplit Support](#xsplit-support)
  + [Support for Mixer and Youtube Alerts](#support-for-mixer-and-youtube-alerts)
  + [Support for Mixer and Youtube Chat](#support-for-mixer-and-youtube-chat)
  + [Will you support X](#will-you-support-x)
- [Commissions](#commissions)
- [Credits](#credits)

***

## Setup Guide

- Install the [OBS Websocket Plugin](https://github.com/Palakis/obs-websocket/releases).
- Fill out [the settings files](https://github.com/Kruiser8/Kruiz-Control/blob/master/settings/Settings.md) in the settings folder.
- Add the **index.html** to OBS as a browser source.
- Type `!example` in your twitch chat. If your user responds with `Success! It worked!`, you're good to go!
- Customize the _triggers.txt_ with your own triggers from the [the documentation](https://github.com/Kruiser8/Kruiz-Control/blob/master/js/Documentation.md).

***

## Compatibility

Kruiz Control supports
- Twitch Channel Points
- Twitch Chat,
- Streamlabs Alerts
- StreamElements Alerts,
- OBS scene, source, and filter changes

The script should run on any broadcast software that supports browser sources, however only OBS supports changing scenes, sources, and filters.

***

## Installation

### OBS Websocket
To use this script with OBS, install the [obs-websocket](https://github.com/Palakis/obs-websocket/releases) plugin.

In OBS, click **Tools** > **WebSockets Server Settings** and enable the websocket server.

It is **highly recommended** to use a password!

### Settings
Before the script will work, you'll need to fill out all of the settings files. Please see the [settings description](https://github.com/Kruiser8/Kruiz-Control/blob/master/settings/Settings.md) for more information.

### Add as Browser Source
Add the **index.html** file as a browser source within your broadcast software. It is *recommended* to add this source to one scene that is included in all other scenes (like your alert scene) rather than recreate this source in every scene.

#### Steps for adding to OBS
- In OBS, under **Sources** click the + icon to add a new **Browser** source.
- Name it and select OK.
- Check the `Local file` checkbox.
- Click **Browse** and open the **index.html** file within the Kruiz Control script directory.
- Recommended to set the width/height to 100 or less to reduce the size of the source.
- Check *Shutdown source when not visible*

***

## Usage

### Pseudo Code Format
For information on the pseudo code format, please see [the documentation](https://github.com/Kruiser8/Kruiz-Control/blob/master/js/Documentation.md).

### triggers.txt
Setup your triggers inside of this file if you do not need actions to be run one after another.

As an example, if the below is in the _triggers.txt_ file, then both sounds can be played at the same time.

#### triggers.txt
```
OnChannelPoint SHIKAKA
Play 30 Shikaka.mp3

OnCommand sbvm !intervention
Play 45 MashiahMusic__Kygo-Style-Melody.wav
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

OnCommand m !brb
OBS Scene BRB
Delay 5
```

### sounds folder
In order to use a sound with `Play`, add the sound file to the *sounds* folder. The supported audio formats are mp3, wav, and ogg.

***

## FAQ

### XSplit Support
The script should work with XSplit _BUT_ the OBS-like functionality will not work. XSplit does not provide a direct websocket interface to do such actions. It may be possible to implement a plugin that provides a websocket interface to connect with xsplit. If you know a way to achieve this, [please reach out](mailto:kruiser.twitch@gmail.com).

### Support for Mixer and Youtube Alerts
I can definitely add support for Mixer and Youtube alerts from Streamlabs. I just haven't had the time to implement it yet.

More investigation time is needed to implement Youtube and Mixer StreamElements.

### Support for Mixer and Youtube Chat
Potentially if I can find the libraries to implement it. Again, if you know a way to achieve this, [please reach out](mailto:kruiser.twitch@gmail.com).

### Will you support X
Please reach out if you have any ideas or other questions that were not covered in the documentation.

Email: [kruiser.twitch@gmail.com](mailto:kruiser.twitch@gmail.com)

Twitter: [@Kruiser8](https://twitter.com/kruiser8)

## Commissions
I do take commissions to implement custom functionality when necessary. Please reach out to [kruiser.twitch@gmail.com](mailto:kruiser.twitch@gmail.com) if you have a specific request.

***

## Credits
- [async](https://github.com/caolan/async) by Caolan McMahon (caolan)
- [comfyjs](https://github.com/instafluff/ComfyJS) by Instafluff (instafluff)
- [node-shlex](https://github.com/rgov/node-shlex) by Ryan Govostes (rgov)
- [obs-websocket-js](https://github.com/haganbmj/obs-websocket-js) by Brendan Hagan (haganbmj)
