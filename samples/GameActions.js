import { FreeCost } from "../api/Costs";
import { game } from "../api/Game";
import { Permissions } from "../api/Permissions"
import { theory } from "../api/Theory";

// You can access various properties of the game using the 'game' instance.
// You can query values of the game (variables, upgrades, currencies, etc.)
// and you can perform the same actions as the user can do using the UI.
// For reading values, no permissions are necessary. However, for performing
// actions, you need to request permission to the player. If the player denies
// the permission, the custom theory will not be installed.

var id = "game_actions";
var name = "Game Actions";
var description = "An example of how to use the game object query values and perform actions on the game.";
var authors = "Gilles-Philippe Paillé";
var version = 1;
var permissions = Permissions.PERFORM_GAME_ACTIONS

var currency;
var prestige, supremacy, graduation, buyVars, varAutoBuyer;

var init = () => {
    currency = theory.createCurrency();

    // Prestige
    {
        prestige = theory.createUpgrade(0, currency, new FreeCost());
        prestige.description = prestige.info = "Prestige"
        prestige.bought = (_) => game.prestige();
    }

    // Supremacy
    {
        supremacy = theory.createUpgrade(1, currency, new FreeCost());
        supremacy.description = supremacy.info = "Supremacy"
        supremacy.bought = (_) => game.supremacy();
    }

    // Graduation
    {
        graduation = theory.createUpgrade(2, currency, new FreeCost());
        graduation.description = graduation.info = "Graduation"
        graduation.bought = (_) => game.graduate();
    }

    // Buy All Variables
    {
        buyVars = theory.createUpgrade(3, currency, new FreeCost());
        buyVars.description = buyVars.info = "Buy All Variables"
        buyVars.bought = (_) => game.buy(game.variables);
    }

    // Toggle Variable Autobuyer
    {
        varAutoBuyer = theory.createUpgrade(4, currency, new FreeCost());
        varAutoBuyer.description = varAutoBuyer.info = "Toggle Variable Autobuyer"
        varAutoBuyer.bought = (_) => game.automation.variables.isActive = !game.automation.variables.isActive;
    }
}

var tick = (elapsedTime, multiplier) => {
    theory.invalidatePrimaryEquation();
}

var getPrimaryEquation = () => {
    let result = "";
    result += "f(t) = " + game.f.toString(4) + "\\\\";
    result += "d\\psi = " + game.dpsi.toString();
    return result;
}

init();