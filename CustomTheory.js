﻿import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "my_custom_theory_id";
var name = "My Custom Theory";
var description = "A basic theory.";
var authors = "Gilles-Philippe Paillé";
var version = 1;

var currency;
var c1, c2;
var c1Exp, c2Exp;

var achievement1, achievement2;
var chapter1, chapter2;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=2^{" + getC1(level).toString(0) + "}";
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(1, Math.log2(1.1))));
        c1.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=10^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(5, Math.log2(1.5)));
        c2.getDescription = (_) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e1000);
    theory.createBuyAllUpgrade(1, currency, 1e3000);
    theory.createAutoBuyerUpgrade(2, currency, 1e25000);

    ///////////////////////
    //// Milestone Upgrades
    //theory.setMilestoneCost(new LinearCost(25, 25));

    {
        //c1Exp = theory.createMilestoneUpgrade(0, 3);
        //c1Exp.description = Localization.getUpgradeIncCustomExpDesc("c_1", "0.05");
     //   c1Exp.info = Localization.getUpgradeIncCustomExpInfo("c_1", "0.05");
      //  c1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
       // c2Exp = theory.createMilestoneUpgrade(1, 3);
       // c2Exp.description = Localization.getUpgradeIncCustomExpDesc("c_2", "0.05");
        //c2Exp.info = Localization.getUpgradeIncCustomExpInfo("c_2", "0.05");
        //c2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "Achievement 1", "Description 1", () => c1.level > 1);
    achievement2 = theory.createSecretAchievement(1, "Achievement 2", "Description 2", "Maybe you should buy two levels of c2?", () => c2.level > 1);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "My First Chapter", "This is line 1,\nand this is line 2.\n\nNice.", () => c1.level > 0);
    chapter2 = theory.createStoryChapter(1, "My Second Chapter", "This is line 1 again,\nand this is line 2... again.\n\nNice again.", () => c2.level > 0);

    updateAvailability();
}

var updateAvailability = () => {}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getC1(c1.level) *
                                   getC2(c2.level);
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = c_1";

  //  if (c1Exp.level == 1) result += "^{1.05}";
   // if (c1Exp.level == 2) result += "^{1.1}";
   // if (c1Exp.level == 3) result += "^{1.15}";

    result += "c_2";

   // if (c2Exp.level == 1) result += "^{1.05}";
  //  if (c2Exp.level == 2) result += "^{1.1}";
   // if (c2Exp.level == 3) result += "^{1.15}";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC1 = (level) => BigNumber.TWO.pow(level);
var getC2 = (level) => BigNumber.TEN.pow(level)

init();
