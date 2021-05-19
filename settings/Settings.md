# Kruiz Control Settings

The following details each of the settings files that need to be filled out for each handler. An example is provided for each file.

All settings files are found in the `settings` folder.

This script uses text files to improve the average user experience.

## Table of Contents

- [Chat](#chat)
- [OBS](#obs)
- [SLOBS](#slobs)
- [StreamElements](#streamelements)
- [Streamlabs](#streamlabs)
- [Text-To-Speech](#text-to-speech)
- [Twitch](#twitch)

***

## Chat

### oauth.txt
**Location:** `settings/chat/oauth.txt`

In order to send messages on twitch, the script needs a twitch IRC auth token.

Get an IRC auth token here: [http://twitchapps.com/tmi/](http://twitchapps.com/tmi/)
```
oauth:exampleoauth4kruizcontrol12345
```

***

### user.txt
**Location:** `settings/chat/user.txt`

Specify the twitch channel to connect to chat.
```
kruiser8
```

*Note:*
- _user.txt_ specifies the channel to connect to.
- _oauth.txt_ specifies the user to send messages as.

***

## OBS
These settings can be found after installing the [OBS websocket plugin](https://github.com/Palakis/obs-websocket/releases) through **Tools** > **WebSockets Server Settings**.

### address.txt
**Location:** `settings/obs/address.txt`

Specify the IP + port to use for the OBS websocket.
```
localhost:4444
```

***

### password.txt
**Location:** `settings/obs/password.txt`

Specify the password to use when connecting to the websocket.
```
my0b5p455w0rd
```

***

## SLOBS
Follow the below steps to enable the SLOBS API for Kruiz Control.
- Open SLOBS
- Click the settings gear in the bottom left
- Open the `Remote Control` tab
- Click the QR Code so that it shows.
- Click the `Show details` text/link that appears.
- Copy the **API Token** value into the **token.txt** file (referenced below).
- Close SLOBS.
- Run SLOBS as administrator to enable the SLOBS Remote Control API.

### token.txt
**Location:** `settings/slobs/token.txt`

```
eyJAFOI3qoi4ut6345ogno5iuyt890
```

***

## StreamElements
To capture alerts through [StreamElements](https://streamelements.com/), you'll need a JWT token. To get your JWT token,
- Go to [your account settings](https://streamelements.com/dashboard/account/channels)
- Click the **Show secrets** toggle on the right
- Copy the JWT Token value that appears

### jwtToken.txt
**Location:** `settings/streamelements/jwtToken.txt`

```
eyJAFOI3qoi4ut6345ogno5iuyt89058gn589tyjh589h98h509ASUDF98Uuf98adshf9asfha89hga9hg9H8HA98HG98DAH98ADH8HG98ha989a9H9HG98DHh9DSHG89shg98h89DH98hh8H98gsdhg9D8SHD89GH9dshg89DSHG98HFSFNLJKFH98HNSDINVC98DSHGFw08hwewf
```

***

## Streamlabs
To capture alerts through [Streamlabs](https://streamlabs.com/), you'll need your **Socket API Token**. To get your token,

- Go to https://streamlabs.com/dashboard#/settings/api-settings
- Click the **API Tokens** tab
- Copy the **Your Socket API Token** value

### socketAPIToken.txt
**Location:** `settings/streamlabs/socketAPIToken.txt`

```
eyJhaoiuh798a99h7HBN879DHF98A789aigfba8790gfh987Fb78987BgUYF4SD56gI9Uh98786rf7tVBg97Gf56dxCilbh8OYf6r5SDX6cuyoIB97768FD76d546SD6iGVBUIb9i980YH897676f8FiUB9OIu8g78D6d5BiIU
```

***

## Text-To-Speech

### tag.txt
**Location:** `settings/tts/tag.txt`

Specify the `responsivevoice` html script tag assigned to your account.
- Go to [responsivevoice.org](https://responsivevoice.org)
- Create an account and go to your [app dashboard](https://app.responsivevoice.org/)
- If prompted with a pop-up, copy the value and paste it into the file.
- If not prompted (or the prompt was closed), scroll down to the bottom of the page and copy the code labeled `Insert this code in your web page before the end </body> tag:` into the text file.
```
<script src="https://code.responsivevoice.org/responsivevoice.js?key=XXXXXXXX"></script>
```

***

## Twitch

### user.txt
**Location:** `settings/twitch/user.txt`

Specify the twitch channel to watch for channel point redemptions and hype trains.
```
kruiser8
```
