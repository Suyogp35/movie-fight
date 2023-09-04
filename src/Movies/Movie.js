export default function Movie({ movie, onSelectMovie }) {
  const style = {
    height: "70px",
  };
  return (
    <a
      href="#"
      className="list-group-item list-group-item-action"
      onClick={() => onSelectMovie(movie.imdbID, movie.Title)}
    >
      <img
        className="img-thumbnail rounded float-start"
        style={style}
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h5>{movie.Title}</h5>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </a>
  );
}
