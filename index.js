const express = require("express");
(bodyParser = require("body-parser")), (uuid = require("uuid"));
morgan = require("morgan");

const app = express();

app.use(bodyParser.json());

let movies = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    director: "Chris Columbus",
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
    director: "Peter Jackson",
    genre: "Scientific",
  },
  {
    id: 3,
    title: "Twilight",
    author: "Stephanie Meyer",
    director: "Catherine Hard",
    genre: "Horror",
  },
];

app.use(express.static("public"));
app.use(morgan("public"));

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// GET requests
app.get("/", (req, res) => {
  res.send("Successful GET request returning data on all movies");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

// POST
app.post("/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title && !newMovie.author) {
    const message = 'Missing "title" in request body';
    res.status(400).send(message);
  } else {
    newMovie.title = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});


// Responses & Status Codes
app.put("/movies/:id/:author", (req, res) => {
  let movie = movies.find((movie) =>
   {return movie.id === req.params.id});

  if (movie) {
    movie.author[req.params.author] = parseInt(req.params.author);
    res.status(201).send("Movie title" + req.params.author);
  } else {
    res.status(404).send("Movie with the id " + req.params.id + " was not found.");
  }
});

// Request Parameters
app.get("/movies/:title", (req, res) => {
  let movie = movies.find((movie) => {
    return movies.title === req.params.title;
  });

  
  if (movie) res.status(201).send(movie);
  else {
    res.status(404).send("Movie with the title" + req.params.title + " was not found.");
  }
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
