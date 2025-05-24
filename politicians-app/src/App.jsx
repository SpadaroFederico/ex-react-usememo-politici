import React, { useState, useEffect, useMemo} from 'react';
import './App.css';

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
    return politicians.filter(p => (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.biography.toLowerCase().includes(search.toLowerCase()) ||
      p.position.toLowerCase().includes(search.toLowerCase)
    ));
  } , [politicians, search]);

  return (
    <div>
      <h1>Lista Politici</h1>
      <div className="politicians-container">
        <input
          type="text"
          placeholder="Cerca un politico..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredPolitic.map((politician) => {
          console.log(politician.image); // 👀 Per debug

          return (
            <div className="politicCard" key={politician.id}>
              
              <img
                src={politician.image.startsWith('http') ? politician.image : 'https://via.placeholder.com/150'}
                alt={politician.name}
              />
              <h1>{politician.name}</h1>
              <h3>{politician.position}</h3>
              <p>{politician.biography}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
