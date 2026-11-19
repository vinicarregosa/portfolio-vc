import './Navbar.css';

export function Navbar() {
  const name = 'VC';

  return (
    <header className="navbar">
      <a href="#home" className="navbar-logo">
        {name}
      </a>

      <nav className="navbar-pill">
        <a href="#home">Home</a>
        <a href="#skills">Skills</a>
        <a href="#projetos">Projetos</a>
        <a href="#contato">Contato</a>
      </nav>

      <a href="public/curriculo.pdf" download className="btn-cv">
        Download CV ↓
      </a>
    </header>
  );
}