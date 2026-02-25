import pandas as pd
import numpy as np
from config import DATA_PATH



def load_data():
    data = pd.read_csv(DATA_PATH)

    
    data.drop_duplicates(inplace=True)
    data.reset_index(drop=True, inplace=True)

   
    data = data.drop(columns=["Classification", "Grade", "Sex"], errors='ignore')

    
    data['County'] = data.groupby('Market')['County'].transform(
        lambda x: x.fillna(x.mode()[0] if not x.mode().empty else "Unknown")
    )

   
    def clean_price(series):
        return pd.to_numeric(
            series.astype(str).str.replace('[^0-9.]', '', regex=True),
            errors='coerce'
        )

    data["Wholesale"] = clean_price(data["Wholesale"]).fillna(0)
    data["Retail"] = clean_price(data["Retail"]).fillna(0)

   
    data["Date"] = pd.to_datetime(data["Date"])

    data = data[data['Wholesale'] > 0].copy()

    
    data = data.sort_values(['Commodity', 'Date'])
    data['Retail'] = data.groupby(['Market', 'Commodity'])['Retail'].transform(
        lambda x: x.interpolate(method='linear')
    )
    data['Wholesale'] = data.groupby(['Market', 'Commodity'])['Wholesale'].transform(
        lambda x: x.interpolate(method='linear')
    )

    return data


def get_monthly_data(data):
    """Aggregate data to monthly frequency — used for modelling and forecasting."""
    monthly = data.groupby(
        ['Commodity', pd.Grouper(key='Date', freq='MS')]
    )[['Retail', 'Wholesale']].mean().reset_index()
    return monthly


def get_commodities(data):
    """Return sorted list of all unique commodities."""
    return sorted(data['Commodity'].unique().tolist())


def get_markets(data):
    """Return sorted list of all unique markets."""
    return sorted(data['Market'].unique().tolist())


def get_counties(data):
    """Return sorted list of all unique counties."""
    return sorted(data['County'].unique().tolist())


def get_historical_prices(data, commodity, price_type="Retail", county=None, market=None):
    """
    Return historical monthly average prices for a given commodity.
    Optionally filter by county or market.
    price_type: 'Retail' or 'Wholesale'
    """
    df = data[data['Commodity'] == commodity].copy()

    if county:
        df = df[df['County'] == county]
    if market:
        df = df[df['Market'] == market]

    if df.empty:
        return []

   
    monthly = df.groupby(pd.Grouper(key='Date', freq='MS'))[price_type].mean().reset_index()
    monthly = monthly.dropna()
    monthly['Date'] = monthly['Date'].dt.strftime('%Y-%m-%d')

    return monthly.rename(columns={price_type: 'price', 'Date': 'date'}).to_dict(orient='records')