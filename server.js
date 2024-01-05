const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/books/:date', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const date = req.params.date;

  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${date}&api-key=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
