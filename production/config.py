import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


DATA_PATH = os.path.join(BASE_DIR, "..", "combined.csv")


MODEL_BASE = os.path.join(BASE_DIR, "..", "saved_models")

MODEL_PATHS = {
    "xgb_retail":        os.path.join(MODEL_BASE, "xgb"),
    "xgb_wholesale":     os.path.join(MODEL_BASE, "xgb_wholesale"),
    "lstm_retail":       os.path.join(MODEL_BASE, "lstm"),
    "lstm_wholesale":    os.path.join(MODEL_BASE, "lstm_wholesale"),
    "sarima_retail":     os.path.join(MODEL_BASE, "sarima"),
    "sarima_wholesale":  os.path.join(MODEL_BASE, "sarima_wholesale"),
}


MODEL_SUFFIXES = {
    "xgb_retail":        "_xgb.pkl",
    "xgb_wholesale":     "_xgb_wholesale.pkl",
    "lstm_retail":       "_lstm.keras",
    "lstm_wholesale":    "_lstm_wholesale.keras",
    "sarima_retail":     "_sarima.pkl",
    "sarima_wholesale":  "_sarima_wholesale.pkl",
}


LAG_N = 3             
SEQUENCE_LENGTH = 3   


DEBUG = True
HOST = "0.0.0.0"
PORT = 5000