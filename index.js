const express = require('express');
const app = express();
morgan = require('morgan');

let topMovies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer'
  }
];

app.use(express.static('public'));
app.use(morgan('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});



// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
