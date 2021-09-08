import { ExponentialCost, FirstFreeCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "differential_calculus"
var name = "Differential Calculus";

var currency;
var q1 = BigNumber.ZERO, q2 = BigNumber.ONE, q3 = BigNumber.ONE, q4 = BigNumber.ONE;
var r1 = BigNumber.ONE, r2 = BigNumber.ONE, r3 = BigNumber.ONE, r4 = BigNumber.ONE;
var dq1, dq2, dq3, dq4, dr1, dr2, dr3, dr4;
var qTerms, rTerms, q1Exp, r1Exp;
quaternaryEntries = [];

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // q1
    {
        let getDesc = (level) => "\\dot{q}_1=" + getDQ1(level).toString(0) + "\\times q_2";
        let getInfo = (level) => "\\dot{q}_1=" + (getDQ1(level) * q2).toString();
        dq1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(2))));
        dq1.getDescription = (amount) => Utils.getMath(getDesc(dq1.level));
        dq1.getInfo = (amount) => Utils.getMathTo(getInfo(dq1.level), getInfo(dq1.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "\\dot{q}_2=" + getDQ2(level).toString(0) + (qTerms.level > 0 ? "\\times q_3" : "");
        let getInfo = (level) => "\\dot{q}_2=" + (getDQ2(level) * (dq3.level > 0 ? q3 : BigNumber.ONE)).toString();
        dq2 = theory.createUpgrade(1, currency, new ExponentialCost(5000, Math.log2(2)));
        dq2.getDescription = (amount) => Utils.getMath(getDesc(dq2.level));
        dq2.getInfo = (amount) => Utils.getMathTo(getInfo(dq2.level), getInfo(dq2.level + amount));
    }

    // q3
    {
        let getDesc = (level) => "\\dot{q}_3=" + getDQ3(level).toString(0) + (qTerms.level > 1 ? "\\times q_4" : "");
        let getInfo = (level) => "\\dot{q}_3=" + (getDQ3(level) * (dq4.level > 0 ? q4 : BigNumber.ONE)).toString();
        dq3 = theory.createUpgrade(2, currency, new ExponentialCost(3e25, Math.log2(3)));
        dq3.getDescription = (amount) => Utils.getMath(getDesc(dq3.level));
        dq3.getInfo = (amount) => Utils.getMathTo(getInfo(dq3.level), getInfo(dq3.level + amount));
    }

    // q4
    {
        let getDesc = (level) => "\\dot{q}_4=" + getDQ4(level).toString(0);
        let getInfo = (level) => "\\dot{q}_4=" + getDQ4(level).toString(0);
        dq4 = theory.createUpgrade(3, currency, new ExponentialCost(8e50, Math.log2(4)));
        dq4.getDescription = (amount) => Utils.getMath(getDesc(dq4.level));
        dq4.getInfo = (amount) => Utils.getMathTo(getInfo(dq4.level), getInfo(dq4.level + amount));
    }

    // r1
    {
        let getDesc = (level) => "\\dot{r}_1=" + getDR1(level).toString(0) + "\\times r_2";
        let getInfo = (level) => "\\dot{r}_1=" + (getDR1(level) * r2).toString();
        dr1 = theory.createUpgrade(4, currency, new ExponentialCost(2e6, Math.log2(2)));
        dr1.getDescription = (amount) => Utils.getMath(getDesc(dr1.level));
        dr1.getInfo = (amount) => Utils.getMathTo(getInfo(dr1.level), getInfo(dr1.level + amount));
    }

    // r2
    {
        let getDesc = (level) => "\\dot{r}_2=" + getDR2(level).toString(0) + (rTerms.level > 0 ? "\\times r_3" : "");
        let getInfo = (level) => "\\dot{r}_2=" + (getDR2(level) * (dr3.level > 0 ? r3 : BigNumber.ONE)).toString();
        dr2 = theory.createUpgrade(5, currency, new ExponentialCost(3e9, Math.log2(2)));
        dr2.getDescription = (amount) => Utils.getMath(getDesc(dr2.level));
        dr2.getInfo = (amount) => Utils.getMathTo(getInfo(dr2.level), getInfo(dr2.level + amount));
    }

    // r3
    {
        let getDesc = (level) => "\\dot{r}_3=" + getDR3(level).toString(0) + (rTerms.level > 1 ? "\\times r_4" : "");
        let getInfo = (level) => "\\dot{r}_3=" + (getDR3(level) * (dr4.level > 0 ? r4 : BigNumber.ONE)).toString();
        dr3 = theory.createUpgrade(6, currency, new ExponentialCost(4e25, Math.log2(3)));
        dr3.getDescription = (amount) => Utils.getMath(getDesc(dr3.level));
        dr3.getInfo = (amount) => Utils.getMathTo(getInfo(dr3.level), getInfo(dr3.level + amount));
    }

    // r4
    {
        let getDesc = (level) => "\\dot{r}_4=" + getDR4(level).toString(0);
        let getInfo = (level) => "\\dot{r}_4=" + getDR4(level).toString(0);
        dr4 = theory.createUpgrade(7, currency, new ExponentialCost(5e50, Math.log2(4)));
        dr4.getDescription = (amount) => Utils.getMath(getDesc(dr4.level));
        dr4.getInfo = (amount) => Utils.getMathTo(getInfo(dr4.level), getInfo(dr4.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e15);
    theory.createBuyAllUpgrade(1, currency, 1e18);
    theory.createAutoBuyerUpgrade(2, currency, 1e35);

    //////////////////////
    // Checkpoint Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        qTerms = theory.createMilestoneUpgrade(0, 2);
        qTerms.getDescription = (_) => Localization.getUpgradeUnlockDesc(qTerms.level == 0 ? "q_3" : "q_4");
        qTerms.getInfo = (_) => Localization.getUpgradeUnlockInfo(qTerms.level == 0 ? "q_3" : "q_4");
        qTerms.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        rTerms = theory.createMilestoneUpgrade(1, 2);
        rTerms.getDescription = (_) => Localization.getUpgradeUnlockDesc(rTerms.level == 0 ? "r_3" : "r_4");
        rTerms.getInfo = (_) => Localization.getUpgradeUnlockInfo(rTerms.level == 0 ? "r_3" : "r_4");
        rTerms.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        q1Exp = theory.createMilestoneUpgrade(2, 3);
        q1Exp.description = Localization.getUpgradeIncCustomExpDesc("q_1", "0.05");
        q1Exp.info = Localization.getUpgradeIncCustomExpInfo("q_1", "0.05");
        q1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        r1Exp = theory.createMilestoneUpgrade(3, 3);
        r1Exp.description = Localization.getUpgradeIncCustomExpDesc("r_1", "0.05");
        r1Exp.info = Localization.getUpgradeIncCustomExpInfo("r_1", "0.05");
        r1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    updateAvailability();
}

var updateAvailability = () => {
    dq3.isAvailable = qTerms.level > 0;
    dq4.isAvailable = qTerms.level > 1;
    dr3.isAvailable = rTerms.level > 0;
    dr4.isAvailable = rTerms.level > 1;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;

    q1 = q1 + dt * getDQ1(dq1.level) * q2;
    q2 = q2 + dt * getDQ2(dq2.level) * (qTerms.level > 0 ? q3 : BigNumber.ONE);
    if (qTerms.level > 0) q3 = q3 + dt * getDQ3(dq3.level) * (qTerms.level > 1 ? q4 : BigNumber.ONE);
    if (qTerms.level > 1) q4 = q4 + dt * getDQ4(dq4.level);

    r1 = r1 + dt * getDR1(dr1.level) * r2;
    r2 = r2 + dt * getDR2(dr2.level) * (rTerms.level > 0 ? r3 : BigNumber.ONE);
    if (rTerms.level > 0) r3 = r3 + dt * getDR3(dr3.level) * (rTerms.level > 1 ? r4 : BigNumber.ONE);
    if (rTerms.level > 1) r4 = r4 + dt * getDR4(dr4.level);

    currency.value += bonus * dt * (q1.pow(getQ1Exp(q1Exp.level)) *
                                    r1.pow(getR1Exp(r1Exp.level)));

    theory.invalidateQuaternaryValues();
}

var getInternalState = () => {
    return q1.toString() + " " + q2.toString() + " " + q3.toString() + " " + q4.toString() + " " +
           r1.toString() + " " + r2.toString() + " " + r3.toString() + " " + r4.toString();
}

var setInternalState = (state) => {
    let values = state.split(" ");
    if (values.length > 0) q1 = parseBigNumber(values[0]);
    if (values.length > 1) q2 = parseBigNumber(values[1]);
    if (values.length > 2) q3 = parseBigNumber(values[2]);
    if (values.length > 3) q4 = parseBigNumber(values[3]);
    if (values.length > 4) r1 = parseBigNumber(values[4]);
    if (values.length > 5) r2 = parseBigNumber(values[5]);
    if (values.length > 6) r3 = parseBigNumber(values[6]);
    if (values.length > 7) r4 = parseBigNumber(values[7]);
}

var postPublish = () => {
    q1 = BigNumber.ZERO;
    q2 = BigNumber.ONE;
    q3 = BigNumber.ONE;
    q4 = BigNumber.ONE;
    r1 = BigNumber.ONE;
    r2 = BigNumber.ONE;
    r3 = BigNumber.ONE;
    r4 = BigNumber.ONE;
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho}=q_1";
    if (q1Exp.level == 1) result += "^{1.05}";
    if (q1Exp.level == 2) result += "^{1.1}";
    if (q1Exp.level == 3) result += "^{1.15}";
    result += "r_1";
    if (r1Exp.level == 1) result += "^{1.05}";
    if (r1Exp.level == 2) result += "^{1.1}";
    if (r1Exp.level == 3) result += "^{1.15}";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";

var getQuaternaryValues = () => {
    if (quaternaryEntries.length == 0)
    {
        quaternaryEntries.push(new QuaternaryEntry("q_1", null));
        quaternaryEntries.push(new QuaternaryEntry("q_2", null));
        quaternaryEntries.push(new QuaternaryEntry("q_3", null));
        quaternaryEntries.push(new QuaternaryEntry("q_4", null));
        quaternaryEntries.push(new QuaternaryEntry("r_1", null));
        quaternaryEntries.push(new QuaternaryEntry("r_2", null));
        quaternaryEntries.push(new QuaternaryEntry("r_3", null));
        quaternaryEntries.push(new QuaternaryEntry("r_4", null));
    }

    quaternaryEntries[0].value = q1.toString();
    quaternaryEntries[1].value = q2.toString();
    quaternaryEntries[2].value = qTerms.level > 0 ? q3.toString() : null;
    quaternaryEntries[3].value = qTerms.level > 1 ? q4.toString() : null;
    quaternaryEntries[4].value = r1.toString();
    quaternaryEntries[5].value = r2.toString();
    quaternaryEntries[6].value = rTerms.level > 0 ? r3.toString() : null;
    quaternaryEntries[7].value = rTerms.level > 1 ? r4.toString() : null;

    return quaternaryEntries;
}

var getPublicationMultiplier = (tau) => tau.pow(0.198) / BigNumber.HUNDRED;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.198}}{100}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getDQ1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getDQ2 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getDQ3 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getDQ4 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getDR1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getDR2 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getDR3 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getDR4 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getQ1Exp = (level) => BigNumber.from(1 + level * 0.05);
var getR1Exp = (level) => BigNumber.from(1 + level * 0.05);

init();