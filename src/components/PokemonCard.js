import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PokemonCard = ({ link }) => {
  const [dataPokemon, setDataPokemon] = useState({});
  const [colorCard, setColorCard] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(link).then((res) => setDataPokemon(res.data));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [link]);

  useEffect(() => {
    if (dataPokemon?.species !== undefined) {
      axios.get(dataPokemon?.species?.url).then((res) => setColorCard(res?.data));
    }
  }, [dataPokemon]);

  const redirection = () => {
    navigate(`/pokedex/${dataPokemon?.id}`);
  };

  const loader = () => {
    return (
      <div className="card__spinner">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    );
  };

  if (loading) {
    return loader();
  } else {
    return (
      <button className="card" onClick={redirection}>
        <div
          className="cardContainer"
          style={{
            background: colorCard?.color?.name,
            borderColor: colorCard?.color?.name,
          }}
        >
          <img
            src={
              dataPokemon?.sprites?.other?.home?.front_default ||
              dataPokemon?.sprites?.front_default ||
              dataPokemon?.sprites?.other["official-artwork"]?.front_default ||
              dataPokemon?.sprites?.versions["generation-viii"]?.icons
                .front_default
            }
            alt="Pokemon"
            className="cardContainer__img"
          />
          <div className="pokeInfo">
            <h2 className="pokeInfo__h2">{dataPokemon?.name}</h2>
            <ul className="types">
              {dataPokemon?.types?.map((type) => (
                <li className="types__li" key={type?.type?.name}>
                  {type?.type?.name}
                </li>
              ))}
            </ul>
            <span className="pokeInfo__span">Tipo</span>
            <ul className="pokeDetail">
              <li>
                <h3 className="pokeDetail__h3">HP</h3>
                <p className="pokeDetail__p">
                  {dataPokemon.stats?.[0].base_stat}
                </p>
              </li>
              <li>
                <h3 className="pokeDetail__h3">ATAQUE</h3>
                <p className="pokeDetail__p">
                  {dataPokemon.stats?.[1].base_stat}
                </p>
              </li>
              <li>
                <h3 className="pokeDetail__h3">DEFENSA</h3>
                <p className="pokeDetail__p">
                  {dataPokemon.stats?.[2].base_stat}
                </p>
              </li>
              <li>
                <h3 className="pokeDetail__h3">VELOCIDAD</h3>
                <p className="pokeDetail__p">
                  {dataPokemon.stats?.[5].base_stat}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </button>
    );
  }
};

export default PokemonCard;
