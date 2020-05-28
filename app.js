// Import Dependencies
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const movies = [
  { id: 1, movie: 'Predestination' },
  { id: 2, movie: 'The Cloverfield Paradox' },
  { id: 3, movie: 'Upgrade' },
  { id: 4, movie: 'Venom' },
  { id: 5, movie: 'Dead Pool' },
];

// Create a movies Route
app.get('/movies', (req, res) => {
  res.status(200).send(movies);
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) res.status(404).send('The movie with given ID was not found');
  res.send(movie);
});

// Create an ADD Movie Route
app.post('/add_movie', (req, res) => {
  if (!req.body.name || req.body.name.length <= 1) {
    res.status(400).send('Please enter a movie name atleast 2 characters long');
    return;
  }

  const movie = {
    id: movies.length + 1,
    movie: req.body.name,
  };
  movies.push(movie);
  res.send(movie);
});

// Create an update movie route
app.put('/movies/:id', (req, res) => {
  // Look up the movie
  // If not exists return 404 error
  const movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found in Database');

  // Validate
  // If invalid - return 400 Bad Request
  if (!req.body.name || req.body.name.length <= 1) {
    res.status(400).send('Please enter a movie name atleast 2 characters long');
  }

  // Update movie
  movie.movie = req.body.name;
  // Now return the updated movie
  res.send(movie);
});

// Delete Movie
app.delete('/movies/:id', (req, res) => {
  // Look up the movie
  // If not exists return 404 error
  const movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found in Database');

  // DELETE
  const index = movies.indexOf(movie);
  movies.splice(index, 1); // (index, 1) 1 is used here to remove only one element

  // Return the same movie
  res.send(movie);
});

// Start Server
app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
