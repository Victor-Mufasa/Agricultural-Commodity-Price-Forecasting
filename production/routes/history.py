from flask import Blueprint, jsonify, request
from predict.data import get_historical_prices

historical_bp = Blueprint('historical', __name__)



data = None


def init(app_data):
    global data
    data = app_data



@historical_bp.route('/api/historical', methods=['GET'])
def historical_prices():
    commodity = request.args.get('commodity')
    price_type = request.args.get('price_type', 'Retail')
    county = request.args.get('county', None)
    market = request.args.get('market', None)

    
    if not commodity:
        return jsonify({
            "status": "error",
            "message": "commodity parameter is required"
        }), 400

    if price_type not in ["Retail", "Wholesale"]:
        return jsonify({
            "status": "error",
            "message": "price_type must be 'Retail' or 'Wholesale'"
        }), 400

    prices = get_historical_prices(data, commodity, price_type, county, market)

    if not prices:
        return jsonify({
            "status": "error",
            "message": f"No historical data found for '{commodity}'"
        }), 404

    return jsonify({
        "status": "success",
        "commodity": commodity,
        "price_type": price_type,
        "county": county,
        "market": market,
        "count": len(prices),
        "data": prices
    })