import { ExponentialCost, FirstFreeCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "linear_algebra"
var name = "Linear Algebra";
var description = "An implementation of the 'Linear Algebra' theory from the game.";
var authors = "Gilles-Philippe Paillé";
var version = 1;

var currency1, currency2, currency3;
var c11, c12, c13, c21, c22, c23, c31, c32, c33, b1, b2, b3;
var dimension, b1Exp, b2Exp, b3Exp;

var init = () => {
    currency1 = theory.createCurrency();
    currency2 = theory.createCurrency();
    currency3 = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // b1
    {
        let getDesc = (level) => "b_1=" + getB1(level).toString(0);
        b1 = theory.createUpgrade(0, currency1, new FirstFreeCost(new ExponentialCost(10, Math.log2(1.18099))));
        b1.getDescription = (amount) => Utils.getMath(getDesc(b1.level));
        b1.getInfo = (amount) => Utils.getMathTo(getDesc(b1.level), getDesc(b1.level + amount));
    }

    // b2
    {
        let getDesc = (level) => "b_2=" + getB2(level).toString(0);
        b2 = theory.createUpgrade(1, currency2, new ExponentialCost(10, Math.log2(1.308)));
        b2.getDescription = (amount) => Utils.getMath(getDesc(b2.level));
        b2.getInfo = (amount) => Utils.getMathTo(getDesc(b2.level), getDesc(b2.level + amount));
    }

    // b3
    {
        let getDesc = (level) => "b_3=" + getB3(level).toString(0);
        b3 = theory.createUpgrade(2, currency3, new ExponentialCost(3000, Math.log2(1.675)));
        b3.getDescription = (amount) => Utils.getMath(getDesc(b3.level));
        b3.getInfo = (amount) => Utils.getMathTo(getDesc(b3.level), getDesc(b3.level + amount));
    }

    // c11
    {
        let getDesc = (level) => "c_{11}=2^{" + level.toString() + "}";
        let getInfo = (level) => "c_{11}=" + getC11(level).toString(0);
        c11 = theory.createUpgrade(3, currency1, new ExponentialCost(20, Math.log2(6.3496)));
        c11.getDescription = (amount) => Utils.getMath(getDesc(c11.level));
        c11.getInfo = (amount) => Utils.getMathTo(getInfo(c11.level), getInfo(c11.level + amount));
    }

    // c12
    {
        let getDesc = (level) => "c_{12}=2^{" + level.toString() + "}-1";
        let getInfo = (level) => "c_{12}=" + getC12(level).toString(0);
        c12 = theory.createUpgrade(4, currency2, new ExponentialCost(10, Math.log2(2.74)));
        c12.getDescription = (amount) => Utils.getMath(getDesc(c12.level));
        c12.getInfo = (amount) => Utils.getMathTo(getInfo(c12.level), getInfo(c12.level + amount));
    }

    // c13
    {
        let getDesc = (level) => "c_{13}=2^{" + level.toString() + "}-1";
        let getInfo = (level) => "c_{13}=" + getC13(level).toString(0);
        c13 = theory.createUpgrade(5, currency3, new ExponentialCost(1000, Math.log2(1.965)));
        c13.getDescription = (amount) => Utils.getMath(getDesc(c13.level));
        c13.getInfo = (amount) => Utils.getMathTo(getInfo(c13.level), getInfo(c13.level + amount));
        c13.isAvailable = false;
    }

    // c21
    {
        let getDesc = (level) => "c_{21}=2^{" + level.toString() + "}-1";
        let getInfo = (level) => "c_{21}=" + getC21(level).toString(0);
        c21 = theory.createUpgrade(6, currency1, new ExponentialCost(500, Math.log2(18.8343)));
        c21.getDescription = (amount) => Utils.getMath(getDesc(c21.level));
        c21.getInfo = (amount) => Utils.getMathTo(getInfo(c21.level), getInfo(c21.level + amount));
    }

    // c22
    {
        let getDesc = (level) => "c_{22}=2^{" + level.toString() + "}";
        let getInfo = (level) => "c_{22}=" + getC22(level).toString(0);
        c22 = theory.createUpgrade(7, currency2, new ExponentialCost(1e5, Math.log2(3.65)));
        c22.getDescription = (amount) => Utils.getMath(getDesc(c22.level));
        c22.getInfo = (amount) => Utils.getMathTo(getInfo(c22.level), getInfo(c22.level + amount));
    }

    // c23
    {
        let getDesc = (level) => "c_{23}=2^{" + level.toString() + "}-1";
        let getInfo = (level) => "c_{23}=" + getC23(level).toString(0);
        c23 = theory.createUpgrade(8, currency3, new ExponentialCost(1e5, Math.log2(2.27)));
        c23.getDescription = (amount) => Utils.getMath(getDesc(c23.level));
        c23.getInfo = (amount) => Utils.getMathTo(getInfo(c23.level), getInfo(c23.level + amount));
        c23.isAvailable = false;
    }

    // c31
    {
        let getDesc = (level) => "c_{31}=2^{" + level.toString() + "}-1";
        let getInfo = (level) => "c_{31}=" + getC31(level).toString(0);
        c31 = theory.createUpgrade(9, currency1, new ExponentialCost(1e4, Math.log2(1248.27)));
        c31.getDescription = (amount) => Utils.getMath(getDesc(c31.level));
        c31.getInfo = (amount) => Utils.getMathTo(getInfo(c31.level), getInfo(c31.level + amount));
        c31.isAvailable = false;
    }

    // c32
    {
        let getDesc = (level) => "c_{32}=2^{" + level.toString() + "}-1";
        let getInfo = (level) => "c_{32}=" + getC32(level).toString(0);
        c32 = theory.createUpgrade(10, currency2, new ExponentialCost(1e3, Math.log2(6.81744)));
        c32.getDescription = (amount) => Utils.getMath(getDesc(c32.level));
        c32.getInfo = (amount) => Utils.getMathTo(getInfo(c32.level), getInfo(c32.level + amount));
        c32.isAvailable = false;
    }

    // c33
    {
        let getDesc = (level) => "c_{33}=2^{" + level.toString() + "}";
        let getInfo = (level) => "c_{33}=" + getC33(level).toString(0);
        c33 = theory.createUpgrade(11, currency3, new ExponentialCost(1e5, Math.log2(2.98)));
        c33.getDescription = (amount) => Utils.getMath(getDesc(c33.level));
        c33.getInfo = (amount) => Utils.getMathTo(getInfo(c33.level), getInfo(c33.level + amount));
        c33.isAvailable = false;
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency1, 1e9);
    theory.createBuyAllUpgrade(1, currency1, 1e13);
    theory.createAutoBuyerUpgrade(2, currency1, 1e30);

    /////////////////////
    // Checkpoint Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        dimension = theory.createMilestoneUpgrade(0, 1);
        dimension.description = Localization.getUpgradeAddDimensionDesc();
        dimension.info = Localization.getUpgradeAddDimensionInfo();
        dimension.canBeRefunded = (_) => b3Exp.level == 0;
        dimension.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); updateAvailability(); }
    }

    {
        b1Exp = theory.createMilestoneUpgrade(1, 2);
        b1Exp.description = Localization.getUpgradeIncCustomExpDesc("b_1", "0.05");
        b1Exp.info = Localization.getUpgradeIncCustomExpInfo("b_1", "0.05");
        b1Exp.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); }
    }

    {
        b2Exp = theory.createMilestoneUpgrade(2, 2);
        b2Exp.description = Localization.getUpgradeIncCustomExpDesc("b_2", "0.05");
        b2Exp.info = Localization.getUpgradeIncCustomExpInfo("b_2", "0.05");
        b2Exp.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); }
    }

    {
        b3Exp = theory.createMilestoneUpgrade(3, 2);
        b3Exp.description = Localization.getUpgradeIncCustomExpDesc("b_3", "0.05");
        b3Exp.info = Localization.getUpgradeIncCustomExpInfo("b_3", "0.05");
        b3Exp.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); }
        b3Exp.isAvailable = false;
    }

    updateAvailability();
}

