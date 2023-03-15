import React, { useState } from 'react';
import './App.css';

function App() {
  const [features, setFeatures] = useState({});
  const [price, setPrice] = useState('');

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ features })
      });

      const data = await response.json();

      setPrice(data.price);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">House Price Prediction</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="area">
            Area (sqft):
          </label>
          <input
            className="form-control"
            type="number"
            name="area"
            id="area"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="bedrooms">
            Bedrooms:
          </label>
          <input
            className="form-control"
            type="number"
            name="bedrooms"
            id="bedrooms"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="bathrooms">
            Bathrooms:
          </label>
          <input
            className="form-control"
            type="number"
            name="bathrooms"
            id="bathrooms"
            onChange={handleInputChange}
          />
        </div>
        <button className="btn" type="submit">
          Predict
        </button>
      </form>
      {price && <p className="output">Predicted price: {price}</p>}
    </div>
  );
}

export default App;
