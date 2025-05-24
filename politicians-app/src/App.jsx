import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PoliticianCard from './politicianCard.jsx';

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  // Fetch iniziale dei dati
  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => {
        setPoliticians(data);
      })
      .catch(error => {
        console.error("Errore nel fetch:", error);
      });
  }, []);

  // Trova le posizioni uniche senza duplicati
  const uniquePositions = useMemo(() => {
    const allPositions = politicians.map(p => p.position);
    return [...new Set(allPositions)];
  }, [politicians]);

  // Filtra i politici in base al testo e alla posizione
  const filteredPoliticians = useMemo(() => {
    return politicians.filter(p => {
      const searchMatch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.biography.toLowerCase().includes(search.toLowerCase()) ||
        p.position.toLowerCase().includes(search.toLowerCase());

      const positionMatch =
        selectedPosition === '' || p.position === selectedPosition;

      return searchMatch && positionMatch;
    });
  }, [politicians, search, selectedPosition]);

  return (
    <div>
      <h1>Lista Politici</h1>

      {/* Barra di ricerca */}
      <input
        type="text"
        placeholder="Cerca un politico..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Menu a tendina per la posizione */}
      <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
        <option value="">Tutte le posizioni</option>
        {uniquePositions.map((pos, i) => (
          <option key={i} value={pos}>{pos}</option>
        ))}
      </select>

      {/* Lista di politici */}
      <div className="politicians-container">
        {filteredPoliticians.map((politician) => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>
    </div>
  );
}

export default App;
