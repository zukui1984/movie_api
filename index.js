const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan("public"));

let movies = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    director: "Chris Columbus",
    genre: "Scientific",
  },
  {
    id: 2,
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
    director: "Peter Jackson",
    genres: "Action",
  },
  {
    id: 3,
    title: "Twilight",
    author: "Stephanie Meyer",
    director: "Catherine Hard",
    genre: "Horror",
  },
];

let genre = [
  {
    name: "Action",
    description:
      "A genre that related with violence and usually for adult people.",
  },

  {
    name: "Anime",
    description: "A genre that started in Japan and looks like cartoon.",
  },

  {
    name: "Comedy",
    description: "A genre of film that people will laugh about and enjoyable.",
  },
];

let directors = [
  {
    name: "Martin Scorsese",
    bio: "An American director, producer, and screenwriter.",
    birth_year: "1942-11-17",
  },
];

let users = [[]];

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

//Return all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

//Return by name
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

app.get("/movies/:title/", (req, res) => {
  let movie = movies.find((movie) => {
    console.log(movies, movies.title);
    return movie.title === req.params.title;
  });

  if (movie) res.status(201).send(movie);
  else {
    res
      .status(404)
      .send("Movie with the title" + req.params.title + " was not found.");
  }
});

//Return all genres
app.get("/genres", (req, res) => {
  res.json(genres);
});

//Return director
app.get("/directors", (req, res) => {
  res.json(director);
});

app.get("/directors/:name", (req, res) => {
  let director = directors.find((director) => {
    return director.name === req.params.name;
  });
  if (director) {
    res.json(director);
  } else {
    res.status(404).send("Director " + req.params.name + " was not found.");
  }
});

// POST

//add new movies
app.post("/movies", (req, res) => {
  let newMovie = req.body;
  if (!newMovie.title && !newMovie.author) {
    const message = "If there’s no title and if there’s no author";
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(200).send(newMovie);
  }
});

//add users
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    if (
      Users.find((user) => {
        return user.name === newUser.name;
      })
    ) {
      res.status(400).send("Username taken");
    } else {
      newUser.id = uuid.v4();
      Users.push(newUser);
      res.status(201).send(newUser);
    }
  }
});

// DELETE
app.delete("/movies/:director", (req, res) => {
  let movie = movies.find((movie) => {
    console.log(typeof movie.director, typeof req.params.director);
    return movie.director === req.params.director;
  });

  if (movie) {
    movies = movies.filter((obj) => {
      return obj.director !== req.params.director;
    });
    res
      .status(201)
      .send("Movie number " + req.params.director + " was deleted.");
  } else {
    res
      .status(404)
      .send("Movie with the ranking number " + req.params.director);
  }
});

// PUT
app.put("/movies/:id/:author", (req, res) => {
  let movie = movies.find((movie) => {
    return movie.id === req.params.id;
  });

  if (movie) {
    movie.author[req.params.author] = parseInt(req.params.author);
    res.status(201).send("Movie title" + req.params.author);
  } else {
    res
      .status(404)
      .send("Movie with the id " + req.params.id + " was not found.");
  }
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
