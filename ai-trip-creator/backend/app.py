from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper.accommodation_scraper import get_accommodation_details

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/search', methods=['GET'])
def search():
    location = request.args.get('query')
    if not location:
        return jsonify({"error": "No location provided"}), 400

    try:
        accommodations = get_accommodation_details(location)
        return jsonify({"results": accommodations})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
