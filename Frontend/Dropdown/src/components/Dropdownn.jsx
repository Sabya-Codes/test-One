import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [museums, setMuseums] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMuseum, setSelectedMuseum] = useState('');

  // Fetch states on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/states')
      .then(response => setStates(response.data))
      .catch(error => console.error('Error fetching states:', error));
  }, []);

  // Fetch cities when a state is selected
  
useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:3000/api/cities?state_name=${selectedState}`)
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching cities:', error));
  } else {
    setCities([]);
  }
}, [selectedState]);


  // Fetch museums when a city is selected
  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://localhost:3000/api/museums?city=${selectedCity}`)
        .then(response => setMuseums(response.data))
        .catch(error => console.error('Error fetching museums:', error));
    } else {
      setMuseums([]);
    }
  }, [selectedCity]);

  return (
    <div>
      <h1>Select a Museum</h1>
      
      {/* State Dropdown */}
      <div>
        <label>Select State: </label>
        <select 
          value={selectedState} 
          onChange={e => setSelectedState(e.target.value)}
        >
          <option value="">--Select State--</option>
          {states.map(state => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div>
        <label>Select City: </label>
        <select 
          value={selectedCity} 
          onChange={e => setSelectedCity(e.target.value)}
          disabled={!selectedState} // Disable if no state selected
        >
          <option value="">--Select City--</option>
          {cities.map(city => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Museum Dropdown */}
      <div>
        <label>Select Museum: </label>
        <select 
          value={selectedMuseum} 
          onChange={e => setSelectedMuseum(e.target.value)}
          disabled={!selectedCity} // Disable if no city selected
        >
          <option value="">--Select Museum--</option>
          {museums.map(museum => (
            <option key={museum.id} value={museum.name}>
              {museum.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <h2>Selected Museum:</h2>
        <p>{selectedMuseum || "No museum selected"}</p>
      </div>
    </div>
  );
};

export default Dropdown;
