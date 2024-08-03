import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'characters', label: 'Characters' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' }
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const response = await axios.post('https://bajajbackendapi-jatinkumarverma-jatinkumarvermas-projects.vercel.app/bfhl', jsonData);
      setApiResponse(response.data);
    } catch (error) {
      console.error('Invalid JSON or API error:', error);
      alert('Please enter valid JSON input');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  return (
    <div>
      <h1>REST API Frontend</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON input'
        rows='4'
        cols='50'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {apiResponse && (
        <div>
          <h2>Response</h2>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
          />
          <div>
            {selectedOptions.some(opt => opt.value === 'characters') && (
              <div>
                <h3>Characters</h3>
                <pre>{JSON.stringify(apiResponse.alphabets, null, 2)}</pre>
              </div>
            )}
            {selectedOptions.some(opt => opt.value === 'numbers') && (
              <div>
                <h3>Numbers</h3>
                <pre>{JSON.stringify(apiResponse.numbers, null, 2)}</pre>
              </div>
            )}
            {selectedOptions.some(opt => opt.value === 'highest_alphabet') && (
              <div>
                <h3>Highest Alphabet</h3>
                <pre>{JSON.stringify(apiResponse.highest_alphabet, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
