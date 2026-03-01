import os
import joblib
from tensorflow.keras.models import load_model
from config import MODEL_PATHS, MODEL_SUFFIXES



def safe_name(com):
    return com.replace(" ", "_").replace("/", "_")


def load_all_models(commodities):
    """
    Loads all saved models for every commodity.
    Returns a nested dict: models[model_key][commodity] = model
    """
    models = {key: {} for key in MODEL_PATHS.keys()}

    for key, folder in MODEL_PATHS.items():
        if not os.path.exists(folder):
            print(f"Warning: Folder not found — {folder}")
            continue

        suffix = MODEL_SUFFIXES[key]
        is_keras = suffix.endswith(".keras")

        for com in commodities:
            fname = f"{safe_name(com)}{suffix}"
            fpath = os.path.join(folder, fname)

            if not os.path.exists(fpath):
                continue

            try:
                if is_keras:
                    models[key][com] = load_model(fpath)
                else:
                    models[key][com] = joblib.load(fpath)
                print(f"Loaded [{key}] → {com}")
            except Exception as e:
                print(f"Failed to load [{key}] → {com}: {e}")

    return models


def get_model(models, model_type, price_type, commodity):
    """
    Retrieve a model from the loaded models dict.
    model_type: 'xgb', 'lstm', 'sarima'
    price_type: 'Retail' or 'Wholesale'
    """
    key = f"{model_type}_{price_type.lower()}"

    if key not in models:
        return None, f"Unknown model type: {key}"

    if commodity not in models[key]:
        return None, f"No {key} model found for '{commodity}'"

    return models[key][commodity], None



def get_model_availability(models, commodities):
    """
    Returns a dict showing which model types are available per commodity.
    Useful for the frontend to know what options to show.
    """
    availability = {}

    for com in commodities:
        availability[com] = {
            "xgb_retail":       com in models.get("xgb_retail", {}),
            "xgb_wholesale":    com in models.get("xgb_wholesale", {}),
            "lstm_retail":      com in models.get("lstm_retail", {}),
            "lstm_wholesale":   com in models.get("lstm_wholesale", {}),
            "sarima_retail":    com in models.get("sarima_retail", {}),
            "sarima_wholesale": com in models.get("sarima_wholesale", {}),
        }

    return availability