const express = require("express");
bodyParser = require("body-parser");
uuid = require("uuid");
morgan = require("morgan");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

// To connect Mongoose
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan("public"));

let movies = [
  {
    id: 1,
    title: "Batman",
    director: "Christopher Nolan",
    genre: "Action"
  },

  {
    id: 2,
    title: "Godfather",
    director: "Martin Scorsese",
    genres: "Crime"
  },

  {
    id: 3,
    title: "Avatar",
    director: "James Cameron",
    genre: "Fantasy"
  },
];

let genre = [
  {
    Name: "Fantasy",
    Description:
      "Films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.",
  },

  {
    Name: "Crime",
    Description:
      "A film genre inspired by and analogous to the crime fiction literary genre.",
  },

  {
    Name: "Action",
    Description:
      "A film genre in which the protagonist or protagonists are thrust into a series of events that typically violence, physical feats, rescues and frantic chases.",
  },
];

let directors = [
  {
    name: "Martin Scorsese",
    bio: "An American director, producer, and screenwriter.",
    birthday: "1942-11-17",
  },

  {
    name: "James Cameron",
    bio: "An American producer for movies Titanic and Avatar",
    birthday: "1954-08-16",
  },

  {
    Name: "Christopher Nolan",
    Bio: "Famous director who directed Batman trilogy movies.",
    Birthday: "1970-07-30",
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
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET JSON - Specific files - A
app.get("/movies/:title/", (req, res) => {
Movies.findOne({ title: req.params.title})
.then((movie) => {
  res.json(movie);
})
.catch((err) => {
  console.error(err);
  res.status(500).send("Error: " + err);
});
});

//GET JSON - Specific files - B
app.get("/genre/:name/", (req, res) => {
  Movies.findOne({ title: req.params.title})
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
  });

//GET JSON - Specific files - C
app.get("/director/:name/", (req, res) => {
  Movies.findOne({ title: req.params.title})
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
  });

// Get all USERS
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// PUT - findOne and Update 
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// POST

//User to REGISTER
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// DELETE
app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
