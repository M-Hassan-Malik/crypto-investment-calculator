import { useState, useEffect, FC } from "react";

interface ICryptoCalculatorState {
    tokenName: string;
    currentPrice: number;
    circulatingSupply: number;
    totalSupply: number;
    marketCap: number;
    investmentAmount: number;
    upcomingUnlock: number;
    tradingFees: number;
    expectedPriceTarget: number | "";
    expectedPriceTargetTokens: number | "";
    tokensPurchased: number;
    futureValue: number;
    breakEvenPrice: number;
    newPriceAfterUnlock: number;
}

interface ICryptoCalculatorProps {
    onChange?: (data: ICryptoCalculatorState) => void; // Explicitly defining function signature
}

const CryptoCalculator: FC<ICryptoCalculatorProps> = ({ onChange }) => {
    const [tokenName, setTokenName] = useState<string>("BTC");
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [circulatingSupply, setCirculatingSupply] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<number>(0);
    const [marketCap, setMarketCap] = useState<number>(0);
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [upcomingUnlock, setUpcomingUnlock] = useState<number>(0);
    const [tradingFees, setTradingFees] = useState<number>(0.00000006);
    const [expectedPriceTarget, setExpectedPriceTarget] = useState<number | "">("");
    const [expectedPriceTargetTokens, setExpectedPriceTargetTokens] = useState<number | "">("");

    const tokensPurchased = investmentAmount / currentPrice || 0;
    const futureValue = tokensPurchased * (typeof expectedPriceTarget === "number" ? expectedPriceTarget : 0);
    const breakEvenPrice = currentPrice * (1 + 2 * tradingFees);
    const newPriceAfterUnlock = currentPrice * (1 - upcomingUnlock / 100);

    // Trigger onChange whenever any state changes
    useEffect(() => {
        if (onChange) {
            onChange({
                tokenName,
                currentPrice,
                circulatingSupply,
                totalSupply,
                marketCap,
                investmentAmount,
                upcomingUnlock,
                tradingFees,
                expectedPriceTarget,
                expectedPriceTargetTokens,
                tokensPurchased,
                futureValue,
                breakEvenPrice,
                newPriceAfterUnlock,
            });
        }
    }, [
        tokenName,
        currentPrice,
        circulatingSupply,
        totalSupply,
        marketCap,
        investmentAmount,
        upcomingUnlock,
        tradingFees,
        expectedPriceTarget,
        expectedPriceTargetTokens,
        tokensPurchased,
        futureValue,
        breakEvenPrice,
        newPriceAfterUnlock,
        onChange,
    ]);

    return (
        <div style={{ maxWidth: "800px", margin: "auto" }}>
            <h1>{tokenName}</h1>

            <label>Token Name: </label>
            <input type="text" value={tokenName} onChange={(e) => setTokenName(e.target.value)} />

            <label>Current Price ($): </label>
            <input
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(parseFloat(e.target.value) || 0)}
            />

            <label>Circulating Supply: </label>
            <input
                type="number"
                value={circulatingSupply}
                onChange={(e) => setCirculatingSupply(parseFloat(e.target.value) || 0)}
            />

            <label>Total Supply: </label>
            <input
                type="number"
                value={totalSupply}
                onChange={(e) => setTotalSupply(parseFloat(e.target.value) || 0)}
            />

            <label>Market Cap ($): </label>
            <input type="number" value={marketCap} onChange={(e) => setMarketCap(parseFloat(e.target.value) || 0)} />

            <label>Investment Amount ($): </label>
            <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(parseFloat(e.target.value) || 0)}
            />

            <label>Expected Price Target ($): </label>
            <input
                type="number"
                value={expectedPriceTarget}
                onChange={(e) => setExpectedPriceTarget(parseFloat(e.target.value) || "")}
            />

            <label>Expected Price Target (Token/Coin): </label>
            <input
                type="number"
                value={expectedPriceTargetTokens}
                onChange={(e) => setExpectedPriceTargetTokens(parseFloat(e.target.value) || "")}
            />

            <label>Upcoming Unlock (%): </label>
            <input
                type="number"
                value={upcomingUnlock}
                onChange={(e) => setUpcomingUnlock(parseFloat(e.target.value) || 0)}
            />

            <label>Trading Fees (%): </label>
            <input
                type="number"
                value={tradingFees}
                onChange={(e) => setTradingFees(parseFloat(e.target.value) || 0)}
            />
        </div>
    );
};

export default CryptoCalculator;