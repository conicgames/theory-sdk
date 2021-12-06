import { ExponentialCost, FirstFreeCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "logistic_function"
var name = "Logistic Function";
var description = "A implementation of the 'Logistic Function' theory from the game.";
var authors = "Gilles-Philippe Paillé";
var version = 1;

var q = BigNumber.ONE;

var q1, q2, c1, c2, c3;
var q1Exp, c3Term, c3Exp;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ1(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(1.61328))));
        q1.getDescription = (amount) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ2(level).toString(0);
        q2 = theory.createUpgrade(1, currency, new ExponentialCost(15, Math.log2(64)));
        q2.getDescription = (amount) => Utils.getMath(getDesc(q2.level));
        q2.getInfo = (amount) => Utils.getMathTo(getInfo(q2.level), getInfo(q2.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        let getInfo = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(2, currency, new ExponentialCost(1e6, Math.log2(1.18099)));
        c1.getDescription = (amount) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getInfo(c1.level), getInfo(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(3, currency, new ExponentialCost(75, Math.log2(4.53725)));
        c2.getDescription = (amount) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=2^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(4, currency, new ExponentialCost(1e3, Math.log2(8.85507e7)));
        c3.getDescription = (amount) => Utils.getMath(getDesc(c3.level));
        c3.getInfo = (amount) => Utils.getMathTo(getInfo(c3.level), getInfo(c3.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e7);
    theory.createBuyAllUpgrade(1, currency, 1e10);
    theory.createAutoBuyerUpgrade(2, currency, 1e30);

    /////////////////////
    // Checkpoint Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        q1Exp = theory.createMilestoneUpgrade(0, 3);
        q1Exp.description = Localization.getUpgradeIncCustomExpDesc("q_1", "0.05");
        q1Exp.info = Localization.getUpgradeIncCustomExpInfo("q_1", "0.05");
        q1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c3Term = theory.createMilestoneUpgrade(1, 1);
        c3Term.description = Localization.getUpgradeAddTermDesc("c_3");
        c3Term.info = Localization.getUpgradeAddTermInfo("c_3");
        c3Term.canBeRefunded = (amount) => c3Exp.level == 0;
        c3Term.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); updateAvailability(); }
    }

    {
        c3Exp = theory.createMilestoneUpgrade(2, 2);
        c3Exp.description = Localization.getUpgradeIncCustomExpDesc("c_3", "0.05");
        c3Exp.info = Localization.getUpgradeIncCustomExpInfo("c_3", "0.05");
        c3Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    updateAvailability();
}

var updateAvailability = () => {
    c3.isAvailable = c3Term.level > 0;
    c3Exp.isAvailable = c3Term.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    let vq1 = getQ1(q1.level).pow(getQ1Exp(q1Exp.level));
    let vq2 = getQ2(q2.level);
    let vc1 = getC1(c1.level);
    let vc2 = getC2(c2.level);
    let vc3 = c3Term.level > 0 ? getC3(c3.level).pow(getC3Exp(c3Exp.level)) : BigNumber.ONE;
    let dq = (vc1 / vc2) * q * (vc3 - q / vc2) * dt;

    q = q + dq.max(BigNumber.ZERO);
    q = q.min(vc2 * vc3);
    currency.value += bonus * vq1 * vq2 * q * dt;

    theory.invalidateTertiaryEquation();
}

var getInternalState = () => `${q}`

var setInternalState = (state) => {
    let values = state.split(" ");
    if (values.length > 0) q = parseBigNumber(values[0]);
}

var postPublish = () => {
    q = BigNumber.ONE;
}

var getPrimaryEquation = () => {
    let result = "\\begin{matrix}\\dot{\\rho}=q_1";
    if (q1Exp.level == 1) result += "^{1.05}";
    if (q1Exp.level == 2) result += "^{1.1}";
    if (q1Exp.level == 3) result += "^{1.15}";
    result += "q_2q\\\\\\dot{q}=(c_1/c_2)q(";
    if (c3Term.level > 0)
    {
        result += "c_3";
        if (c3Exp.level == 1) result += "^{1.05}";
        if (c3Exp.level == 2) result += "^{1.1}";
    }
    else
    {
        result += "1";
    }
    result += "-q/c_2)\\end{matrix}";

    theory.primaryEquationHeight = 55;

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getTertiaryEquation = () => "q=" + q.toString();

var getPublicationMultiplier = (tau) => tau.pow(0.159);
var getPublicationMultiplierFormula = (symbol) => "{" + symbol + "}^{0.159}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getQ1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getQ2 = (level) => BigNumber.TWO.pow(level);
var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 1);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => BigNumber.TWO.pow(level);
var getQ1Exp = (level) => BigNumber.from(1 + level * 0.05);
var getC3Exp = (level) => BigNumber.from(1 + level * 0.05);

init();