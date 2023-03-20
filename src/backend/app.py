from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the model
model = pickle.load(open('gbr.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get the data from the POST request.
        data = request.get_json(silent=True)
        if not data:
            return jsonify({'error': 'Invalid request format'})

        # Make prediction using the model.
        prediction = model.predict([[int(data['bedrooms']), float(data['bathrooms']), float(data['sqft_living']), float(data['sqft_lot']), float(data['floors']), int(data['condition']),float(data['sqft_basement']), int(data['yr_built']), int(data['yr_renovated']), float(data['lat']), float(data['long'])]])[0]

        # Convert the prediction to a string and return it.
        output = {'prediction': str(prediction)}
        return jsonify(output)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
