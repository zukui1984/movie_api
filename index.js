const express = require("express");
(bodyParser = require("body-parser")), (uuid = require("uuid"));
morgan = require("morgan");

const app = express();

app.use(bodyParser.json());

let topMovies = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
  },
  {
    id: 2,
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    id: 3,
    title: "Twilight",
    author: "Stephanie Meyer",
  },
];

app.use(express.static("public"));
app.use(morgan("public"));

// GET requests
app.get("/", (req, res) => {
  res.send("Successful GET request returning data on all movies");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// POST
app.post("/movies", (req, res) => {
  let topMovies = req.body;

  if (!topMovies.title) {
    const title = 'Missing "title" in request body';
    res.status(400).send(title);
  } else {
    topMovies.id = uuid.v4();
    movies.push(topMovies);
    res.status(201).send(topMovies);
  }
});

// Request Parameters
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movies.title === req.params.title;
    })
  );
});

// Responses & Status Codes
app.put("/movies/:id/:title/:author", (req, res) => {
  let movie = movies.find((id) => {
    return movie.id === req.params.id;
  });

  if (movie) {
    movie.title[req.params.title] = parseInt(req.params.author);
    res
      .status(201)
      .send(
        req.params.id +
          "Movie " +
          req.params.title +
          "directed by " +
          req.params.author
      );
  } else {
    res
      .status(404)
      .send("Movie with the name " + req.params.id + " was not found.");
  }
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
