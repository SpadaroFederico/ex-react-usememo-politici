import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [politicians, setPoliticians] = useState([]);

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

  return (
    <div>
      <h1>Lista Politici</h1>
      <div className="politicians-container">
        {politicians.map((politician) => {
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
