


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    try {
      const jsonInput = JSON.parse(input);
      axios.post('http://localhost:5000/bfhl', jsonInput)
        .then(res => {
          setResponse(res.data);
          setError('');
        })
        .catch(err => {
          setError('Server error: ' + err.message);
        });
    } catch (e) {
      setError('Invalid JSON input: ' + e.message);
    }
  };

  useEffect(() => {

    document.title = registrationNumber;
  }, []);

  const registrationNumber = 'RA2111003020114';

  const handleSelectChange = (event) => {
    setSelectedOptions([...event.target.selectedOptions].map(option => option.value));
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    let dataToShow = [];

    if (selectedOptions.includes('Numbers')) dataToShow.push({ label: 'Numbers', data: numbers });
    if (selectedOptions.includes('Alphabets')) dataToShow.push({ label: 'Alphabets', data: alphabets });
    if (selectedOptions.includes('Highest alphabet')) dataToShow.push({ label: 'Highest alphabet', data: highest_alphabet });

    return (
      <div>
        {dataToShow.map((section, index) => (
          <div key={index}>
            <h3>{section.label}</h3>
            <pre>{JSON.stringify(section.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>RA211103020114</h1>
      <textarea value={input} onChange={handleInputChange} rows="10" cols="50" />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select multiple onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest alphabet">Highest alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;





