import { useState, useEffect, FC } from "react";

// Define the interface for state variables
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

// Define the interface for props
interface ICryptoCalculatorProps {
    onChange: (data: ICryptoCalculatorState) => void;
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

    const tokensPurchased = currentPrice ? investmentAmount / currentPrice : 0;
    const futureValue = tokensPurchased * (typeof expectedPriceTarget === "number" ? expectedPriceTarget : 0);
    const breakEvenPrice = currentPrice * (1 + 2 * tradingFees);
    const newPriceAfterUnlock = currentPrice * (1 - upcomingUnlock / 100);

    // Synchronize Expected Price Target ($) with Expected Price Target (Token/Coin)
    const handlePriceTargetChange = (value: number | "") => {
        setExpectedPriceTarget(value);
        if (typeof value === "number" && currentPrice > 0) {
            setExpectedPriceTargetTokens(value / currentPrice);
        } else {
            setExpectedPriceTargetTokens("");
        }
    };

    // Synchronize Expected Price Target (Token/Coin) with Expected Price Target ($)
    const handlePriceTargetTokensChange = (value: number | "") => {
        setExpectedPriceTargetTokens(value);
        if (typeof value === "number" && currentPrice > 0) {
            setExpectedPriceTarget(value * currentPrice);
        } else {
            setExpectedPriceTarget("");
        }
    };

    // Format numbers with commas & 12 decimal places
    const formatNumber = (num: number) =>
        num.toLocaleString(undefined, { minimumFractionDigits: 12, maximumFractionDigits: 12 });

    // Trigger onChange whenever any state changes
    useEffect(() => {
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
            newPriceAfterUnlock
        });
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
        onChange
    ]);

    const FormContainer = () => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", width: "500px" }}>
            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Token Name: </label>
                <input type="text" value={tokenName} onChange={(e) => setTokenName(e.target.value.toUpperCase())} />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Current Price ($): </label>
                <input
                    type="number"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(parseFloat(e.target.value) || 0)}
                />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Circulating Supply: </label>
                <input
                    type="number"
                    value={circulatingSupply}
                    onChange={(e) => setCirculatingSupply(parseFloat(e.target.value) || 0)}
                />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Total Supply: </label>
                <input
                    type="number"
                    value={totalSupply}
                    onChange={(e) => setTotalSupply(parseFloat(e.target.value) || 0)}
                />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Market Cap ($): </label>
                <input
                    type="number"
                    value={marketCap}
                    onChange={(e) => setMarketCap(parseFloat(e.target.value) || 0)}
                />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Investment Amount ($): </label>
                <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(parseFloat(e.target.value) || 0)}
                />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Expected Price Target in (Dollars): </label>
                <input
                    type="number"
                    value={expectedPriceTarget}
                    onChange={(e) => handlePriceTargetChange(parseFloat(e.target.value) || "")}
                />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Expected Price Target in (Token/Coin): </label>
                <input
                    type="number"
                    value={expectedPriceTargetTokens}
                    onChange={(e) => handlePriceTargetTokensChange(parseFloat(e.target.value) || "")}
                />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Upcoming Unlock (%): </label>
                <input
                    type="number"
                    value={upcomingUnlock}
                    onChange={(e) => setUpcomingUnlock(parseFloat(e.target.value) || 0)}
                />
            </div>

            <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                <label>Trading Fees (%): </label>
                <input
                    type="number"
                    value={tradingFees}
                    onChange={(e) => setTradingFees(parseFloat(e.target.value) || 0)}
                />
            </div>
        </div>
    );

    const TableContainer = () => (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
                <tr>
                    <th style={{ borderBottom: "2px solid black", padding: "8px", textAlign: "left" }}>Metric</th>
                    <th style={{ borderBottom: "2px solid black", padding: "8px", textAlign: "right" }}>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Current Price ($)</td>
                    <td style={{ padding: "8px", textAlign: "right", fontWeight: "bolder" }}>
                        {formatNumber(currentPrice)}
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Tokens Purchased</td>
                    <td style={{ padding: "8px", textAlign: "right", fontWeight: "bolder" }}>
                        {formatNumber(tokensPurchased)}
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Future Value ($)</td>
                    <td style={{ padding: "8px", textAlign: "right", fontWeight: "bolder" }}>
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
                        Difference from current price: $${(breakEvenPrice - currentPrice).toFixed(12)}`
                            }>
                            ℹ
                        </abbr>
                    </td>
                    <td style={{ padding: "8px", textAlign: "right", fontWeight: "bolder" }}>
                        {formatNumber(breakEvenPrice)}
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>New Price After Unlock ($)</td>
                    <td style={{ padding: "8px", textAlign: "right", fontWeight: "bolder" }}>
                        {formatNumber(newPriceAfterUnlock)}
                    </td>
                </tr>
            </tbody>
        </table>
    );

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
            <h1>Calculating "{tokenName}"</h1>
            {FormContainer()}
            {TableContainer()}
        </div>
    );
};

export default CryptoCalculator;
