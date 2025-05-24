import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PoliticianCard from './politicianCard.jsx';

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

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

  const filteredPolitic = useMemo(() => {
    return politicians.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.biography.toLowerCase().includes(search.toLowerCase()) ||
      p.position.toLowerCase().includes(search.toLowerCase())
    );
  }, [politicians, search]);
  

  return (
    <div>
      <h1>Lista Politici</h1>

      <input
        type="text"
        placeholder="Cerca un politico..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '50%' }}
      />

      <div className="politicians-container">
        {filteredPolitic.map(politician => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>
    </div>
  );
}

export default App;

