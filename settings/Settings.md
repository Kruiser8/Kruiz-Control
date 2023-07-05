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
- [Twitch](#twitch)
- [Voicemod](#voicemod)

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
These settings can be found through **Tools** > **WebSockets Server Settings**.

### address.txt
**Location:** `settings/obs/address.txt`

Specify the IP + port to use for the OBS websocket.
```
ws://127.0.0.1:4455
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

## Twitch
To capture Twitch events, you'll need a **Client Id** and **Client Secret** and a generated auth token for your Twitch user.

### Client ID and Secret
To capture Twitch events, you'll need a **Client Id** and **Client Secret**. To create your own,
- Go to https://dev.twitch.tv/login
- Login with your Twitch account
- Once logged in, on the left sidebar click `Applications`.
- Click the `+ Register Your Application` button and enter the following details:
  - Name: `YOUR_USERNAME Kruiz Control`
  - OAuth Redirect URLs: `http://localhost`
  - Category: `Chat Bot`
- Click the `Create` button at the bottom.
- Click the `Manage` button on the right hand side for the application you created.
- Copy the **Client ID** value and put it in the `settings/twitch/clientId.txt` file.
- Click the `New Secret` button, confirm the prompt, and copy and paste the value into the `settings/twitch/clientSecret.txt` file.

### Code
Some APIs and events require a user authenticated auth code. To generate one of these, first follow the Client ID and Secret instructions to update the `settings/twitch/clientId.txt` and `settings/twitch/clientSecret.txt` files. Then follow the below steps:
- Add the below to your Kruiz Control `triggers.txt` file to send an authentication link to your Twitch chat.
```
### Twitch Authenticate ###
OnInit
Twitch Authenticate
Error {auth_url}
```
- Reset Kruiz Control to generate the link.
- Open your OBS or SLOBS log file to find the URL.
  - For OBS, go to `Help` > `Log Files` > `Open Current Log File`.
  - For SLOBS, open the settings cog (bottom left) and then go to `Get Support` and click the `Show Cache Directory` option under `Cache Directory`. Open the `node-obs` folder and then the `logs` folder. Open the most recently modified file.
- Copy the link at the bottom of the log file, and open it in a browser.
- Login to your Twitch account. This provides the https://dev.twitch.tv application that you created to control your stream.
- After login, you'll be redirected to a link that looks like the below.
```
http://localhost/?code=YOUR_CODE_HERE&scope=bits%3Aread+channel%3Aedit...
```
- Copy the `YOUR_CODE_HERE` value and put that into your `settings/twitch/code.txt` file.
- Once you have generated a code, you can remove the `### Twitch Authenticate ###` event from your `triggers.txt` file.


### clientId.txt
**Location:** `settings/twitch/clientId.txt`

Specify the Twitch Client ID to use when making API calls.
```
wasdfe23r9yujasbnvo9qhfiuqa328
```

### clientSecret.txt
**Location:** `settings/twitch/clientId.txt`

Specify the Twitch Client ID to use when making API calls.
```
wasdfe23r9yujasbnvo9qhfiuqa328
```

### code.txt
**Location:** `settings/twitch/code.txt`

Specify the Twitch auth code generated after logging in to your Twitch account.
```
098wh4ijbngse7w9r87yqu3gbq398f
```

### user.txt
**Location:** `settings/twitch/user.txt`

Specify the Twitch channel that Kruiz Control will react to and control through triggers and actions.
```
kruiser8
```

***

## Voicemod
To connect to [Voicemod](https://www.voicemod.net/), you'll need an **API Key**. To get your API Key,

- Fill out [Voicemod's form](https://voicemod.typeform.com/to/Zh5ZHRED) to request a key.
- After submitting the form, check your email inbox for an email from control.api.devs@voicemod.net with your `clientKey`.
- Copy the `clientKey` value. It should look something like `abc-defh12345`.
- Paste the `clientKey` into the `settings/voicemod/apiKey.txt` file.

### address.txt
**Location:** `settings/voicemod/address.txt`

```
ws://localhost:59129/v1
```

### apiKey.txt
**Location:** `settings/voicemod/apiKey.txt`

```
abc-defg12345
```
