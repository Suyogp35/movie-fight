export default function NavBar({ children, reset }) {
  return (
    <nav className="navbar bg-dark bg-gradient g-5">
      <div className="container">
        <span className="navbar-brand mb-0 h1 text-light">{children}</span>
        <button type="button" className="btn btn-light" onClick={reset}>
          Reset
        </button>
      </div>
    </nav>
  );
}