var updateAvailability = () => {
    c13.isAvailable = dimension.level > 0;
    c23.isAvailable = dimension.level > 0;
    c31.isAvailable = dimension.level > 0;
    c32.isAvailable = dimension.level > 0;
    c33.isAvailable = dimension.level > 0;
    b3.isAvailable = dimension.level > 0;
    b3Exp.isAvailable = dimension.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    let vc11 = getC11(c11.level);
    let vc12 = getC12(c12.level);
    let vc13 = dimension.level > 0 ? getC13(c13.level) : BigNumber.ZERO;
    let vc21 = getC21(c21.level);
    let vc22 = getC22(c22.level);
    let vc23 = dimension.level > 0 ? getC23(c23.level) : BigNumber.ZERO;
    let vc31 = dimension.level > 0 ? getC31(c31.level) : BigNumber.ZERO;
    let vc32 = dimension.level > 0 ? getC32(c32.level) : BigNumber.ZERO;
    let vc33 = dimension.level > 0 ? getC33(c33.level) : BigNumber.ZERO;
    let vb1 = getB1(b1.level).pow(getB1Exp(b1Exp.level));
    let vb2 = getB2(b2.level).pow(getB2Exp(b2Exp.level));
    let vb3 = getB3(b3.level).pow(getB3Exp(b3Exp.level));

    currency1.value += dt * bonus * (vc11 * vb1 + vc12 * vb2 + vc13 * vb3);
    currency2.value += dt * bonus * (vc21 * vb1 + vc22 * vb2 + vc23 * vb3);
    currency3.value += dt * bonus * (vc31 * vb1 + vc32 * vb2 + vc33 * vb3);
}

