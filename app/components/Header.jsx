export default function Header() {
    return (
      <header className="fixed top-0 w-full bg-black bg-opacity-80 p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Raunaq</h1>
        <nav>
          <a href="/about" className="mx-4 text-gray-400 hover:text-white">About</a>
          <a href="/projects" className="mx-4 text-gray-400 hover:text-white">Projects</a>
        </nav>
      </header>
    );
  }
  