import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';
import { Switch } from 'react-router';
import "./App.css";


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pokemons">Pokemons</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/pokemons">
            <Pokemons />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>REACT Project FrontEnd</h2>
      <p>Hier geniet ervan</p>
      <div className='favo'>

      </div>
    </div>

  );
}

function Pokemons() {
  const location = useLocation();
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => setPokemon(data.results))
      .catch(error => console.error(error));
  }, []); 

  const previousDisabled = pokemon.previous == null
  const nextDisabled = pokemon.next == null
  const getNextResult = () => {
    fetch(pokemon.next)
    .then(response => response.json())
    .then(data => setPokemon(data))
    .catch(error => console.error(error));
  }

  const getPreviousResult = () => {
    fetch(pokemon.previous)
    .then(response => response.json())
    .then(data => setPokemon(data))
    .catch(error => console.error(error));
  }
  

  return (
<>   
  <div className="knop">
    <button onClick={getPreviousResult} disabled={previousDisabled}>Vorige</button>
    <button onClick={getNextResult} disabled={nextDisabled}>Volgende</button>
  </div>
    <div>
      <h2>Pokemons</h2>
      <ul>
        {pokemon.map((pokemon, index) => (
          <li key={index}>
            <Link to={{ pathname: `/pokemons/${pokemon.name}`, state: { from: location } }}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <Switch>
        <Route path="/pokemons/:name" component={PokemonDetail} />
      </Switch>
    </div>
</>

  );
}

function PokemonDetail(props) {
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const pokemonName = props.match.params.name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error(error));
  }, [props.match.params.name]);

  if (pokemon === null) {
    return <div>Loading...</div>;
  }
  
  
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <div>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>`

      <div className='button-div'>
        <button className="button-32" onClick={handleFavoriteClick}>{isFavorite ? 'Unfavorite' : 'Favorite'}</button>
      </div>
      <div className='back'>
        <Link to={location.state?.from || '/pokemons'}>Back to Pokemons</Link>
      </div>
    </div>
  );
}

export default App;
