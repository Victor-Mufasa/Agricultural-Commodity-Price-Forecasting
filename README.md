🌾 Agricultural Commodity Price Forecasting
Utabiri Agro — AI-powered market intelligence and price forecasting for Kenya's agricultural commodities. Built to empower farmers, traders, policymakers, and the everyday mwananchi with data-driven decisions.
🔗 Live Demo: agricultural-commodity-price-foreca.vercel.app
📁 Original Repo: Victor-Mufasa/Agricultural-Commodity-Price-Forecasting

📌 Table of Contents

Overview
Problem Statement
Goals & Target Users
Project Structure
Dataset
Methodology
Models Used
Frontend Application
Getting Started
Contributors


Overview
Agricultural commodity prices in Kenya are highly volatile, influenced by seasonal cycles, rainfall patterns, supply chain disruptions, and market forces. Without reliable price information, farmers sell at a loss, traders take on unnecessary risk, and policymakers struggle to make timely interventions.
Utabiri Agro addresses this gap by building a full-stack machine learning forecasting system that:

Analyzes historical price data across 19 commodities, 100+ markets, and 30 counties in Kenya
Trains and compares 3 AI models (SARIMA, LSTM, and XGBoost) to find the best forecasting approach per commodity
Serves forecasts through a clean, interactive web dashboard accessible to any user


Problem Statement
Kenya's agricultural sector suffers from significant information asymmetry. Price data is often unavailable, delayed, or inaccessible to those who need it most — smallholder farmers. This leads to poor timing of sales, exploitation by middlemen, and food insecurity. There is a critical need for tools that can translate raw historical price data into accurate, accessible forward-looking price forecasts.

Goals & Target Users
Goals:

Forecast retail prices for key Kenyan agricultural commodities
Compare the performance of statistical, machine learning, and deep learning models
Deploy a user-friendly interface that makes forecasts accessible without technical knowledge

Target Users:
UserBenefitFarmersKnow the best time to sell their produceTraders & AggregatorsAnticipate price movements and plan procurementPolicymakersDetect emerging price shocks and plan interventionsCommon MwananchiUnderstand expected food costs and budget accordingly

📁 Project Structure
Agricultural-Commodity-Price-Forecasting/
│
├── data/
│   └── Products/           # Individual CSV files per commodity with historical price data
│
├── notebook/               # Jupyter notebooks covering EDA, feature engineering, and modelling
│
├── production/             # Production-ready inference scripts and API layer
│
├── saved_models/           # Pre-trained and serialised SARIMA, LSTM, and XGBoost models
│
├── scripts/                # Data preprocessing, cleaning, and utility scripts
│
├── frontend/               # JavaScript/React frontend — the Utabiri Agro dashboard
│
├── combined.csv            # Consolidated dataset merging all product CSVs
├── index.ipynb             # Main analysis and modelling notebook
├── presentation.pdf        # Project slide deck and results presentation
├── runtime.txt             # Python runtime version specification
└── .gitignore

📊 Dataset
The dataset contains historical retail prices collected across Kenyan markets and compiled from sources tracking commodity prices at the county and market level.
Coverage:

19 commodities tracked, including:

Staple grains: Dry Maize, Maize Flour, Wheat, Rice
Vegetables: Cabbages, Dry Onions, Kales/Sukuma Wiki, Spinach
Legumes: Beans (Yellow-Green), Cowpeas
Proteins: Meat Beef
Others: Banana (Cooking), and more


100+ markets across Kenya
30 counties represented
Data is structured as time series with price observations over multiple years

Individual commodity files live under data/Products/, while combined.csv provides a single merged dataset used for modelling.

🔬 Methodology
1. Exploratory Data Analysis (EDA)
Before modelling, thorough EDA was performed in index.ipynb and the notebook/ folder:

Visualisation of price trends over time per commodity and market
Identification of seasonality, cyclic patterns, and anomalies
Stationarity testing (ADF test) to determine differencing requirements for time series models
Missing value analysis and forward/backward filling strategies
Feature engineering: lag features, rolling means, month/season encodings for ML models

2. Preprocessing

Price series were normalised and scaled where required (particularly for LSTM)
For SARIMA: series were differenced to achieve stationarity
For XGBoost/LSTM: time series were transformed into supervised learning format using sliding window techniques

3. Model Training & Evaluation
All three models were trained and validated on historical data splits, with evaluation using standard regression metrics:

