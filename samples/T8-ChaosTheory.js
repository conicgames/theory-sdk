import { ExponentialCost, FirstFreeCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "chaos_theory"
var name = "Chaos Theory";
var description = "A implementation of the 'Chaos Theory' from the game.";
var authors = "Gilles-Philippe Paillé";
var version = 1;

var state, center, scale;
var c1, c2, c3, c4, c5;
var equation, c3Exp, c4Exp, c5Exp;

var systems = [(v) => new Vector3(10 * (v.y - v.x), v.x * (28 - v.z) - v.y, v.x * v.y - 8 * v.z / 3.0), // Lorenz
               (v) => new Vector3(10 * (40 * (v.y - v.x)), 10 * (-12 * v.x - v.x * v.z + 28 * v.y), 10 * (v.x * v.y - 3 * v.z)), // Chen
               (v) => new Vector3(500 * (-v.y - v.z), 500 * (v.x + 0.1 * v.y), 500 * (0.1 + v.z * (v.x - 14)))]; // Rossler

var bounds = [[new Vector3(0, 0, 24.5), new Vector3(-20, -27, 1), new Vector3(20, 27, 48)],
              [new Vector3(0.5, 1, 20.5), new Vector3(-23, -25, 1), new Vector3(24, 27, 40)],
              [new Vector3(1, -1.5, 8), new Vector3(-20, -21, 0), new Vector3(22, 18, 37)]];

var defaultStates = [new Vector3(-6, -8, 26),
                     new Vector3(-10.6, -4.4, 28.6),
                     new Vector3(-6, 15, 0)];

var swizzles = [(v) => new Vector3(v.y, v.z, v.x),
                (v) => new Vector3(v.y, v.z, v.x),
                (v) => new Vector3(v.x, v.y, v.z)];

var dts = [0.02, 0.002, 0.00014];

var init = () => {
    currency = theory.createCurrency();

    /////////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        let getInfo = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(1.5172))));
        c1.getDescription = (amount) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getInfo(c1.level), getInfo(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(20, Math.log2(64)));
        c2.getDescription = (amount) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    var c345Cost = 1.15;

    // c3
    {
        let getDesc = (level) => "c_3=3^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(2, currency, new ExponentialCost(1e2, c345Cost * Math.log2(3)));
        c3.getDescription = (amount) => Utils.getMath(getDesc(c3.level));
        c3.getInfo = (amount) => Utils.getMathTo(getInfo(c3.level), getInfo(c3.level + amount));
    }

    // c4
    {
        let getDesc = (level) => "c_4=5^{" + level + "}";
        let getInfo = (level) => "c_4=" + getC4(level).toString(0);
        c4 = theory.createUpgrade(3, currency, new ExponentialCost(1e2, c345Cost * Math.log2(5)));
        c4.getDescription = (amount) => Utils.getMath(getDesc(c4.level));
        c4.getInfo = (amount) => Utils.getMathTo(getInfo(c4.level), getInfo(c4.level + amount));
    }

    // c5
    {
        let getDesc = (level) => "c_5=7^{" + level + "}";
        let getInfo = (level) => "c_5=" + getC5(level).toString(0);
        c5 = theory.createUpgrade(4, currency, new ExponentialCost(1e2, c345Cost * Math.log2(7)));
        c5.getDescription = (amount) => Utils.getMath(getDesc(c5.level));
        c5.getInfo = (amount) => Utils.getMathTo(getInfo(c5.level), getInfo(c5.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e8);
    theory.createBuyAllUpgrade(1, currency, 1e10);
    theory.createAutoBuyerUpgrade(2, currency, 1e25);

    /////////////////////
    // Checkpoint Upgrades
    theory.setMilestoneCost(new LinearCost(20, 20));

    {
        let getDesc = (_) => equation.level == 0 ? Localization.getUpgradeChenAttractor() : Localization.getUpgradeRosslerAttractor();
        equation = theory.createMilestoneUpgrade(0, 2);
        equation.getDescription = getDesc;
        equation.getInfo = getDesc;
        equation.boughtOrRefunded = (_) => { theory.invalidateSecondaryEquation(); recreateDynamicSystem(); }
    }

    {
        c3Exp = theory.createMilestoneUpgrade(1, 3);
        c3Exp.description = Localization.getUpgradeIncCustomExpDesc("c_3", "0.05");
        c3Exp.info = Localization.getUpgradeIncCustomExpInfo("c_3", "0.05");
        c3Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c4Exp = theory.createMilestoneUpgrade(2, 3);
        c4Exp.description = Localization.getUpgradeIncCustomExpDesc("c_4", "0.05");
        c4Exp.info = Localization.getUpgradeIncCustomExpInfo("c_4", "0.05");
        c4Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c5Exp = theory.createMilestoneUpgrade(3, 3);
        c5Exp.description = Localization.getUpgradeIncCustomExpDesc("c_5", "0.05");
        c5Exp.info = Localization.getUpgradeIncCustomExpInfo("c_5", "0.05");
        c5Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    recreateDynamicSystem();
}

var resume = () => {
    let previousState = state;
    recreateDynamicSystem();
    state = previousState;
}

var tick = (elapsedTime, multiplier) => {
    if (c1.level == 0 && c2.level == 0 && c3.level == 0 && c4.level == 0 && c5.level == 0)
        return;

    var dt = BigNumber.from(elapsedTime * multiplier);
    var bonus = theory.publicationMultiplier;

    var vc1 = getC1(c1.level);
    var vc2 = getC2(c2.level);
    var vc3 = getC3(c3.level).pow(getC3Exp(c3Exp.level));
    var vc4 = getC4(c4.level).pow(getC4Exp(c4Exp.level));
    var vc5 = getC5(c5.level).pow(getC5Exp(c5Exp.level));

    // Safety nets
    {
        [average, min, max] = bounds[equation.level];
        var lowerBound = (min - average) * 5 + average;
        var upperBound = (max - average) * 5 + average;

        if (state.x < lowerBound.x || state.x > upperBound.x ||
            state.y < lowerBound.y || state.y > upperBound.y ||
            state.z < lowerBound.z || state.z > upperBound.z)
        {
            state = defaultStates[equation.level];
        }
    }

    // Integrate
    let systemDt = dts[equation.level];
    let compute = systems[equation.level];
    let mp = state + 0.5 * systemDt * compute(state);
    state = state + systemDt * compute(mp);

    let d = compute(state);

    var dx2Term = vc3 * (d.x * d.x);
    var dy2Term = vc4 * (d.y * d.y);
    var dz2Term = vc5 * (d.z * d.z);
    currency.value += dt * bonus * vc1 * vc2 * (dx2Term + dy2Term + dz2Term).sqrt() / BigNumber.HUNDRED;

    theory.invalidateTertiaryEquation();
}

var getInternalState = () => `${state.x} ${state.y} ${state.z}`

var setInternalState = (stateString) => {
    let values = stateString.split(" ");
    state = new Vector3(state.x, state.y, state.z); // Make sure that we don't change the default state instances
    if (values.length > 0) state.x = parseFloat(values[0]);
    if (values.length > 1) state.y = parseFloat(values[1]);
    if (values.length > 2) state.z = parseFloat(values[2]);
}

var postPublish = () => {
    state = defaultStates[equation.level];
}

var recreateDynamicSystem = () => {
    state = defaultStates[equation.level];
    bound = bounds[equation.level];
    center = bound[0];
    scale = 2 / (bound[2] - bound[1]).maxComponent;
    theory.clearGraph();
}

var getPrimaryEquation = () => {
    theory.primaryEquationHeight = 33;
    theory.primaryEquationScale = 0.8;
    let result = "";
    result += "\\dot{\\rho}=\\frac{c_1c_2}{100}\\sqrt{c_3";
    if (c3Exp.level == 1) result += "^{1.05}";
    if (c3Exp.level == 2) result += "^{1.1}";
    if (c3Exp.level == 3) result += "^{1.15}";
    result += "\\dot{x_{\\,}}^2+c_4";
    if (c4Exp.level == 1) result += "^{1.05}";
    if (c4Exp.level == 2) result += "^{1.1}";
    if (c4Exp.level == 3) result += "^{1.15}";
    result += "\\dot{y_{\\,}}^2+c_5";
    if (c5Exp.level == 1) result += "^{1.05}";
    if (c5Exp.level == 2) result += "^{1.1}";
    if (c5Exp.level == 3) result += "^{1.15}";
    result += "\\dot{z_{\\,}}^2}";
    return result;
}

var getSecondaryEquation = () => {
    theory.secondaryEquationHeight = 75;
    if (equation.level == 0)
        return "\\dot{x}=10(y-x)\\\\\\dot{y}=x(28-z)-y\\\\\\dot{z}=xy-8z/3\\\\" + theory.latexSymbol + "=\\max\\rho";
    if (equation.level == 1)
        return "\\dot{x}=400(y-x)\\\\\\dot{y}=-120x-10xz+280y\\\\\\dot{z}=10xy-30z\\\\" + theory.latexSymbol + "=\\max\\rho";
    return "\\dot{x}=-500(y+z)\\\\\\dot{y}=500x+50y\\\\\\dot{z}=50+500z(x-14)\\\\" + theory.latexSymbol + "=\\max\\rho";
}

var getTertiaryEquation = () => {
    return "\\begin{matrix}x=" + getCoordString(state.x) +
                        ",&y=" + getCoordString(state.y) +
                        ",&z=" + getCoordString(state.z) + "\\end{matrix}";
}

var getCoordString = (x) => x.toFixed(x >= 0 ? (x < 10 ? 3 : 2) : (x <= -10 ? 1 : 2));

var getPublicationMultiplier = (tau) => tau.pow(0.15);
var getPublicationMultiplierFormula = (symbol) => "{" + symbol + "}^{0.15}";
var getTau = () => currency.value;
var get3DGraphPoint = () => swizzles[equation.level]((state - center) * scale);

var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => BigNumber.THREE.pow(level);
var getC4 = (level) => BigNumber.FIVE.pow(level);
var getC5 = (level) => BigNumber.SEVEN.pow(level);
var getC3Exp = (level) => BigNumber.from(1 + level * 0.05);
var getC4Exp = (level) => BigNumber.from(1 + level * 0.05);
var getC5Exp = (level) => BigNumber.from(1 + level * 0.05);

init();