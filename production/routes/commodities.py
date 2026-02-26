from flask import Blueprint, jsonify, request
from predict.data import get_commodities, get_markets, get_counties
from predict.saved_models import get_model_availability

commodities_bp = Blueprint('commodities', __name__)

data = None
models = None


def init(app_data, app_models):
    global data, models
    data = app_data
    models = app_models


@commodities_bp.route('/api/commodities', methods=['GET'])
def list_commodities():
    commodities = get_commodities(data)
    return jsonify({
        "status": "success",
        "data": commodities
    })


@commodities_bp.route('/api/markets', methods=['GET'])
def list_markets():
    county = request.args.get('county', None)

    if county:
        filtered = data[data['County'] == county]
        markets = sorted(filtered['Market'].unique().tolist())
    else:
        markets = get_markets(data)

    return jsonify({
        "status": "success",
        "data": markets
    })


@commodities_bp.route('/api/counties', methods=['GET'])
def list_counties():
    counties = get_counties(data)
    return jsonify({
        "status": "success",
        "data": counties
    })


@commodities_bp.route('/api/availability', methods=['GET'])
def model_availability():
    commodities = get_commodities(data)
    availability = get_model_availability(models, commodities)
    return jsonify({
        "status": "success",
        "data": availability
    })