import { ExponentialCost, FirstFreeCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { parseBigNumber, BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "integral_calculus"
var name = "Integral Calculus";
var description = "A implementation of the 'Integral Calculus' theory from the game.";
var authors = "Gilles-Philippe Paillé";
var version = 1;

var q = BigNumber.ZERO;
var r = BigNumber.ONE;
var previousCurrency = BigNumber.ZERO;
var C = BigNumber.ZERO;

var q1, q2, r1, r2, c1, c2, c3, c4, c5;
var dimension, qbTerm, rbTerm, c1Exp;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ1(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(3))));
        q1.getDescription = (amount) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ2(level).toString(0);
        q2 = theory.createUpgrade(1, currency, new ExponentialCost(500, Math.log2(100)));
        q2.getDescription = (amount) => Utils.getMath(getDesc(q2.level));
        q2.getInfo = (amount) => Utils.getMathTo(getInfo(q2.level), getInfo(q2.level + amount));
    }

    // r1
    {
        let getDesc = (level) => "r_1=" + getR1(level).toString(0);
        let getInfo = (level) => "r_1=" + getR1(level).toString(0);
        r1 = theory.createUpgrade(2, currency, new ExponentialCost(1e25, Math.log2(1e5)));
        r1.getDescription = (amount) => Utils.getMath(getDesc(r1.level));
        r1.getInfo = (amount) => Utils.getMathTo(getInfo(r1.level), getInfo(r1.level + amount));
    }

    // r2
    {
        let getDesc = (level) => "r_2=2^{" + level + "}";
        let getInfo = (level) => "r_2=" + getR2(level).toString(0);
        r2 = theory.createUpgrade(3, currency, new ExponentialCost(1e30, Math.log2(1e10)));
        r2.getDescription = (amount) => Utils.getMath(getDesc(r2.level));
        r2.getInfo = (amount) => Utils.getMathTo(getInfo(r2.level), getInfo(r2.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        let getInfo = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(4, currency, new ExponentialCost(10, Math.log2(2)));
        c1.getDescription = (amount) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getInfo(c1.level), getInfo(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(5, currency, new ExponentialCost(100, Math.log2(5)));
        c2.getDescription = (amount) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + getC3(level).toString(0);
        let getInfo = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(6, currency, new ExponentialCost(1e7, Math.log2(1.255)));
        c3.getDescription = (amount) => Utils.getMath(getDesc(c3.level));
        c3.getInfo = (amount) => Utils.getMathTo(getInfo(c3.level), getInfo(c3.level + amount));
    }

    // c4
    {
        let getDesc = (level) => "c_4=2^{" + level + "}";
        let getInfo = (level) => "c_4=" + getC4(level).toString(0);
        c4 = theory.createUpgrade(7, currency, new ExponentialCost(1e25, Math.log2(5e5)));
        c4.getDescription = (amount) => Utils.getMath(getDesc(c4.level));
        c4.getInfo = (amount) => Utils.getMathTo(getInfo(c4.level), getInfo(c4.level + amount));
    }

    // c5
    {
        let getDesc = (level) => "c_5=2^{" + level + "}";
        let getInfo = (level) => "c_5=" + getC5(level).toString(0);
        c5 = theory.createUpgrade(8, currency, new ExponentialCost(15, Math.log2(3.9)));
        c5.getDescription = (amount) => Utils.getMath(getDesc(c5.level));
        c5.getInfo = (amount) => Utils.getMathTo(getInfo(c5.level), getInfo(c5.level + amount));
        c5.isAvailable = false;
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e12);
    theory.createBuyAllUpgrade(1, currency, 1e15);
    theory.createAutoBuyerUpgrade(2, currency, 1e30);

    //////////////////////
    // Checkpoint Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        dimension = theory.createMilestoneUpgrade(0, 1);
        dimension.getDescription = (amount) => Localization.getUpgradeAddDimensionDesc();
        dimension.getInfo = (amount) => Localization.getUpgradeAddDimensionDesc();
        dimension.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); theory.invalidateSecondaryEquation(); updateAvailability(); }
        dimension.canBeRefunded = (_) => rbTerm.level == 0;
    }

    {
        qbTerm = theory.createMilestoneUpgrade(1, 1);
        qbTerm.getDescription = (amount) => Localization.getUpgradeAddTermDesc("\\bar{q_{\\,}}^2");
        qbTerm.getInfo = (amount) => Localization.getUpgradeAddTermInfo("\\bar{q_{\\,}}^2");
        qbTerm.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); updateAvailability(); }
    }

    {
        rbTerm = theory.createMilestoneUpgrade(2, 1);
        rbTerm.getDescription = (amount) => Localization.getUpgradeAddTermDesc("\\bar{r}");
        rbTerm.getInfo = (amount) => Localization.getUpgradeAddTermInfo("\\bar{r}");
        rbTerm.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); updateAvailability(); }
        rbTerm.isAvailable = false;;
    }

    {
        c1Exp = theory.createMilestoneUpgrade(3, 3);
        c1Exp.getDescription = (amount) => Localization.getUpgradeIncCustomExpDesc("c_1", "0.05");
        c1Exp.getInfo = (amount) => Localization.getUpgradeIncCustomExpInfo("c_1", "0.05");
        c1Exp.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); }
    }

    updateAvailability();
}

