import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // import the CSS file

function App() {
  const [input, setInput] = useState({
    bedrooms: '',
    bathrooms: '',
    sqft_living:'',
    sqft_lot:'',
    floors:'',
    condition:'',
    sqft_basement:'',
    yr_built: '',
    yr_renovated:'',
    lat:'',
    long:''
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
          <label>Number of bedrooms:</label>
          <input type="text" name="bedrooms" onChange={handleChange} value={input.bedrooms} />
        </div>
        <div>
          <label>Number of bathrooms:</label>
          <input type="text" name="bathrooms" onChange={handleChange} value={input.bathrooms} />
        </div>
        <div>
          <label>Enter Area of Living Room(squareft.) : </label>
          <input type="text" name="sqft_living" onChange={handleChange} value={input.sqft_living} />
        </div>
        <div>
          <label>Enter the plot size(squareft) : </label>
          <input type="text" name="sqft_lot" onChange={handleChange} value={input.sqft_lot} />
        </div>
        <div>
          <label>Floors : </label>
          <input type="text" name="floors" onChange={handleChange} value={input.floors} />
        </div>
        <div>
          <label>Enter the condition of House(1-5) : </label>
          <input type="text" name="condition" onChange={handleChange} value={input.condition} />
        </div>
        <div>
          <label>Enter the Basement Area (squareft) : </label>
          <input type="text" name="sqft_basement" onChange={handleChange} value={input.sqft_basement} />
        </div>  
        <div>
          <label>Build Year:</label>
          <input type="text" name="yr_built" onChange={handleChange} value={input.yr_built} />
        </div>
        <div>
          <label>Enter year of Renovation : </label>
          <input type="text" name="yr_renovated" onChange={handleChange} value={input.yr_renovated} />
        </div>
        <div>
          <label>Enter Latitude : </label>
          <input type="text" name="lat" onChange={handleChange} value={input.lat} />
        </div>
        <div>
          <label>Enter Longitude : </label>
          <input type="text" name="long" onChange={handleChange} value={input.long} />
        </div>

        <button type="submit">Predict</button>
      </form>
      {prediction && (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div className="prediction-text">The predicted price is: ${prediction}</div>
  </div>
)}{/* apply the prediction-text class */}
    </div>
  );
}

export default App;
