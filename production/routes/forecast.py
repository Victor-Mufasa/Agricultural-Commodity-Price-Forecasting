from flask import Blueprint, jsonify, request
from predict.saved_models import get_model
from predict.forecast import generate_forecast

forecast_bp = Blueprint('forecast', __name__)


models = None
monthly_data = None


def init(app_models, app_monthly_data):
    global models, monthly_data
    models = app_models
    monthly_data = app_monthly_data



@forecast_bp.route('/api/forecast', methods=['GET'])
def forecast():
    commodity  = request.args.get('commodity')
    model_type = request.args.get('model_type')
    price_type = request.args.get('price_type', 'Retail')
    steps      = request.args.get('steps', 6)

    if not commodity:
        return jsonify({
            "status": "error",
            "message": "commodity parameter is required"
        }), 400

    if not model_type:
        return jsonify({
            "status": "error",
            "message": "model_type parameter is required — choose from: xgb, lstm, sarima"
        }), 400

    if model_type not in ["xgb", "lstm", "sarima"]:
        return jsonify({
            "status": "error",
            "message": "model_type must be one of: xgb, lstm, sarima"
        }), 400

    if price_type not in ["Retail", "Wholesale"]:
        return jsonify({
            "status": "error",
            "message": "price_type must be 'Retail' or 'Wholesale'"
        }), 400

   
    try:
        steps = int(steps)
        if steps < 1 or steps > 24:
            return jsonify({
                "status": "error",
                "message": "steps must be between 1 and 24"
            }), 400
    except ValueError:
        return jsonify({
            "status": "error",
            "message": "steps must be a valid integer"
        }), 400

    
    model, error = get_model(models, model_type, price_type, commodity)
    if error:
        return jsonify({
            "status": "error",
            "message": error
        }), 404

    
    forecast_data, error = generate_forecast(
        model=model,
        model_type=model_type,
        monthly_data=monthly_data,
        commodity=commodity,
        price_type=price_type,
        steps=steps
    )

    if error:
        return jsonify({
            "status": "error",
            "message": error
        }), 500

    return jsonify({
        "status": "success",
        "commodity": commodity,
        "model_type": model_type,
        "price_type": price_type,
        "steps": steps,
        "data": forecast_data
    })