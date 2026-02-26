import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://agricultural-commodity-price-forecasting.onrender.com';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});



export const getCommodities = async () => {
    const res = await api.get('/api/commodities');
    return res.data.data;
};

export const getMarkets = async () => {
    const res = await api.get('/api/markets');
    return res.data.data;
};

export const getCounties = async () => {
    const res = await api.get('/api/counties');
    return res.data.data;
};

export const getModelAvailability = async () => {
    const res = await api.get('/api/availability');
    return res.data.data;
};



export const getHistoricalPrices = async ({ commodity, priceType = 'Retail', county = null, market = null }) => {
    const params = { commodity, price_type: priceType };
    if (county) params.county = county;
    if (market) params.market = market;

    const res = await api.get('/api/historical', { params });
    return res.data;
};



export const getForecast = async ({ commodity, modelType, priceType = 'Retail', steps = 6 }) => {
    const params = {
        commodity,
        model_type: modelType,
        price_type: priceType,
        steps,
    };

    const res = await api.get('/api/forecast', { params });
    return res.data;
};