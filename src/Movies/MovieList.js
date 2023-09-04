import Movie from "./Movie";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <div className="list-group">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </div>
  );
}
