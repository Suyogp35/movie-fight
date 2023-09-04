import { useEffect, useState } from "react";
import NavBar from "./Movies/NavBar";
import SearchBar from "./Movies/SearchBar";
import MovieList from "./Movies/MovieList";
import MovieDetails from "./Movies/MovieDetails";

const KEY = "a5a6266f";

function App() {
  const [firstQuery, setFirstQuery] = useState("");
  const [firstMovies, setFirstMovies] = useState([]);
  const [firstSelectedId, setFirstSelectedId] = useState("");
  const [isFirstSelected, setIsFirstSelected] = useState(false);

  const [secondQuery, setSecondQuery] = useState("");
  const [secondMovies, setSecondMovies] = useState([]);
  const [secondSelectedId, setSecondSelectedId] = useState("");
  const [isSecondSelected, setIsSecondSelected] = useState(false);

  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isSecondLoading, setIsSecondLoading] = useState(false);
  const [firstError, setFirstError] = useState("");
  const [secondError, setSecondError] = useState("");

  const [placeholderOne, setPlaceholderOne] = useState("");
  const [placeholderTwo, setPlaceholderTwo] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsFirstLoading(true);
          setFirstError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${firstQuery}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setFirstMovies(data.Search);
          setFirstError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setFirstError(err.message);
          }
        } finally {
          setIsFirstLoading(false);
        }
      }

      if (firstQuery.length < 3) {
        setFirstMovies([]);
        setFirstError("");
        return;
      }

      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [firstQuery]
  );

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsSecondLoading(true);
          setSecondError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${secondQuery}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setSecondMovies(data.Search);
          setSecondError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setSecondError(err.message);
          }
        } finally {
          setIsSecondLoading(false);
        }
      }

      if (secondQuery.length < 3) {
        setSecondMovies([]);
        setSecondError("");
        return;
      }

      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [secondQuery]
  );

  // const { firstMovies, isFirstLoading, firstError } = useMovies(firstQuery);
  // const { secondMovies, secondLoading, secondError } = useMovies(secondQuery);

  function handleFirstSelectMovie(id, title) {
    setFirstSelectedId((selectedId) => (id === selectedId ? null : id));
    setIsFirstSelected((isFirstSelected) => !isFirstSelected);
    setFirstQuery("");
    setPlaceholderOne(title);
  }

  function handleSecondSelectMovie(id, title) {
    setSecondSelectedId((selectedId) => (id === selectedId ? null : id));
    setIsSecondSelected((isSecondSelected) => !isSecondSelected);
    setSecondQuery("");
    setPlaceholderTwo(title);
  }

  function handleReset() {
    setIsFirstSelected(false);
    setIsSecondSelected(false);
    setFirstSelectedId("");
    setSecondSelectedId("");
    setFirstQuery("");
    setSecondQuery("");
    setPlaceholderOne("");
    setPlaceholderTwo("");
  }

  return (
    <div className="cover-container">
      <NavBar reset={handleReset}>Movie Fight</NavBar>
      <div className="row">
        <SearchBar
          query={firstQuery}
          setQuery={setFirstQuery}
          placeholder={
            placeholderOne.length ? placeholderOne : "Search for first Movie"
          }
        />
        <SearchBar
          query={secondQuery}
          setQuery={setSecondQuery}
          placeholder={
            placeholderTwo.length ? placeholderTwo : "Search for second Movie"
          }
        />
      </div>
      <div className="row">
        <div className="col-6">
          {isFirstSelected ? (
            <MovieDetails
              firstMovieId={firstSelectedId}
              secondMovieId={secondSelectedId}
            />
          ) : (
            <>
              {isFirstLoading && <Loader />}
              {!isFirstLoading && !firstError && (
                <MovieList
                  movies={firstMovies}
                  onSelectMovie={handleFirstSelectMovie}
                />
              )}
              {firstError && <ErrorMessage message={firstError} />}
            </>
          )}
        </div>
        <div className="col-6">
          {isSecondSelected ? (
            <MovieDetails
              secondMovieId={firstSelectedId}
              firstMovieId={secondSelectedId}
            />
          ) : (
            <>
              {isSecondLoading && <Loader />}
              {!isSecondLoading && !firstError && (
                <MovieList
                  movies={secondMovies}
                  onSelectMovie={handleSecondSelectMovie}
                />
              )}
              {secondError && <ErrorMessage message={secondError} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

export default App;