var getPrimaryEquation = () => {
    let result = "\\begin{bmatrix}\\dot{\\rho_1}\\\\\\dot{\\rho_2}";

    if (dimension.level > 0) result += "\\\\\\dot{\\rho_3}";
    result += "\\end{bmatrix}=\\begin{bmatrix}c_{11}&c_{12}";
    if (dimension.level > 0) result += "&c_{13}";
    result += "\\\\c_{21}&c_{22}";
    if (dimension.level > 0) result += "&c_{23}\\\\c_{31}&c_{32}&c_{33}";
    result += "\\end{bmatrix}\\begin{bmatrix}b_1";
    if (b1Exp.level == 1) result += "^{1.05}";
    if (b1Exp.level == 2) result += "^{1.1}";
    result += "\\\\b_2";
    if (b2Exp.level == 1) result += "^{1.05}";
    if (b2Exp.level == 2) result += "^{1.1}";
    if (dimension.level > 0) result += "\\\\b_3";
    if (b3Exp.level == 1) result += "^{1.05}";
    if (b3Exp.level == 2) result += "^{1.1}";
    result += "\\end{bmatrix}";

    theory.primaryEquationHeight = dimension.level > 0 ? 70 : 50;

    return result;
}

var getSecondaryEquation = () => {
    let result = "";

    result += theory.latexSymbol;
    result += "=\\max\\rho_1";

    return result;
}

var isCurrencyVisible = (index) => index < 2 || (index == 2 && dimension.level > 0);
var getPublicationMultiplier = (tau) => tau.pow(0.147) * BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "3{" + symbol + "}^{0.147}";
var getTau = () => currency1.value;
var get2DGraphValue = () => currency1.value.sign * (BigNumber.ONE + currency1.value.abs()).log10().toNumber();

var getC11 = (level) => BigNumber.TWO.pow(level);
var getC12 = (level) => BigNumber.TWO.pow(level) - BigNumber.ONE;
var getC13 = (level) => BigNumber.TWO.pow(level) - BigNumber.ONE;
var getC21 = (level) => BigNumber.TWO.pow(level) - BigNumber.ONE;
var getC22 = (level) => BigNumber.TWO.pow(level);
var getC23 = (level) => BigNumber.TWO.pow(level) - BigNumber.ONE;
var getC31 = (level) => BigNumber.TWO.pow(level) - BigNumber.ONE;
var getC32 = (level) => BigNumber.TWO.pow(level) - BigNumber.ONE;
var getC33 = (level) => BigNumber.TWO.pow(level);
var getB1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getB2 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getB3 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getB1Exp = (level) => BigNumber.from(1 + level * 0.05);
var getB2Exp = (level) => BigNumber.from(1 + level * 0.05);
var getB3Exp = (level) => BigNumber.from(1 + level * 0.05);

init();