import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { BigNumber, parseBigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "convergence_test"
var name = "Convergence Test";
var description = "A implementation of the 'Convergence Test' theory from the game."
var authors = "Gilles-Philippe Paillé"

var c11, c12, c13;
var c21, c22, c23, c24;
var q31, q32, c31, c32, c33;
var c41, c42, c43;
var q51, q52, c51, c52, c53, c54, c55, c56, c57, c58;
var q61, q62, c61, c62, c63, c64;
var q71, q72, c71, c72;
var lemma;

const lemmaCount = 7;
var provedLemmas = 0;
var initialQ = [BigNumber.ZERO, BigNumber.ONE, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO];
var qs = Array.from(initialQ);
var currencyValues = [BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO];
var qDifferential = BigNumber.ZERO;

const isRTL = Localization.isRTL;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // Lemma 1
    let baseId = 0;

    // c1
    {
        let getDesc = (level) => "c_1=" + getC11(level).toString(0);
        let getInfo = (level) => "c_1=" + getC11(level).toString(0);
        c11 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(1.5))));
        c11.getDescription = (amount) => Utils.getMath(getDesc(c11.level));
        c11.getInfo = (amount) => Utils.getMathTo(getInfo(c11.level), getInfo(c11.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC12(level).toString(0);
        c12 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(30, Math.log2(3)));
        c12.getDescription = (amount) => Utils.getMath(getDesc(c12.level));
        c12.getInfo = (amount) => Utils.getMathTo(getInfo(c12.level), getInfo(c12.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=2^{" + level + "}-1";
        let getInfo = (level) => "c_3=" + getC13(level).toString(0);
        c13 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(100, Math.log2(3)));
        c13.getDescription = (amount) => Utils.getMath(getDesc(c13.level));
        c13.getInfo = (amount) => Utils.getMathTo(getInfo(c13.level), getInfo(c13.level + amount));
    }

    // Lemma 2
    baseId += 100;

    // c1
    {
        let getDesc = (level) => "c_1=" + getC21(level).toString(0);
        let getInfo = (level) => "c_1=" + getC21(level).toString(0);
        c21 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(1.5))));
        c21.getDescription = (amount) => Utils.getMath(getDesc(c21.level));
        c21.getInfo = (amount) => Utils.getMathTo(getInfo(c21.level), getInfo(c21.level + amount));
        c21.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC22(level).toString(0);
        c22 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(30, Math.log2(3)));
        c22.getDescription = (amount) => Utils.getMath(getDesc(c22.level));
        c22.getInfo = (amount) => Utils.getMathTo(getInfo(c22.level), getInfo(c22.level + amount));
        c22.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + getC23(level).toString(0);
        let getInfo = (level) => "c_3=" + getC23(level).toString(0);
        c23 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(200, Math.log2(1.3)));
        c23.getDescription = (amount) => Utils.getMath(getDesc(c23.level));
        c23.getInfo = (amount) => Utils.getMathTo(getInfo(c23.level), getInfo(c23.level + amount));
        c23.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    // c4
    {
        let getDesc = (level) => "c_4=2^{" + level + "}";
        let getInfo = (level) => "c_4=" + getC24(level).toString(0);
        c24 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(250, Math.log2(2)));
        c24.getDescription = (amount) => Utils.getMath(getDesc(c24.level));
        c24.getInfo = (amount) => Utils.getMathTo(getInfo(c24.level), getInfo(c24.level + amount));
        c24.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    // Lemma 3
    baseId += 100;

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ31(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ31(level).toString(0);
        q31 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(4))));
        q31.getDescription = (amount) => Utils.getMath(getDesc(q31.level));
        q31.getInfo = (amount) => Utils.getMathTo(getInfo(q31.level), getInfo(q31.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ32(level).toString(0);
        q32 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(50, Math.log2(50)));
        q32.getDescription = (amount) => Utils.getMath(getDesc(q32.level));
        q32.getInfo = (amount) => Utils.getMathTo(getInfo(q32.level), getInfo(q32.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC31(level).toString(0);
        let getInfo = (level) => "c_1=" + getC31(level).toString(0);
        c31 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(1e4, Math.log2(3)));
        c31.getDescription = (amount) => Utils.getMath(getDesc(c31.level));
        c31.getInfo = (amount) => Utils.getMathTo(getInfo(c31.level), getInfo(c31.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC32(level).toString(0);
        c32 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(1e5, Math.log2(2)));
        c32.getDescription = (amount) => Utils.getMath(getDesc(c32.level));
        c32.getInfo = (amount) => Utils.getMathTo(getInfo(c32.level), getInfo(c32.level + amount));
        c32.maxLevel = 25;
    }

    // c3
    {
        let getDesc = (level) => "c_3=2^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC33(level).toString(0);
        c33 = theory.createUpgrade(baseId + 4, currency, new ExponentialCost(100, Math.log2(100)));
        c33.getDescription = (amount) => Utils.getMath(getDesc(c33.level));
        c33.getInfo = (amount) => Utils.getMathTo(getInfo(c33.level), getInfo(c33.level + amount));
    }

    // Lemma 4
    baseId += 100;

    // c1
    {
        let getDesc = (level) => "c_1=" + getC41(level).toString(0);
        let getInfo = (level) => "c_1=" + getC41(level).toString(0);
        c41 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(1, Math.log2(2.87))));
        c41.getDescription = (amount) => Utils.getMath(getDesc(c41.level));
        c41.getInfo = (amount) => Utils.getMathTo(getInfo(c41.level), getInfo(c41.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC42(level).toString(0);
        c42 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(5000, Math.log2(10)));
        c42.getDescription = (amount) => Utils.getMath(getDesc(c42.level));
        c42.getInfo = (amount) => Utils.getMathTo(getInfo(c42.level), getInfo(c42.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + (level + 1) + "^2";
        let getInfo = (level) => "c_3=" + getC43(level).toString(0);
        c43 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(1, Math.log2(10)));
        c43.getDescription = (amount) => Utils.getMath(getDesc(c43.level));
        c43.getInfo = (amount) => Utils.getMathTo(getInfo(c43.level), getInfo(c43.level + amount));
    }

    // Lemma 5
    baseId += 100;

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ51(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ51(level).toString(0);
        q51 = theory.createUpgrade(baseId + 0, currency, new ExponentialCost(10, Math.log2(3)));
        q51.getDescription = (amount) => Utils.getMath(getDesc(q51.level));
        q51.getInfo = (amount) => Utils.getMathTo(getInfo(q51.level), getInfo(q51.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ52(level).toString(0);
        q52 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(30, Math.log2(10)));
        q52.getDescription = (amount) => Utils.getMath(getDesc(q52.level));
        q52.getInfo = (amount) => Utils.getMathTo(getInfo(q52.level), getInfo(q52.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_1=" + getC5i(level).toString(0);
        c51 = theory.createUpgrade(baseId + 2, currency, new FreeCost());
        c51.getDescription = (amount) => Utils.getMath(getDesc(c51.level));
        c51.getInfo = (amount) => Utils.getMathTo(getInfo(c51.level), getInfo(c51.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_2=" + getC5i(level).toString(0);
        c52 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(1e6, Math.log2(1.1)));
        c52.getDescription = (amount) => Utils.getMath(getDesc(c52.level));
        c52.getInfo = (amount) => Utils.getMathTo(getInfo(c52.level), getInfo(c52.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_3=" + getC5i(level).toString(0);
        c53 = theory.createUpgrade(baseId + 4, currency, new ExponentialCost(1e11, Math.log2(1.1)));
        c53.getDescription = (amount) => Utils.getMath(getDesc(c53.level));
        c53.getInfo = (amount) => Utils.getMathTo(getInfo(c53.level), getInfo(c53.level + amount));
    }

    // c4
    {
        let getDesc = (level) => "c_4=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_4=" + getC5i(level).toString(0);
        c54 = theory.createUpgrade(baseId + 5, currency, new ExponentialCost(1e13, Math.log2(1.1)));
        c54.getDescription = (amount) => Utils.getMath(getDesc(c54.level));
        c54.getInfo = (amount) => Utils.getMathTo(getInfo(c54.level), getInfo(c54.level + amount));
    }

    // c5
    {
        let getDesc = (level) => "c_5=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_5=" + getC5i(level).toString(0);
        c55 = theory.createUpgrade(baseId + 6, currency, new ExponentialCost(1e15, Math.log2(1.08)));
        c55.getDescription = (amount) => Utils.getMath(getDesc(c55.level));
        c55.getInfo = (amount) => Utils.getMathTo(getInfo(c55.level), getInfo(c55.level + amount));
    }

    // c6
    {
        let getDesc = (level) => "c_6=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_6=" + getC5i(level).toString(0);
        c56 = theory.createUpgrade(baseId + 7, currency, new ExponentialCost(1e17, Math.log2(1.06)));
        c56.getDescription = (amount) => Utils.getMath(getDesc(c56.level));
        c56.getInfo = (amount) => Utils.getMathTo(getInfo(c56.level), getInfo(c56.level + amount));
    }

    // c7
    {
        let getDesc = (level) => "c_7=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_7=" + getC5i(level).toString(0);
        c57 = theory.createUpgrade(baseId + 8, currency, new ExponentialCost(1e19, Math.log2(1.02)));
        c57.getDescription = (amount) => Utils.getMath(getDesc(c57.level));
        c57.getInfo = (amount) => Utils.getMathTo(getInfo(c57.level), getInfo(c57.level + amount));
    }

    // c8
    {
        let getDesc = (level) => "c_8=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_8=" + getC5i(level).toString(0);
        c58 = theory.createUpgrade(baseId + 9, currency, new ExponentialCost(1e21, Math.log2(1.01)));
        c58.getDescription = (amount) => Utils.getMath(getDesc(c58.level));
        c58.getInfo = (amount) => Utils.getMathTo(getInfo(c58.level), getInfo(c58.level + amount));
    }

    // Lemma 6
    baseId += 100;

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ61(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ61(level).toString(0);
        q61 = theory.createUpgrade(baseId + 0, currency, new ExponentialCost(10, Math.log2(5)));
        q61.getDescription = (amount) => Utils.getMath(getDesc(q61.level));
        q61.getInfo = (amount) => Utils.getMathTo(getInfo(q61.level), getInfo(q61.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ62(level).toString(0);
        q62 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(100, Math.log2(10)));
        q62.getDescription = (amount) => Utils.getMath(getDesc(q62.level));
        q62.getInfo = (amount) => Utils.getMathTo(getInfo(q62.level), getInfo(q62.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC61(level).toString(0);
        let getInfo = (level) => "c_1=" + getC61(level).toString(0);
        c61 = theory.createUpgrade(baseId + 2, currency, new FirstFreeCost(new ExponentialCost(30, Math.log2(10))));
        c61.getDescription = (amount) => Utils.getMath(getDesc(c61.level));
        c61.getInfo = (amount) => Utils.getMathTo(getInfo(c61.level), getInfo(c61.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=" + getC62(level).toString(0);
        let getInfo = (level) => "c_2=" + getC62(level).toString(0);
        c62 = theory.createUpgrade(baseId + 3, currency, new FirstFreeCost(new ExponentialCost(30, Math.log2(10))));
        c62.getDescription = (amount) => Utils.getMath(getDesc(c62.level));
        c62.getInfo = (amount) => Utils.getMathTo(getInfo(c62.level), getInfo(c62.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + level + "^{1/e}";
        let getInfo = (level) => "c_3=" + getC63(level).toString(4);
        c63 = theory.createUpgrade(baseId + 4, currency, new ExponentialCost(1e6, Math.log2(1.15)));
        c63.getDescription = (amount) => Utils.getMath(getDesc(c63.level));
        c63.getInfo = (amount) => Utils.getMathTo(getInfo(c63.level), getInfo(c63.level + amount));
        c63.refunded = (_) => { if (c63.level < 2) c63.Buy(2 - c63.level); }
        c63.canBeRefunded = (_) => c63.level > 2;
        c63.level = 2;
    }

    // c4
    {
        let getDesc = (level) => "c_4=" + level + "^{1/\\pi}";
        let getInfo = (level) => "c_4=" + getC64(level).toString(4);
        c64 = theory.createUpgrade(baseId + 5, currency, new ExponentialCost(1e6, Math.log2(1.15)));
        c64.getDescription = (amount) => Utils.getMath(getDesc(c64.level));
        c64.getInfo = (amount) => Utils.getMathTo(getInfo(c64.level), getInfo(c64.level + amount));
    }

    // Lemma 7
    baseId += 100;

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ71(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ71(level).toString(0);
        q71 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(1.5))));
        q71.getDescription = (amount) => Utils.getMath(getDesc(q71.level));
        q71.getInfo = (amount) => Utils.getMathTo(getInfo(q71.level), getInfo(q71.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ72(level).toString(0);
        q72 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(30, Math.log2(10)));
        q72.getDescription = (amount) => Utils.getMath(getDesc(q72.level));
        q72.getInfo = (amount) => Utils.getMathTo(getInfo(q72.level), getInfo(q72.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC71(level).toString(0);
        let getInfo = (level) => "c_1=" + getC71(level).toString(0);
        c71 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(10000, Math.log2(1.2)));
        c71.getDescription = (amount) => Utils.getMath(getDesc(c71.level));
        c71.getInfo = (amount) => Utils.getMathTo(getInfo(c71.level), getInfo(c71.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=" + getC72(level).toString(0);
        let getInfo = (level) => "c_2=" + getC72(level).toString(0);
        c72 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(10000, Math.log2(1.5)));
        c72.getDescription = (amount) => Utils.getMath(getDesc(c72.level));
        c72.getInfo = (amount) => Utils.getMathTo(getInfo(c72.level), getInfo(c72.level + amount));
    }

    ///////////////////
    // Singular Upgrade
    let lemmaCost = new CustomCost((level) =>
    {
        var cost = 1e100;

        switch(level+1)
        {
            case 1: cost = 1e10; break;
            case 2: cost = 1e8; break;
            case 3: cost = 1e20; break;
            case 4: cost = 1.0001e10; break; // To compensate for numerical errors
            case 5: cost = 1e25; break;
            case 6: cost = 1e15; break;
            case 7: cost = 1e15; break;
        }

        return BigNumber.from(cost);
    });


    lemma = theory.createSingularUpgrade(0, currency, lemmaCost);
    lemma.maxLevel = lemmaCount;
    lemma.getDescription = (_) => Localization.getUpgradeProveLemma(Math.min(lemmaCount, lemma.level + 1));
    lemma.getInfo = (_) => Localization.getUpgradeProveLemma(Math.min(lemmaCount, lemma.level + 1));
    lemma.boughtOrRefunded = (_) => { theory.invalidatePrimaryEquation(); theory.invalidateSecondaryEquation(); updateAvailability(); onLemmaChanged(); }

    updateAvailability();
    onLemmaChanged();
}

var updateAvailability = () => {
    c11.isAvailable = lemma.level == 0;
    c12.isAvailable = lemma.level == 0;
    c13.isAvailable = lemma.level == 0;

    c21.isAvailable = lemma.level == 1;
    c22.isAvailable = lemma.level == 1;
    c23.isAvailable = lemma.level == 1;
    c24.isAvailable = lemma.level == 1;

    q31.isAvailable = lemma.level == 2;
    q32.isAvailable = lemma.level == 2;
    c31.isAvailable = lemma.level == 2;
    c32.isAvailable = lemma.level == 2;
    c33.isAvailable = lemma.level == 2;

    c41.isAvailable = lemma.level == 3;
    c42.isAvailable = lemma.level == 3;
    c43.isAvailable = lemma.level == 3;

    q51.isAvailable = lemma.level == 4;
    q52.isAvailable = lemma.level == 4;
    c51.isAvailable = lemma.level == 4;
    c52.isAvailable = lemma.level == 4;
    c53.isAvailable = lemma.level == 4;
    c54.isAvailable = lemma.level == 4;
    c55.isAvailable = lemma.level == 4;
    c56.isAvailable = lemma.level == 4;
    c57.isAvailable = lemma.level == 4;
    c58.isAvailable = lemma.level == 4;

    q61.isAvailable = lemma.level == 5;
    q62.isAvailable = lemma.level == 5;
    c61.isAvailable = lemma.level == 5;
    c62.isAvailable = lemma.level == 5;
    c63.isAvailable = lemma.level == 5;
    c64.isAvailable = lemma.level == 5;

    q71.isAvailable = lemma.level == 6;
    q72.isAvailable = lemma.level == 6;
    c71.isAvailable = lemma.level == 6;
    c72.isAvailable = lemma.level == 6;
}

var onLemmaChanged = () => {
    provedLemmas = Math.max(provedLemmas, lemma.level);
    currency.value = currencyValues[lemma.level];
    theory.clearGraph();
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime); // No multiplier. Everyone is equal.
    let lemmaNumber = lemma.level + 1;
    let isLemmaStarted = qs[lemma.level] > initialQ[lemma.level];

    switch(lemmaNumber)
    {
        case 1: isLemmaStarted |= c11.level > 0; break;
        case 2: isLemmaStarted |= c21.level > 0 || c23.level > 0; break;
        case 3: isLemmaStarted |= q31.level > 0; break;
        case 4: isLemmaStarted |= c41.level > 0; break;
        case 5: isLemmaStarted |= c51.level > 0 || c52.level > 0 || c53.level > 0 || c54.level > 0 ||
                                  c55.level > 0 || c56.level > 0 || c57.level > 0 || c58.level > 0; break;
        case 6: isLemmaStarted |= c61.level > 0 || q62.level > 0; break;
        case 7: isLemmaStarted |= q71.level > 0; break;
    }

    if (isLemmaStarted)
    {
        let q1q2 = BigNumber.ONE;

        switch(lemmaNumber)
        {
            case 3: q1q2 = getQ31(q31.level) * getQ32(q32.level); break;
            case 5: q1q2 = getQ51(q51.level) * getQ52(q52.level); break;
            case 6: q1q2 = getQ61(q61.level) * getQ62(q62.level); break;
            case 7: q1q2 = getQ71(q71.level) * getQ72(q72.level); break;
        }

        let dq = q1q2 * dt;
        let qt0 = qs[lemma.level];
        let qt1 = qt0 + dq;
        let q = qt1;

        qs[lemma.level] = q;

        if (lemmaNumber == 1)
        {
            let c1 = getC11(c11.level);
            let c2 = getC12(c12.level);
            let c3 = getC13(c13.level);
            currency.value += c1 * (dt * (BigNumber.HALF * c2 + c3) + c2 * (qt0.cos() - qt1.cos()));
        }
        else if (lemmaNumber == 2)
        {
            let c1 = getC21(c21.level);
            let c2 = getC22(c22.level);
            let c3 = getC23(c23.level);
            let c4 = getC24(c24.level);
            qDifferential = (c1 * c2 + c3 * c4) / q.pow(getQ2Exp());
            currency.value += dt * qDifferential;
        }
        else if (lemmaNumber == 3)
        {
            let c1 = getC31(c31.level);
            let c2 = getC32(c32.level);
            let c3 = getC33(c33.level);
            let twoExpC1 = BigNumber.TWO.pow(c1);
            if (c31.level % 2 == 1)
                twoExpC1 = -twoExpC1;
            currency.value += dt * (twoExpC1 * c2 + c3 * (qt0 + qt1) / BigNumber.TWO);
        }
        else if (lemmaNumber == 4)
        {
            let c1 = getC41(c41.level);
            let c2 = getC42(c42.level);
            let c3 = getC43(c43.level);
            qDifferential = c1 * c2 * (c3 * q - q.square() / BigNumber.FIVE);
            currency.value += dt * qDifferential;
        }
        else if (lemmaNumber == 5)
        {
            let bc1 = BigNumber.from(c51.level).pow(BigNumber.FOUR) * (2 * 1 - c51.level);
            let bc2 = BigNumber.from(c52.level).pow(BigNumber.FOUR) * (2 * 4 - c52.level);
            let bc3 = BigNumber.from(c53.level).pow(BigNumber.FOUR) * (2 * 9 - c53.level);
            let bc4 = BigNumber.from(c54.level).pow(BigNumber.FOUR) * (2 * 16 - c54.level);
            let bc5 = BigNumber.from(c55.level).pow(BigNumber.FOUR) * (2 * 25 - c55.level);
            let bc6 = BigNumber.from(c56.level).pow(BigNumber.FOUR) * (2 * 36 - c56.level);
            let bc7 = BigNumber.from(c57.level).pow(BigNumber.FOUR) * (2 * 49 - c57.level);
            let bc8 = BigNumber.from(c58.level).pow(BigNumber.FOUR) * (2 * 64 - c58.level);
            let t1 = bc1 * q;
            let t2 = bc2 * q;
            let t3 = bc3 * q;
            let t4 = bc4 * q;
            let t5 = bc5 * q;
            let t6 = bc6 * q;
            let t7 = bc7 * q;
            let t8 = bc8 * q;
            qDifferential = (t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8);
            currency.value += dt * qDifferential;
        }
        else if (lemmaNumber == 6)
        {
            let c1 = getC61(c61.level);
            let c2 = getC62(c62.level);
            let c3 = getC63(c63.level);
            let c4 = getC64(c64.level);
            let factor = (c1 - c2) / (c3 - c4);
            currency.value += dt * factor * (qt0 + qt1) / BigNumber.TWO;
        }
        else if (lemmaNumber == 7)
        {
            let c1 = getC71(c71.level);
            let c2 = getC72(c72.level);
            let factor = BigNumber.ONE / (BigNumber.E - c1 / c2).abs();
            currency.value += dt * factor * (qt0 + qt1) / BigNumber.TWO;
        }
    }

    currencyValues[lemma.level] = currency.value;
    theory.invalidateTertiaryEquation();
}

var getInternalState = () => {
    var result = provedLemmas.toString() + " ";

    for (let i = 0; i < lemmaCount; ++i)
        result += qs[i].toString() + " " + currencyValues[i].toString() + " ";

    return result;
}

var setInternalState = (state) => {
    let values = state.split(" ");
    if (values.length > 0) provedLemmas = parseInt(values[0]);

    for (let i = 0; i < lemmaCount; ++i)
    {
        if (values.length > 2*i + 1) qs[i] = parseBigNumber(values[2*i + 1]);
        if (values.length > 2*i + 2) currencyValues[i] = parseBigNumber(values[2*i + 2]);
    }
}

var isCurrencyVisible = (index) => lemma.level < lemmaCount;
var alwaysShowRefundButtons = () => true;

var getPrimaryEquation = () => {
    theory.primaryEquationHeight = 60;
    let result = "";

    // Theorem
    result += "\\begin{eqnarray}";

    if (isRTL)
    {
        result += "&\\lim_{t \\to \\infty} f(t) = \\infty&";
        result += "\\text{";
        result += Localization.getConvergenceTestTheorem();
        result += "}";
    }
    else
    {
        result += "\\text{";
        result += Localization.getConvergenceTestTheorem();
        result += "}&\\lim_{t \\to \\infty} f(t) = \\infty&";
    }

    // Lemma
    result += "\\\\";

    if (lemma.level < lemmaCount)
    {
        result += "\\scriptstyle";

        if (!isRTL)
        {
            result += "\\text{";
            result += Localization.getConvergenceTestLemma(lemma.level + 1);
            result += "}&";
        }
        else
        {
            result += "&";
        }

        if (lemma.level == 0) result += "\\scriptstyle{\\lim\\limits_{t \\to \\infty}} b\\: >\\: 0";
        if (lemma.level == 1) result += "\\scriptstyle{\\lim\\limits_{t \\to \\infty}} dt\\: >\\: 0";
        if (lemma.level == 2) result += "\\scriptstyle{\\lim\\limits_{t \\to \\infty}} x\\: >\\: 0";
        if (lemma.level == 3) result += "\\scriptstyle{\\lim\\limits_{t \\to \\infty}} \\varphi\\: >\\: 0";
        if (lemma.level == 4) result += "\\scriptstyle{\\lim\\limits_{t \\to \\infty}} \\tau\\: >\\: 0";
        if (lemma.level == 5) result += "\\scriptstyle{\\lim\\limits_{t \\to \\infty}} e^{bx_i\\varphi\\tau dt}\\: >\\: 1";
        if (lemma.level == 6) result += "\\scriptstyle{\\lim\\limits_{t \\to \\infty}} \\frac{e^t f(e^t)}{f(t)}\\: >\\: 1";

        if (isRTL)
        {
            result += "&\\text{";
            result += Localization.getConvergenceTestLemma(lemma.level + 1);
            result += "}";
        }
    }

    result += "\\end{eqnarray}";

    return result;
}

var getSecondaryEquation = () => {
    theory.secondaryEquationHeight = 55;
    let result = "";
    let lemmaNumber = lemma.level + 1;

    if (lemmaNumber == 1)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=c_1\\left(c_2(\\sin\\left(q\\right)+\\frac{1}{2})+c_3\\right)";
        result += "\\\\";
        result += "\\dot{q}=1";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 2)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=(c_1c_2 + c_3c_4)/q^{";
        result += getQ2Exp().toString(2);
        result += "}\\\\";
        result += "\\dot{q}=1";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 3)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=(-2)^{c_1}c_2 + c_3q";
        result += "\\\\";
        result += "\\dot{q}=q_1q_2";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 4)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=c_1c_2(c_3q - q^2/5)";
        result += "\\\\";
        result += "\\dot{q}=1";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 5)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=\\sum_{i=1}^8 c_i^4(2i^2-c_i) q";
        result += "\\\\";
        result += "\\dot{q}=q_1q_2";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 6)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=q(c_1 - c_2)/(c_3 - c_4)";
        result += "\\\\";
        result += "\\dot{q}=q_1q_2";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 7)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=q/|e - c_1/c_2|";
        result += "\\\\";
        result += "\\dot{q}=q_1q_2";
        result += "\\end{matrix}";
    }

    if (lemma.level == lemmaCount)
    {
        result += "\\text{";
        result += Localization.getConvergenceTestQED();
        result += "}";
    }

    return result;
}

var getTertiaryEquation = () => {
    if (lemma.level == lemmaCount)
        return "";

    let result = "";
    
    let q = qs[lemma.level];
    result += "q=";
    result += q.toString();

    let lemmaNumber = lemma.level + 1;

    if (lemmaNumber == 2)
    {
        result += ",\\; q^{";
        var qExp = getQ2Exp();
        result += qExp.toString(2);
        result += "}=";
        result += (q.pow(qExp)).toString(2);
        result += ",\\; \\dot{\\rho}=";
        result += qDifferential.toString(2);
    }
    if (lemmaNumber == 4 || lemmaNumber == 5)
    {
        result += ",\\; \\dot{\\rho}=";
        result += qDifferential.toString(2);
    }
    if (lemmaNumber == 6)
    {
        var c3 = getC63(c63.level);
        var c4 = getC64(c64.level);
        var c3mc4 = c3 - c4;
        result += ",\\; c_3-c_4=";
        result += c3mc4.toNumber().toFixed(8);
    }
    else if (lemmaNumber == 7)
    {
        var c1 = getC71(c71.level);
        var c2 = getC72(c72.level);
        result += ",\\; c_1/c_2=";
        result += (c1/c2).toNumber().toFixed(8);
    }

    return result;
}

var getCompletion = () => Math.min(100, Math.round((100.0 * provedLemmas) / lemmaCount));
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC11 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC12 = (level) => BigNumber.TWO.pow(level);
var getC13 = (level) => BigNumber.TWO.pow(level) - BigNumber.ONE;

var getC21 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC22 = (level) => BigNumber.TWO.pow(level);
var getC23 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC24 = (level) => BigNumber.TWO.pow(level);
var getQ2Exp = () => BigNumber.from((c21.level + c22.level + c23.level + c24.level) / 100.0);

var getQ31 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getQ32 = (level) => BigNumber.TWO.pow(level);
var getC31 = (level) => BigNumber.from(level);
var getC32 = (level) => BigNumber.TWO.pow(level);
var getC33 = (level) => BigNumber.TWO.pow(level);

var getC41 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC42 = (level) => BigNumber.TWO.pow(level);
var getC43 = (level) => BigNumber.from(level + 1).square();

var getQ51 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 1);
var getQ52 = (level) => BigNumber.TWO.pow(level);
var getC5i = (level) => BigNumber.from(level);

var getQ61 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 1);
var getQ62 = (level) => BigNumber.TWO.pow(level);
var getC61 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC62 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC63 = (level) => BigNumber.from(level).pow(BigNumber.ONE / BigNumber.E);
var getC64 = (level) => BigNumber.from(level).pow(BigNumber.ONE / BigNumber.PI);

var getQ71 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getQ72 = (level) => BigNumber.TWO.pow(level);
var getC71 = (level) => BigNumber.from(level) + 1;
var getC72 = (level) => BigNumber.from(level) + 1;

var getResetStageMessage = () => Localization.get("TheoryResetConvergenceTest");
var canResetStage = () => lemma.level < lemmaCount;
var resetStage = () => {
    switch (lemma.level + 1)
    {
        case 1:
            c11.level = 0;
            c12.level = 0;
            c13.level = 0;
            break;
        case 2:
            c21.level = 0;
            c22.level = 0;
            c23.level = 0;
            c24.level = 0;
            break;
        case 3:
            q31.level = 0;
            q32.level = 0;
            c31.level = 0;
            c32.level = 0;
            c33.level = 0;
            break;
        case 4:
            c41.level = 0;
            c42.level = 0;
            c43.level = 0;
            break;
        case 5:
            q51.level = 0;
            q52.level = 0;
            c51.level = 0;
            c52.level = 0;
            c53.level = 0;
            c54.level = 0;
            c55.level = 0;
            c56.level = 0;
            c57.level = 0;
            c58.level = 0;
            break;
        case 6:
            q61.level = 0;
            q62.level = 0;
            c61.level = 0;
            c62.level = 0;
            c63.level = 2;
            c64.level = 0;
            break;
        case 7:
            q71.level = 0;
            q72.level = 0;
            c71.level = 0;
            c72.level = 0;
            break;
    }

    currency.value = BigNumber.ZERO;
    currencyValues[lemma.level] = BigNumber.ZERO;
    qs[lemma.level] = initialQ[lemma.level];
    qDifferential = BigNumber.ZERO;
    theory.clearGraph();
}

var canGoToPreviousStage = () => lemma.level > 0 && provedLemmas == lemmaCount;
var goToPreviousStage = () => lemma.level -= 1;
var canGoToNextStage = () => lemma.level < provedLemmas;
var goToNextStage = () => lemma.level += 1;

init();
