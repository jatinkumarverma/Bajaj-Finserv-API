const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: 'jatin_kumar_verma_29112002',
      email: 'jatin760verma@gmail.com',
      roll_number: 'RA2111026030035',
      numbers: [],
      alphabets: [],
      highest_alphabet: []
    });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');

  const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : [];

  res.json({
    is_success: true,
    user_id: 'jatin_kumar_verma_29112002',
    email: 'jatin760verma@gmail.com',
    roll_number: 'RA2111026030035',
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet
  });
});

app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
