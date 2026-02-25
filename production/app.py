from flask import Flask, jsonify
from flask_cors import CORS

from config import DEBUG, HOST, PORT
from predict.data import load_data, get_monthly_data, get_commodities
from predict.saved_models import load_all_models


from routes import commodities as commodities_route
from routes import history as historical_route
from routes import forecast as forecast_route


app = Flask(__name__)
CORS(app)



print("Loading data...")
data = load_data()
monthly_data = get_monthly_data(data)
commodities = get_commodities(data)
print(f"Data loaded — {len(data)} rows, {len(commodities)} commodities")

print("Loading models...")
models = load_all_models(commodities)
print("Models loaded!")



commodities_route.init(data, models)
historical_route.init(data)
forecast_route.init(models, monthly_data)



app.register_blueprint(commodities_route.commodities_bp)
app.register_blueprint(historical_route.historical_bp)
app.register_blueprint(forecast_route.forecast_bp)



@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "message": "Agricultural Forecasting API is running",
        "commodities": len(commodities),
        "models_loaded": {
            key: len(val) for key, val in models.items()
        }
    })


if __name__ == '__main__':
    app.run(debug=DEBUG, host=HOST, port=PORT)