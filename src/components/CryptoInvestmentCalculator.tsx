import { useState, FC } from "react";

const CryptoCalculator: FC = () => {
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

    const tokensPurchased = investmentAmount / currentPrice;
    const futureValue = tokensPurchased * (typeof expectedPriceTarget === "number" ? expectedPriceTarget : 0);
    const breakEvenPrice = currentPrice * (1 + 2 * tradingFees);
    const newPriceAfterUnlock = currentPrice * (1 - upcomingUnlock / 100);

    // Format numbers with commas & 12 decimal places
    const formatNumber = (num: number) =>
        num.toLocaleString(undefined, { minimumFractionDigits: 12, maximumFractionDigits: 12 });

    // Handle Expected Price Target changes
    const handleExpectedPriceTargetChange = (value: number | "") => {
        setExpectedPriceTarget(value);
        if (value !== "") {
            setExpectedPriceTargetTokens(value / currentPrice);
        }
    };

    const handleExpectedPriceTargetTokensChange = (value: number | "") => {
        setExpectedPriceTargetTokens(value);
        if (value !== "") {
            setExpectedPriceTarget(value * currentPrice);
        }
    };

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
                onChange={(e) => handleExpectedPriceTargetChange(parseFloat(e.target.value) || "")}
            />

            <label>Expected Price Target (Token/Coin): </label>
            <input
                type="number"
                value={expectedPriceTargetTokens}
                onChange={(e) => handleExpectedPriceTargetTokensChange(parseFloat(e.target.value) || "")}
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

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "2px solid black", padding: "8px", textAlign: "left" }}>Metric</th>
                        <th style={{ borderBottom: "2px solid black", padding: "8px", textAlign: "right" }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Tokens Purchased</td>
                        <td style={{ padding: "8px", textAlign: "right" }}>{formatNumber(tokensPurchased)}</td>
                    </tr>
                    <tr>
                        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Future Value ($)</td>
                        <td style={{ padding: "8px", textAlign: "right" }}>
                            {expectedPriceTarget ? formatNumber(futureValue) : "N/A"}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                            Break-even Price ($){" "}
                            <abbr
                                title={
                                    Math.abs(breakEvenPrice - currentPrice) < 0.01
                                        ? `Break-even is almost equal to the current price due to low trading fees.`
                                        : `Break-even price includes trading fees for buying & selling. 
        Difference from current price: $${(breakEvenPrice - currentPrice).toFixed(12)} USDT`
                                }>
                                ℹ
                            </abbr>
                        </td>
                        <td style={{ padding: "8px", textAlign: "right" }}>{formatNumber(breakEvenPrice)}</td>
                    </tr>
                    <tr>
                        <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>New Price After Unlock ($)</td>
                        <td style={{ padding: "8px", textAlign: "right" }}>{formatNumber(newPriceAfterUnlock)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CryptoCalculator;