# Exponential Idle - Theory SDK

Note: This is a work in progress. It will be available in the next update in a couple of weeks.

Develop your own theories with the Theory SDK for the mobile game [Exponential Idle](https://conicgames.github.io/exponentialidle/). 
After completing the last chapter of the game, you will be offered to play custom theories. Custom theories are developed and shared by the community. You can also develop your own theories using this SDK and some basic Javascript knowledge.

## Installation
Unzip the [latest release package](https://github.com/conicgames/theory-sdk/releases/latest) corresponding to your OS in folder of your choice. All platforms requires to install the [.NET Runtime](https://dotnet.microsoft.com/download).

## Usage
The SDK is a simple tool that links your computer to the game, enabling live updates of the theory while you make changes.

### On your computer
- Use the launcher to start the SDK. If a Firewall popup appears, allow the connection.
- Choose the IP address of your local network and ensure that your phone is also connected to the same network.
- Select the theory file (default is CustomTheory.js at the root of the SDK folder).

### In the game
- Open the Theory Selection popup
- Enter the IP address and the port of the SDK.
- Tap "Connect to SDK".

At that point, the selected custom theory will be active in the game. Open the .js file in your favorite Javascript IDE and start editing! All runtime errors will be sent back to the SDK in the logs.
