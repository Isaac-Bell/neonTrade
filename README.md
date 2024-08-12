# 🚀 NeonTrade

🌟 **A Full-Stack Trading App with Deriv API Integration**

Welcome to the neonTrade project! This is a collaborative effort to build an advanced trading bot for the Deriv platform. The bot leverages a Martingale strategy and aims to evolve with features like machine learning and copy trading. 

## 🚀 Project Overview

**neonTrade Bot* is designed to trade binary options on Deriv.com using WebSocket API for real-time data and trade execution. Our goal is to create a robust trading bot that can trade 24/7, analyze market trends, and optimize trading strategies to maximize profits while minimizing risks.

### 🛠 Features

- **Real-Time Market Data**: Fetch and display real-time market data using WebSockets.
- **Martingale Strategy**: Implement a Martingale strategy for trading.
- **Account Balance Management**: Monitor and manage account balance dynamically.
- **Trade History**: Keep track of all trades and their outcomes.
- **User-Friendly Interface**: A clean and intuitive interface for managing trades.

### 🌈 Stretch Features

- **Copy Trading**: Allow users to copy trades from successful traders.
- **Machine Learning**: Integrate machine learning to optimize trading strategies based on historical data.
- **Advanced Analytics**: Provide detailed analytics and visualizations for market trends and trade performance.
- **Strategy Library**: Include an intuitive and robust library of different trading strategies based on technical analysis, such as:

  - **Moving Average Crossover**: Uses two moving averages (one short-term and one long-term) to identify buy and sell signals.
  - **Relative Strength Index (RSI)**: Measures the speed and change of price movements to identify overbought or oversold conditions.
  - **Bollinger Bands**: Uses a moving average and two standard deviations to create upper and lower bands, indicating volatility and potential reversal points.
  - **MACD (Moving Average Convergence Divergence)**: Combines moving averages to show changes in strength, direction, momentum, and duration of a trend.
  - **Fibonacci Retracement**: Uses horizontal lines to indicate areas of support or resistance at the key Fibonacci levels before the price continues in the original direction.
 
  - ### 📊 Trading Strategies Library

Our neonTrade Bot aims to include an intuitive and robust library of various trading strategies based on well-known technical analysis techniques. This library will allow users to select, customize, and deploy strategies that best fit their trading goals. Here are some of the strategies we plan to implement:

- **Moving Average Crossover**: A strategy that involves tracking two moving averages of different lengths (e.g., 50-day and 200-day). When the shorter moving average crosses above the longer one, it signals a potential buy, and vice versa for a sell signal.

- **RSI (Relative Strength Index)**: This momentum oscillator measures the speed and change of price movements. It ranges from 0 to 100 and is used to identify overbought or oversold conditions in a market.

- **Bollinger Bands**: A strategy that uses a volatility indicator consisting of a middle band (a simple moving average) and two outer bands (standard deviations). It helps traders identify potential overbought and oversold conditions based on price movements relative to the bands.

- **MACD (Moving Average Convergence Divergence)**: This strategy involves tracking the difference between two moving averages (typically the 12-day and 26-day EMA) and a signal line (9-day EMA). It helps traders identify potential buy and sell signals based on crossovers and divergences.

- **Fibonacci Retracement**: A technique that uses horizontal lines to indicate areas of support or resistance at the key Fibonacci levels before the price continues in the original direction. It's used to identify potential reversal levels.

- **Ichimoku Cloud**: A comprehensive indicator that defines support and resistance, identifies trend direction, gauges momentum, and provides trading signals. The cloud component identifies likely support and resistance levels.

- **Trend Following**: A strategy that seeks to capitalize on the continuation of existing market trends by identifying and following trends in the market, either upward or downward.

- **Breakout Strategy**: This strategy aims to enter the market when the price breaks out of a defined range or level of resistance/support. Breakouts are often followed by significant price movements, offering potential for profits.

- **Scalping**: A high-frequency trading strategy that involves making dozens or hundreds of trades within a day to "scalp" a small profit from each.

These strategies will be integrated into the neonTrade Bot to provide a wide array of trading techniques, allowing users to tailor their trading approach to their individual preferences and market conditions.


## 🏗️ Project Structure

Here's a brief overview of the project structure:

## ✨ Features

- 🧩 **Deriv API Integration**: Utilizes the Deriv API for real-time market data and trading functionality.
- 🌐 **Three.js Visuals**: Stunning three-dimensional visuals to enhance the trading experience.
- 🤖 **Selection of Trading Bots**: Choose from different automation scripts or build your own.
- 🔒 **User Authentication**: Secure login and authentication using Auth0.
- 📱 **Responsive Design**: Mobile-friendly and desktop-ready interface.

## 🛠️ Technologies Used

- **Frontend**: React, Three.js, Vite
- **Backend**: Node.js, Express, Deriv API
- **Database**: SQLite
- **Authentication**: Auth0


## 🔧 Getting Started

### Prerequisites

- Node.js and npm installed.
- An account on Deriv.com with API access.
- Your unique `app_id` and `token` from Deriv.com.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/neonTrade.git
   cd neonTrade

Install dependencies:

```
bash
Copy code
npm install
```

Start the development server:
```
bash
Copy code
npm start
```

##  🛡️ Branching and Merging
We follow the Gitflow workflow. Here’s a quick guide:

Main branch: The stable version of the project.
Develop branch: The active development branch.
Feature branches: For new features. Naming convention: feature/feature-name.
Bugfix branches: For bug fixes. Naming convention: bugfix/bugfix-name.
Release branches: For preparing new releases. Naming convention: release/release-version.

```
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```
Merging a Feature Branch
Push your feature branch to the repository:
```
git push origin feature/your-feature-name
```
Create a pull request from your feature branch to develop.

After review, merge the pull request.

##  🤝 Contributing
We welcome contributions from everyone. To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -m 'Add your message here').
Push to the branch (git push origin feature/your-feature-name).
Create a new pull request.


##  📚 Documentation
For more details on the Deriv API, visit the Deriv API Documentation.


##  📧 Contact
For any questions, feel free to reach out to me:

Name: Shabbaa (neonTactical)
Email: isaacmosesbell@gmail.com
Discord: .shabbaa

👨‍💻 About Me
I'm Shabbaa, also known as neonTactical. I'm passionate about technology and trading. I recently graduated from Dev Academy Aotearoa, where I honed my skills in full-stack development, particularly with JavaScript, React, and Node.js. I'm excited to collaborate and create innovative solutions in the tech and trading space.
