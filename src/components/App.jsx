import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import InstructionsModal from "./InstructionsModal";
import Preloader from "./Preloader";
import { fetchVerse, fetchRandomVerse } from "../utils/api";

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // evita reload

    if (!searchTerm.trim()) {
      setError("É necessário colocar um versículo!");
      return;
    }

    setError("");

    navigate(`/verse/${encodeURIComponent(searchTerm)}`, {
      state: { rawInput: searchTerm },
    });
  };

  const handleRandom = () => {
    setError("");
    navigate("/random");
  };

  return (
    <main className="home">
      <section className="home__container">
        <header>
          <h1 className="home__title">Bíblia Online</h1>
        </header>

        <section className="home__input-group">
          <form onSubmit={handleSearch}>
            <input
              className="home__input"
              type="text"
              placeholder="Ponha o versículo! Veja as INSTRUÇÕES"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button type="submit" className="home__button">
              Pesquisar
            </button>
          </form>
        </section>

        {/* ERRO */}
        {error && (
          <section className="error">
            <p className="error__message">{error}</p>
          </section>
        )}

        <section>
          <button
            className="home__button home__button--random"
            onClick={handleRandom}
          >
            Mostrar um versículo aleatório
          </button>
        </section>

        <section>
          <button
            className="home__button home__button--instructions"
            onClick={() => {
              setError("");
              setIsModalOpen(true);
            }}
          >
            INSTRUÇÕES
          </button>
        </section>

        <InstructionsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    </main>
  );
}

function Verse({ verse }) {
  return (
    <article className="verse">
      <h2 className="verse__reference">{verse.reference}</h2>
      <p className="verse__text">{verse.text}</p>
      <small className="verse__translation">{verse.translation_name}</small>
    </article>
  );
}

function VersePage() {
  const { verse } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const rawInput = location.state?.rawInput || verse;

  useEffect(() => {
    setData(null);
    setError(false);

    fetchVerse(verse)
      .then(setData)
      .catch(() => setError(true));
  }, [verse]);

  if (error)
    return (
      <main className="error">
        <p className="error__message">
          Versículo "{rawInput}" não encontrado. Tente novamente!
        </p>
      </main>
    );

  return data ? <Verse verse={data} /> : <Preloader />;
}

function RandomVersePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;

      fetchRandomVerse()
        .then(setData)
        .catch(() => setError(true));
    }
  }, []);

  if (error)
    return (
      <main className="error">
        <p className="error__message">
          Erro ao carregar versículo aleatório. Tente novamente!
        </p>
      </main>
    );

  return data ? <Verse verse={data} /> : <Preloader />;
}

/* ================= ROUTER ================= */

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verse/:verse" element={<VersePage />} />
        <Route path="/random" element={<RandomVersePage />} />
      </Routes>
    </Router>
  );
}
