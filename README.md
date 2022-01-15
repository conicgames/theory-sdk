# Exponential Idle - Theory SDK

Develop your own theories with the Theory SDK for the mobile game [Exponential Idle](https://conicgames.github.io/exponentialidle/). 
After completing the last chapter of the game, you will be offered to play custom theories. Custom theories are developed and shared by the community. You can also develop your own theories using this SDK and some basic Javascript knowledge.

## Installation
Unzip the [latest release package](https://github.com/conicgames/theory-sdk/releases/latest) corresponding to your OS in folder of your choice. All platforms requires to install the [.NET 6.0 Runtime](https://dotnet.microsoft.com/download/dotnet/6.0/runtime).
- Windows: Desktop Apps (.NET Desktop Runtime) (Suggested: [x64](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-desktop-6.0.1-windows-x64-installer))
- Linux: Server Apps (SDK, only option)
- macOS: Run Apps (.NET Runtime, only option) (Suggested: [x64](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-6.0.1-macos-x64-installer))


## Usage
The SDK is a simple tool that links your computer to the game, enabling live updates of the theory while you make changes.

### On your computer
- Use the launcher to start the SDK. If a Firewall popup appears, allow the connection.
- Choose the IP address of your local network and ensure that your phone is also connected to the same network.
- Select the theory file (default is CustomTheory.js at the root of the SDK folder).

### In the game
- Open the Theory Selection popup and click on the SDK icon.
- Enter the IP address and the port of the SDK.
- Tap "Connect to SDK".

At that point, the selected custom theory will be active in the game. Open the .js file in your favorite Javascript IDE and start editing! The script will be sent to the game every time the .js file is saved. All runtime errors will be sent back to the SDK in the logs.

### Command Line

Once connected to the game, the SDK will display a command line. A command is Javascript expression sent to your device and executed within the current context of the theory. Commands are useful for inspecting the state of the theory without having to put logging expressions in the script itself. They are also useful for modifying values at runtime to change the current state of the theory. Some useful examples:

 - `currency.value = BigNumber.from(1e100)`
 - `theory.reset()`
 - `log(aVariable)`

## Coding
### Limitations (to do)
 - Import
 - Performance
 - Javascript subset

## Sharing

Before thinking about sharing your theory to a large audience, please make sure that it is balanced, fun to play, and in an almost final state. By experience, it is very hard to change some fundamental parts of a theory after its release so make sure to test it thouroughly yourself and/or with a small group ofpeople who don't mind resetting their progress for testing purpose.

### Manual
You can share your theory to other players by uploading your js file to a public server, e.g., GitHub. Then, copy the URL to the raw text file and share the URL to other players.

### Public Repository
A public repository of custom theories is accessible from the game itself. These theories are hosted on a public (readonly) GitHub repository and let your theory be played by a larger audience than manual sharing.

To submit your custom theory, use the [Google Form](https://forms.gle/uTmuHfewxpA2vvq96), create a pull request to the [GitHub page of the public repository](https://github.com/conicgames/custom-theories), or contact us directly on the [Discord server](https://discord.gg/S9UheTC) or on the [Reddit community](https://www.reddit.com/r/ExponentialIdle).

**Note**: Since these theories are available to all players, every submission will be reviewed for quality assurance. Unbalanced, inappropriate, or buggy theories will be rejected. We will contact you to let you know about issues.
