import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // import the CSS file

function App() {
  const [input, setInput] = useState({
    floors: '',
    bedrooms: '',
    bathrooms: '',
    yr_built: ''
  });
  const [prediction, setPrediction] = useState('');

  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:5000/predict', input)
      .then(response => {
        setPrediction(response.data.prediction);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="form-container"> {/* apply the form-container class */}
      <h1>House Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Floors : </label>
          <input type="text" name="floors" onChange={handleChange} value={input.floors} />
        </div>
        <div>
          <label>Number of bedrooms:</label>
          <input type="text" name="bedrooms" onChange={handleChange} value={input.bedrooms} />
        </div>
        <div>
          <label>Number of bathrooms:</label>
          <input type="text" name="bathrooms" onChange={handleChange} value={input.bathrooms} />
        </div>
        <div>
          <label>Years to Build:</label>
          <input type="text" name="yr_built" onChange={handleChange} value={input.yr_built} />
        </div>
        <button type="submit">Predict</button>
      </form>
      {prediction && <p className="prediction-text">The predicted price is {prediction}.</p>} {/* apply the prediction-text class */}
    </div>
  );
}

export default App;
