import { ExponentialCost, FirstFreeCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "polynomials"
var name = "Polynomials";
var description = "A implementation of the 'Polynomials' theory from the game."
var authors = "Gilles-Philippe Paillé"

var q = BigNumber.ZERO;
var q1, q2;
var c1, c2, c3, c4, c5, c6;
var terms, c1Exp, multQDot;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(5, Math.log2(1.305))));
        c1.getDescription = (amount) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(20, Math.log2(3.75)));
        c2.getDescription = (amount) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=2^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(2, currency, new ExponentialCost(2000, Math.log2(2.468)));
        c3.getDescription = (amount) => Utils.getMath(getDesc(c3.level));
        c3.getInfo = (amount) => Utils.getMathTo(getInfo(c3.level), getInfo(c3.level + amount));
    }

    // c4
    {
        let getDesc = (level) => "c_4=3^{" + level + "}";
        let getInfo = (level) => "c_4=" + getC4(level).toString(0);
        c4 = theory.createUpgrade(3, currency, new ExponentialCost(1e4, Math.log2(4.85)));
        c4.getDescription = (amount) => Utils.getMath(getDesc(c4.level));
        c4.getInfo = (amount) => Utils.getMathTo(getInfo(c4.level), getInfo(c4.level + amount));
        c4.isAvailable = false;
    }

    // c5
    {
        let getDesc = (level) => "c_5=5^{" + level + "}";
        let getInfo = (level) => "c_5=" + getC5(level).toString(0);
        c5 = theory.createUpgrade(4, currency, new ExponentialCost(1e8, Math.log2(12.5)));
        c5.getDescription = (amount) => Utils.getMath(getDesc(c5.level));
        c5.getInfo = (amount) => Utils.getMathTo(getInfo(c5.level), getInfo(c5.level + amount));
        c5.isAvailable = false;
    }

    // c6
    {
        let getDesc = (level) => "c_6=10^{" + level + "}";
        let getInfo = (level) => "c_6=" + getC6(level).toString(0);
        c6 = theory.createUpgrade(5, currency, new ExponentialCost(1e10, Math.log2(58)));
        c6.getDescription = (amount) => Utils.getMath(getDesc(c6.level));
        c6.getInfo = (amount) => Utils.getMathTo(getInfo(c6.level), getInfo(c6.level + amount));
        c6.isAvailable = false;
    }

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ1(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(6, currency, new ExponentialCost(1000, Math.log2(100)));
        q1.getDescription = (amount) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ2(level).toString(0);
        q2 = theory.createUpgrade(7, currency, new ExponentialCost(1e4, Math.log2(1000)));
        q2.getDescription = (amount) => Utils.getMath(getDesc(q2.level));
        q2.getInfo = (amount) => Utils.getMathTo(getInfo(q2.level), getInfo(q2.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e9);
    theory.createBuyAllUpgrade(1, currency, 1e13);
    theory.createAutoBuyerUpgrade(2, currency, 1e30);

    /////////////////////
    // Checkpoint Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        terms = theory.createMilestoneUpgrade(0, 3);
        terms.getDescription = (_) => Localization.getUpgradeAddTermDesc(terms.level == 0 ? "q^2" : terms.level == 1 ? "q^3" : "q^4");
        terms.getInfo = (_) => Localization.getUpgradeAddTermInfo(terms.level == 0 ? "q^2" : terms.level == 1 ? "q^3" : "q^4");
        terms.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); updateAvailability(); }
    }

    {
        c1Exp = theory.createMilestoneUpgrade(1, 1);
        c1Exp.description = Localization.getUpgradeIncCustomExpDesc("c_1", "0.15");
        c1Exp.info = Localization.getUpgradeIncCustomExpInfo("c_1", "0.15");
        c1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        multQDot = theory.createMilestoneUpgrade(2, 3);
        multQDot.description = Localization.getUpgradeMultCustomDesc("\\dot{q}", "2");
        multQDot.info = Localization.getUpgradeMultCustomInfo("\\dot{q}", "2");
        multQDot.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    updateAvailability();
}

var updateAvailability = () => {
    c4.isAvailable = terms.level > 0;
    c5.isAvailable = terms.level > 1;
    c6.isAvailable = terms.level > 2;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let vq1 = getQ1(q1.level);
    let vq2 = getQ2(q2.level);
    let vc1 = getC1(c1.level);
    let vc1Exp = getC1Exp(c1Exp.level);
    let vc2 = getC2(c2.level);
    let vc3 = getC3(c3.level);
    let vc4 = getC4(c4.level);
    let vc5 = getC5(c5.level);
    let vc6 = getC6(c6.level);
    let q1q2 = vq1 * vq2;

    let p = (q + BigNumber.ONE).Square() - BigNumber.ONE;
    q = (BigNumber.ONE + p + BigNumber.TWO.pow(1 + multQDot.level) * q1q2 * dt).sqrt() - BigNumber.ONE;
    let qe2 = q * q;
    let qe3 = qe2 * q;
    let qe4 = qe3 * q;

    let term1 = vc1.pow(vc1Exp) * vc2;
    let term2 = vc3 * q;
    let term3 = terms.level > 0 ? vc4 * qe2 : BigNumber.ZERO;
    let term4 = terms.level > 1 ? vc5 * qe3 : BigNumber.ZERO;
    let term5 = terms.level > 2 ? vc6 * qe4 : BigNumber.ZERO;
    let bonus = theory.publicationMultiplier;

    currency.value += bonus * dt * (term1 + term2 + term3 + term4 + term5);

    theory.invalidateTertiaryEquation();
}

var getInternalState = () => `${q}`

var setInternalState = (state) => {
    let values = state.split(" ");
    if (values.length > 0) q = parseBigNumber(values[0]);
}

var postPublish = () => {
    q = BigNumber.ZERO;
}

var getPrimaryEquation = () => {
    let result = "";

    result += "\\dot{\\rho}=c_1";
    if (c1Exp.level == 1) result += "^{1.15}";
    result += "c_2+c_3q";

    if (terms.level > 0) result += "+c_4q^2";
    if (terms.level > 1) result += "+c_5q^3";
    if (terms.level > 2) result += "+c_6q^4";

    return result;
}

var getSecondaryEquation = () => {
    let result = "\\begin{matrix}";

    result += theory.latexSymbol;
    result += "=\\max\\rho,&\\dot{q}=";
    if (multQDot.level > 0)
    {
        result += "2";
        if (multQDot.level > 1)
            result += "^{" + multQDot.level.toString() + "}";
    }
    result += "q_1q_2/(1+q)";
    result += "\\end{matrix}";

    return result;
}

var getTertiaryEquation = () => "q=" + q.toString();

var getPublicationMultiplier = (tau) => tau.pow(0.165) / BigNumber.FOUR;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.165}}{4}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => BigNumber.TWO.pow(level);
var getC4 = (level) => BigNumber.THREE.pow(level);
var getC5 = (level) => BigNumber.FIVE.pow(level);
var getC6 = (level) => BigNumber.TEN.pow(level);
var getQ1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getQ2 = (level) => BigNumber.TWO.pow(level);
var getC1Exp = (level) => BigNumber.from(1 + level * 0.15);

init();