var updateAvailability = () => {
    c4.isAvailable = qbTerm.level > 0;
    rbTerm.isAvailable = dimension.level > 0;
    c5.isAvailable = rbTerm.level > 0;
    r1.isAvailable = dimension.level > 0;
    r2.isAvailable = dimension.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    let vq1 = getQ1(q1.level);
    let vq2 = getQ2(q2.level);
    let vr1 = getR1(r1.level);
    let vr2 = getR2(r2.level);
    let vc1 = getC1(c1.level).pow(getC1Exp(c1Exp.level));
    let vc2 = getC2(c2.level);
    let vc3 = getC3(c3.level);
    let vc4 = getC4(c4.level);
    let vc5 = getC5(c5.level);

    C = calculateIntegral(vc1, vc2, vc3, vc4, vc5, bonus) - currency.value;
    q = q + vq1 * vq2 * dt;

    if (dimension.level > 0)
        r = r + vr1 * vr2 * dt / BigNumber.THOUSAND;
    else
        r = BigNumber.ONE;

    let newCurrency = calculateIntegral(vc1, vc2, vc3, vc4, vc5, bonus);
    C = C.min(newCurrency);
    currency.value = newCurrency - C;

    previousCurrency = currency.value;

    theory.invalidateTertiaryEquation();
}

var calculateIntegral = (c1, c2, c3, c4, c5, bonus) =>
{
    let qp2 = q * q;
    let qp3 = qp2 * q;
    let rp2 = r * r;
    let term1 = c1 * c2 * q * r;
    let term2 = c3 * qp2 * r / BigNumber.TWO;
    let term3 = qbTerm.level > 0 ? c4 * qp3 * r / BigNumber.THREE : BigNumber.ZERO;
    let term4 = rbTerm.level > 0 ? c5 * q * rp2 / BigNumber.TWO : BigNumber.ZERO;
    
    return bonus * (term1 + term2 + term3 + term4);
}

var getInternalState = () => `${q} ${r} ${previousCurrency} ${C}`

var setInternalState = (state) => {
    let values = state.split(" ");
    if (values.length > 0) q = parseBigNumber(values[0]);
    if (values.length > 1) r = parseBigNumber(values[1]);
    if (values.length > 2) previousCurrency = parseBigNumber(values[2]);
    if (values.length > 3) C = parseBigNumber(values[3]);
}

var postPublish = () => {
    q = BigNumber.ZERO;
    r = BigNumber.ONE;
    previousCurrency = BigNumber.ZERO;
    C = BigNumber.ZERO;
}

var getPrimaryEquation = () => {
    let result = "";

    result += "\\rho =";
    if (dimension.level > 0) result += "\\int_0^r{";
    result += "\\int_0^q{";
    result += "\\left(c_1";
    if (c1Exp.level == 1) result += "^{1.05}";
    if (c1Exp.level == 2) result += "^{1.1}";
    if (c1Exp.level == 3) result += "^{1.15}";
    result += "c_2+c_3\\bar{q}";
    if (qbTerm.level > 0) result += "+c_4\\bar{q_{\\,}}^2";
    if (rbTerm.level > 0) result += "+c_5\\bar{r}";
    result += "\\right)}d\\bar{q}";
    if (dimension.level > 0) result += "}d\\bar{r}";
    result += "-C";

    theory.primaryEquationHeight = 55;

    if (dimension.level > 0)
        theory.primaryEquationScale = 0.9;
    else
        theory.primaryEquationScale = 1;

    return result;
}

var getSecondaryEquation = () => {
    let result = "";

    result += "\\begin{matrix}";
    result += theory.latexSymbol;
    result += "=\\max\\rho,&\\dot{q}=q_1q_2";
    if (dimension.level > 0) result += ",&\\dot{r}=r_1r_2/1000";
    result += "\\end{matrix}";

    return result;
}

var getTertiaryEquation = () => {
    let result = "";

    result += "\\begin{matrix}q=";
    result += q.toString();
    if (dimension.level > 0) { result += ",&r="; result += r; }
    result += ",&C=";
    result += C.toString();
    result += "\\end{matrix}";

    return result;
}

var getPublicationMultiplier = (tau) => tau.pow(0.196) / 50;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.196}}{50}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getQ1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getQ2 = (level) => BigNumber.TWO.pow(level);
var getR1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getR2 = (level) => BigNumber.TWO.pow(level);
var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 1);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC4 = (level) => BigNumber.TWO.pow(level);
var getC5 = (level) => BigNumber.TWO.pow(level);
var getC1Exp = (level) => BigNumber.from(1 + level * 0.05);

init();
