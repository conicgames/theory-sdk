import { ExponentialCost, FirstFreeCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "numerical_methods"
var name = "Numerical Methods";

var q1, c1, c2, c3, c4, c5, c6;
var dimension, r12Term, r22Term, r1r2Term, c1Exp;

var init = () => {
    currency1 = theory.createCurrency();
    currency2 = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ1(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(0, currency1, new FirstFreeCost(new ExponentialCost(500, Math.log2(1.51572))));
        q1.getDescription = (amount) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        let getInfo = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(1, currency1, new ExponentialCost(10, Math.log2(1.275)));
        c1.getDescription = (amount) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getInfo(c1.level), getInfo(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(2, currency1, new ExponentialCost(40, Math.log2(8)));
        c2.getDescription = (amount) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=2^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(3, currency1, new ExponentialCost(1e5, Math.log2(63)));
        c3.getDescription = (amount) => Utils.getMath(getDesc(c3.level));
        c3.getInfo = (amount) => Utils.getMathTo(getInfo(c3.level), getInfo(c3.level + amount));
    }

    // c4
    {
        let getDesc = (level) => "c_4=2^{" + level + "}";
        let getInfo = (level) => "c_4=" + getC4(level).toString(0);
        c4 = theory.createUpgrade(4, currency1, new ExponentialCost(10, Math.log2(2.82)));
        c4.getDescription = (amount) => Utils.getMath(getDesc(c4.level));
        c4.getInfo = (amount) => Utils.getMathTo(getInfo(c4.level), getInfo(c4.level + amount));
    }

    // c5
    {
        let getDesc = (level) => "c_5=2^{" + level + "}";
        let getInfo = (level) => "c_5=" + getC5(level).toString(0);
        c5 = theory.createUpgrade(5, currency1, new ExponentialCost(1e8, Math.log2(60)));
        c5.getDescription = (amount) => Utils.getMath(getDesc(c5.level));
        c5.getInfo = (amount) => Utils.getMathTo(getInfo(c5.level), getInfo(c5.level + amount));
    }

    // c6
    {
        let getDesc = (level) => "c_6=2^{" + level + "}";
        let getInfo = (level) => "c_6=" + getC6(level).toString(0);
        c6 = theory.createUpgrade(6, currency1, new ExponentialCost(1e2, Math.log2(2.81)));
        c6.getDescription = (amount) => Utils.getMath(getDesc(c6.level));
        c6.getInfo = (amount) => Utils.getMathTo(getInfo(c6.level), getInfo(c6.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency1, 1e10);
    theory.createBuyAllUpgrade(1, currency1, 1e13);
    theory.createAutoBuyerUpgrade(2, currency1, 1e30);

    //////////////////////
    // Checkpoint Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        dimension = theory.createMilestoneUpgrade(0, 1);
        dimension.description = Localization.getUpgradeAddDimensionDesc();
        dimension.info = Localization.getUpgradeAddDimensionDesc();
        dimension.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); theory.invalidateSecondaryEquation(); updateAvailability(); }
        dimension.canBeRefunded = (_) => r22Term.level == 0 && r1r2Term.level == 0;
    }

    {
        r12Term = theory.createMilestoneUpgrade(1, 1);
        r12Term.description = Localization.getUpgradeAddTermDesc("\\rho_1^{1.5}");
        r12Term.info = Localization.getUpgradeAddTermInfo("\\rho_1^{1.5}");
        r12Term.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); updateAvailability(); };
    }

    {
        r22Term = theory.createMilestoneUpgrade(2, 1);
        r22Term.description = Localization.getUpgradeAddTermDesc("\\rho_2^{1.5}");
        r22Term.info = Localization.getUpgradeAddTermInfo("\\rho_2^{1.5}");
        r22Term.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); updateAvailability(); };
    }

    {
        r1r2Term = theory.createMilestoneUpgrade(3, 1);
        r1r2Term.description = Localization.getUpgradeAddTermDesc("\\rho_1^{0.5}\\rho_2^{0.5}");
        r1r2Term.info = Localization.getUpgradeAddTermInfo("\\rho_1^{0.5}\\rho_2^{0.5}");
        r1r2Term.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); updateAvailability(); };
    }

    {
        c1Exp = theory.createMilestoneUpgrade(4, 3);
        c1Exp.description = Localization.getUpgradeIncCustomExpDesc("c_1", "0.05");
        c1Exp.info = Localization.getUpgradeIncCustomExpInfo("c_1", "0.05");
        c1Exp.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); };
    }

    updateAvailability();
}