RMSE (Root Mean Squared Error)
MAE (Mean Absolute Error)
MAPE (Mean Absolute Percentage Error)

Pre-trained models are saved in saved_models/ for rapid inference without retraining.

🤖 Models Used
1. SARIMA — Seasonal AutoRegressive Integrated Moving Average
SARIMA is a classical statistical time series model that extends ARIMA by explicitly modelling seasonality. It is defined by parameters (p, d, q)(P, D, Q, s) where:

p, d, q — non-seasonal AR order, differencing, and MA order
P, D, Q — seasonal equivalents
s — seasonal period (e.g., 12 for monthly data)

Why SARIMA? Agricultural prices exhibit strong seasonal patterns tied to harvest cycles and weather. SARIMA is highly interpretable and performs well when seasonality is the dominant signal. It requires minimal data and is fast to train.
Limitations: Assumes linearity, so it can struggle with abrupt, non-linear price shocks.

2. LSTM — Long Short-Term Memory Network
LSTM is a type of Recurrent Neural Network (RNN) specifically designed to learn long-range temporal dependencies. It uses a gating mechanism (input gate, forget gate, output gate) to selectively remember or discard historical information across time steps.
Why LSTM? Price time series contain complex, non-linear patterns that SARIMA cannot fully capture. LSTM can model these relationships over long sequences without suffering from the vanishing gradient problem common in standard RNNs.
Architecture used: Sequential LSTM layers with dropout regularisation, trained using the Adam optimiser and MSE loss.
Limitations: Requires more data, longer training time, and careful tuning of hyperparameters (window size, units, learning rate).

3. XGBoost — Extreme Gradient Boosting
XGBoost is an ensemble model that builds decision trees sequentially, with each tree correcting the errors of the previous one. It includes built-in regularisation (L1/L2) to prevent overfitting and handles missing values natively.
Why XGBoost? Once the time series is converted into a supervised format using lag features and rolling statistics, XGBoost treats it as a standard tabular regression problem. It is fast, interpretable via feature importance, and highly competitive in accuracy.
Features engineered: Lag prices (t-1 to t-n), rolling means, rolling standard deviations, month, season, and market-level encodings.
Limitations: Does not inherently understand temporal ordering — relies entirely on engineered features to capture time structure.

Model Comparison Summary
ModelTypeCaptures SeasonalityHandles Non-linearityTraining SpeedInterpretabilitySARIMAStatistical✅ Explicitly❌ Limited⚡ Fast✅ HighLSTMDeep Learning✅ Implicitly✅ Strong🐢 Slow❌ LowXGBoostGradient Boosting✅ Via features✅ Strong⚡ Fast✅ Medium

🌐 Frontend Application — Utabiri Agro
The frontend is a JavaScript/React application deployed on Vercel and serves as the user-facing forecasting dashboard.
Pages

Home (/) — Landing page with project summary, tracked commodity cards, and entry points to the forecast tool
Forecast (/forecast) — Main interactive tool where users select a commodity and market to view historical price trends and AI-generated forecasts
About/Review (/review) — Project background, methodology overview, and team information

Key Features

Browse and select from 19 tracked commodities
Filter by market and county across Kenya
View historical price charts alongside forecasted future prices
Powered by 3 AI models running in the production backend
Fully responsive — accessible on mobile for farmers in the field


🚀 Getting Started
Prerequisites

Python 3.x (see runtime.txt for the exact version)
Jupyter Notebook or JupyterLab
Node.js and npm (for the frontend)

Backend / Notebooks
bash# 1. Clone the repository
git clone https://github.com/Graham-49/Agricultural-Commodity-Price-Forecasting.git
cd Agricultural-Commodity-Price-Forecasting

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Open the main notebook
jupyter notebook index.ipynb
Frontend
bash# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
The app will be available at http://localhost:3000 (or as specified in your terminal).
Using Pre-trained Models
Pre-trained models are saved in saved_models/. To run inference without retraining, load the appropriate model file from within the production/ scripts.

👥 Contributors
This project was developed as a collaborative data science project by:
NameRoleVictor KipkemboiProject lead, modellingBeauttah AkelloData analysis & EDAMaureen KitonyiFeature engineering & preprocessingJose BarasaModel development & evaluationCharity KanyuaFrontend developmentSharon GichiraDocumentation & presentation

📄 License
This project is open source. You are welcome to fork, adapt, and build on it — especially for agricultural or food security applications across East Africa.

"Empowering every farmer, trader, and mwananchi with the information they need to thrive."
