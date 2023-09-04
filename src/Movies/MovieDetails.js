import { useState, useEffect } from "react";
const KEY = "a5a6266f";

export default function MovieDetails({ firstMovieId, secondMovieId }) {
  const [firstMovie, setFirstMovie] = useState({});
  const [secondMovie, setSecondMovie] = useState({});

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${firstMovieId}`
        );
        const data = await res.json();
        setFirstMovie(data);
      }
      getMovieDetails();
    },
    [firstMovieId]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${secondMovieId}`
        );
        const data = await res.json();
        setSecondMovie(data);
      }
      getMovieDetails();
    },
    [secondMovieId]
  );

  return (
    <div className="container">
      <ul className="list-group">
        <li className="list-group-item">
          <div>
            <img
              className="img-thumbnail rounded float-start"
              src={firstMovie.Poster}
              style={{ height: "300px" }}
              alt={`Poster of ${firstMovie.Title} movie`}
            />
          </div>

          <div className="movie-details">
            <p className="h4">{firstMovie.Title}</p>
            <p className="h5">{firstMovie.Genre}</p>
            <p className="h6">{firstMovie.Plot}</p>
          </div>
        </li>
        <li className="list-group-item" style={{ height: "150px" }}>
          <p className="h3">
            <span>{firstMovie.Awards}</span>
          </p>
          <p className="h3">Awards</p>
        </li>
        <li
          className={
            parseInt(firstMovie.BoxOffice?.toString().substring(1)) >
            parseInt(secondMovie.BoxOffice?.toString().substring(1))
              ? "list-group-item bg-success text-light"
              : "list-group-item bg-warning"
          }
        >
          <p className="h3">
            <span>{firstMovie.BoxOffice}</span>
          </p>
          <p className="h3">Box Office</p>
        </li>
        <li
          className={
            Number(firstMovie.Metascore) > Number(secondMovie.Metascore)
              ? "list-group-item bg-success text-light"
              : "list-group-item bg-warning"
          }
        >
          <p className="h3">
            <span>{firstMovie.Metascore}</span>
          </p>
          <p className="h3">Metascore</p>
        </li>
        <li
          className={
            Number(firstMovie.imdbRating) > Number(secondMovie.imdbRating)
              ? "list-group-item bg-success text-light"
              : "list-group-item bg-warning"
          }
        >
          <p className="h3">
            <span>{firstMovie.imdbRating}</span>
          </p>
          <p className="h3">IMDB Rating</p>
        </li>
        <li
          className={
            parseInt(firstMovie.imdbVotes) > parseInt(secondMovie.imdbVotes)
              ? "list-group-item bg-success text-light"
              : "list-group-item bg-warning"
          }
        >
          <p className="h3">
            <span>{firstMovie.imdbVotes}</span>
          </p>
          <p className="h3">IMDB Votes</p>
        </li>
      </ul>
    </div>
  );
}
