import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from pandas.tseries.offsets import MonthEnd
from config import LAG_N, SEQUENCE_LENGTH



def xgb_forecast(model, monthly_data, commodity, price_type, steps):
    """
    Generate future price forecasts using a trained XGBoost model.
    Uses lag features (lag_1, lag_2, lag_3) to predict step by step.
    """
    try:
        df_com = monthly_data[monthly_data['Commodity'] == commodity].sort_values('Date').set_index('Date')
        ts = df_com[price_type]

        if len(ts) < LAG_N + 1:
            return None, "Not enough data to generate XGBoost forecast"

        
        df_feat = pd.DataFrame({'y': ts})
        for lag in range(1, LAG_N + 1):
            df_feat[f'lag_{lag}'] = df_feat['y'].shift(lag)
        df_feat.dropna(inplace=True)

        X = df_feat.drop(columns=['y'])
        last_known = X.iloc[-1].values.copy()
        lag_cols = X.columns
        last_date = df_com.index[-1]

        future_preds = []
        future_dates = []

        for i in range(steps):
            pred_df = pd.DataFrame([last_known], columns=lag_cols)
            pred = float(model.predict(pred_df)[0])
            future_preds.append(round(pred, 2))

            
            last_known = np.roll(last_known, -1)
            last_known[-1] = pred

            future_dates.append((last_date + MonthEnd(i + 1)).strftime('%Y-%m-%d'))

        return _build_forecast_response(future_dates, future_preds), None

    except Exception as e:
        return None, str(e)



def lstm_forecast(model, monthly_data, commodity, price_type, steps):
    """
    Generate future price forecasts using a trained LSTM model.
    Rescales data using MinMaxScaler, predicts step by step.
    """
    try:
        df_com = monthly_data[monthly_data['Commodity'] == commodity].sort_values('Date').set_index('Date')
        ts = df_com[price_type].values

        if len(ts) < SEQUENCE_LENGTH:
            return None, "Not enough data to generate LSTM forecast"

        
        scaler = MinMaxScaler()
        ts_scaled = scaler.fit_transform(ts.reshape(-1, 1))

        
        last_seq = ts_scaled[-SEQUENCE_LENGTH:].copy()
        last_date = df_com.index[-1]

        future_preds = []
        future_dates = []

        for i in range(steps):
            input_seq = last_seq.reshape(1, SEQUENCE_LENGTH, 1)
            pred_scaled = model.predict(input_seq, verbose=0)[0][0]

           
            pred = float(scaler.inverse_transform([[pred_scaled]])[0][0])
            future_preds.append(round(pred, 2))

           
            last_seq = np.append(last_seq[1:], [[pred_scaled]], axis=0)

            future_dates.append((last_date + MonthEnd(i + 1)).strftime('%Y-%m-%d'))

        return _build_forecast_response(future_dates, future_preds), None

    except Exception as e:
        return None, str(e)



def sarima_forecast(model, steps):
    """
    Generate future price forecasts using a trained SARIMA model.
    SARIMA models carry their own state so we just call forecast().
    """
    try:
        forecast_values = model.forecast(steps=steps)
        last_date = model.fittedvalues.index[-1]

        future_dates = [
            (last_date + MonthEnd(i + 1)).strftime('%Y-%m-%d')
            for i in range(steps)
        ]
        future_preds = [round(float(v), 2) for v in forecast_values]

        return _build_forecast_response(future_dates, future_preds), None

    except Exception as e:
        return None, str(e)



def generate_forecast(model, model_type, monthly_data, commodity, price_type, steps):
    """
    Routes forecast request to the correct model handler.
    model_type: 'xgb', 'lstm', 'sarima'
    price_type: 'Retail' or 'Wholesale'
    steps: number of months ahead to forecast
    """
    if model_type == "xgb":
        return xgb_forecast(model, monthly_data, commodity, price_type, steps)

    elif model_type == "lstm":
        return lstm_forecast(model, monthly_data, commodity, price_type, steps)

    elif model_type == "sarima":
        return sarima_forecast(model, steps)

    else:
        return None, f"Unknown model type: {model_type}"



def _build_forecast_response(dates, prices):
    """
    Returns forecast as a list of {date, price} dicts.
    Consistent format for all model types.
    """
    return [
        {"date": date, "price": price}
        for date, price in zip(dates, prices)
    ]