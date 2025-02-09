# Crypto Investment Calculator

This component is a **Crypto Investment Calculator** that helps users estimate their potential returns, break-even price, liquidity status, and new token price after unlocks based on their investment amount and market data.

## Installation

You can install the Crypto Investment Calculator component via npm:

```bash
npm install crypto-investment-calculator
```

## Usage

To use the Crypto Investment Calculator component in your React application, import it as follows:

```javascript
import React from 'react';
import CryptoCalculator from 'crypto-investment-calculator';

const App = () => {
  return (
    <div>
      <CryptoCalculator />
    </div>
  );
};

export default App;
```

## Features

- Calculate potential future value of an investment
- Estimate break-even price after trading fees
- Determine price impact of token unlocks
- Check liquidity status with Volume/MarketCap ratio
- Interactive inputs with explanatory tooltips
- Displays results with up to 12 decimal places
- Two-way binding between "Future Token/Coin Value ($)" and "Future Dollar Value ($)"

## Props

### `CryptoCalculator`

This component does not require any props; all inputs are handled within the component itself.

## Development

To contribute to the development of this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/M-Hassan-Malik/crypto-investment-calculator
cd crypto-investment-calculator
npm install
```

You can then start the development server:

```bash
npm start
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Muhammad Hassan Sohail

### Contact Information

- **npm Repository**: [npm Profile](https://www.npmjs.com/~hassan-sohail)
- **GitHub**: [crypto-investment-calculator](https://github.com/M-Hassan-Malik/crypto-investment-calculator)
- **LinkedIn Profile**: [Muhammad Hassan Sohail](https://www.linkedin.com/in/muhammad-hassan-sohail/)
- **Portfolio Website**: [www.muhammadhassansohail.com](https://codehassan.vercel.app/)