var updateAvailability = () => {
    c3.isAvailable = r12Term.level > 0;
    c4.isAvailable = dimension.level > 0;
    c5.isAvailable = r22Term.level > 0;
    c6.isAvailable = r1r2Term.level > 0;
    r22Term.isAvailable = dimension.level > 0;
    r1r2Term.isAvailable = dimension.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    let rho1 = currency1.value;
    let rho2 = currency2.value;
    let vq1 = getQ1(q1.level);
    let vc1 = getC1(c1.level).pow(getC1Exp(c1Exp.level));
    let vc2 = getC2(c2.level);
    let vc3 = getC3(c3.level);
    let vc4 = getC4(c4.level);
    let vc5 = getC5(c5.level);
    let vc6 = getC6(c6.level);
    let rho1Sqrt = rho1.max(BigNumber.ONE).sqrt();
    let rho2Sqrt = rho2.max(BigNumber.ONE).sqrt();

    let drho11 = vc1 * vc2;
    let drho12 = r12Term.level > 0 ? BigNumber.from(1.5) * vc3 * rho1Sqrt : BigNumber.ZERO;
    let drho21 = dimension.level > 0 ? vc4 : BigNumber.ZERO;
    let drho22 = r22Term.level > 0 ? BigNumber.from(1.5) * vc5 * rho2Sqrt : BigNumber.ZERO;
    let drho13 = r1r2Term.level > 0 ? (BigNumber.HALF * vc6 * rho2Sqrt / rho1Sqrt).min(rho1 * BigNumber.HUNDRED) : BigNumber.ZERO;
    let drho23 = r1r2Term.level > 0 ? (BigNumber.HALF * vc6 * rho1Sqrt / rho2Sqrt).min(rho2 * BigNumber.HUNDRED) : BigNumber.ZERO;
    let dtq1bonus = dt * vq1 * bonus;

    currency1.value += dtq1bonus * (drho11 + drho12 + drho13);
    currency2.value += dtq1bonus * (drho21 + drho22 + drho23);
}

var getPrimaryEquation = () => {
    let result = "";

    result += "\\begin{matrix}";

    if (dimension.level > 0)
        result += "\\max g(\\rho_1,\\rho_2)\\\\g(\\rho_1,\\rho_2)=c_1";
    else
        result += "\\max g(\\rho_1)\\\\g(\\rho_1)=c_1";

    if (c1Exp.level == 1) result += "^{1.05}";
    if (c1Exp.level == 2) result += "^{1.1}";
    if (c1Exp.level == 3) result += "^{1.15}";
    result += "c_2\\rho_1";
    if (r12Term.level > 0) result += "+c_3\\rho_1^{1.5}";
    if (dimension.level > 0) result += "+c_4\\rho_2";
    if (r22Term.level > 0) result += "+c_5\\rho_2^{1.5}";
    if (r1r2Term.level > 0) result += "+c_6\\rho_1^{0.5}\\rho_2^{0.5}";

    result += "\\end{matrix}";

    theory.primaryEquationHeight = 50;
    theory.primaryEquationScale = dimension.level > 0 ? 0.8 : 0.9;
    return result;
}

var getSecondaryEquation = () => {
    let result = "";

    result += "\\begin{matrix}";
    result += theory.latexSymbol;
    result += "=\\max\\rho_1,&\\dot{\\mathbf{\\rho}}=q_1\\nabla g,&\\mathbf{\\rho}=\\begin{bmatrix}\\rho_1";
    if (dimension.level > 0) result += "&\\rho_2";
    result += "\\end{bmatrix}\\end{matrix}";

    return result;
}

var isCurrencyVisible = (index) => index == 0 || (index == 1 && dimension.level > 0);
var getPublicationMultiplier = (tau) => tau.isZero ? 1 : tau.pow(0.152);
var getPublicationMultiplierFormula = (symbol) => "{" + symbol + "}^{0.152}";
var getTau = () => currency1.value;
var get2DGraphValue = () => currency1.value.sign * (BigNumber.ONE + currency1.value.abs()).log10().toNumber();

var getQ1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 1);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => BigNumber.TWO.pow(level);
var getC4 = (level) => BigNumber.TWO.pow(level);
var getC5 = (level) => BigNumber.TWO.pow(level);
var getC6 = (level) => BigNumber.TWO.pow(level);
var getC1Exp = (level) => BigNumber.from(1 + level * 0.05);

init();