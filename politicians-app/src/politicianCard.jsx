import React from 'react';
import './app.css';

function PoliticianCard({politician}){
    return (
        <div className="politicCard">
        <img
            src={politician.image.startsWith('http') ? politician.image : 'https://via.placeholder.com/150'}
            alt={politician.name}
        />
        <h1>{politician.name}</h1>
        <h3>{politician.position}</h3>
        <p>{politician.biography}</p>
        </div>
    );
}

export default React.memo(PoliticianCard);