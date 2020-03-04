# Kruiz Control Settings

The following details each of the settings files that need to be filled out for each handler. An example is provided for each file.

This script uses text files to improve the average user experience.

## Table of Contents

- [Channel Points](#channel-points)
- [Chat](#chat)
- [OBS](#obs)
- [StreamElements](#streamelements)
- [Streamlabs](#streamlabs)

***

## Channel Points

### user.txt
Specify the twitch channel to watch for channel point redemptions.
```
kruiser8
```

***

## Chat

### oauth.txt
In order to send messages on twitch, the script needs a twitch IRC auth token.

Get an IRC auth token here: [http://twitchapps.com/tmi/](http://twitchapps.com/tmi/)
```
oauth:exampleoauth4kruizcontrol12345
```

***

### user.txt
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
Specify the IP + port to use for the OBS websocket.
```
localhost:4444
```

***

### password.txt
Specify the password to use when connecting to the websocket.
```
my0b5p455w0rd
```

***

## StreamElements
To capture alerts through [StreamElements](https://streamelements.com/), you'll need a JWT token. To get your JWT token,
- Go to [your account settings](https://streamelements.com/dashboard/account/channels)
- Click the **Show secrets** toggle on the right
- Copy the JWT Token value that appears

### jwtToken.txt
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
```
eyJhaoiuh798a99h7HBN879DHF98A789aigfba8790gfh987Fb78987BgUYF4SD56gI9Uh98786rf7tVBg97Gf56dxCilbh8OYf6r5SDX6cuyoIB97768FD76d546SD6iGVBUIb9i980YH897676f8FiUB9OIu8g78D6d5BiIU
```
