import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ornament from "../assets/ornament_two.png";
import logo from "../assets/logo.png";
import axios from "axios";

const PokeItem = () => {
  const [colorCard, setColorCard] = useState({});
  const [pokeData, setPokeData] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => setPokeData(res?.data));
  }, [id]);

  useEffect(() => {
    if (pokeData?.species !== undefined) {
      axios.get(pokeData?.species?.url).then((res) => setColorCard(res?.data));
    }
  }, [pokeData]);

  return (
    <>
      {pokeData === undefined ? (
        <>
          <img className="ornament__pokedex" src={ornament} alt="Ornament" />
          <img className="logo__pokedex" src={logo} alt="Logo" />
          <div className="error">
            <img
              src="https://forums.pokemmo.eu/uploads/monthly_2021_10/poxdex.gif.85c1135c0176f841a90a240b6c572fe3.gif"
              alt="Error"
              className="error__img"
            />
          </div>
          <Link className="btn-out" to={-1}>
            <i className="bx bx-log-out-circle"></i>
          </Link>
        </>
      ) : (
        <div className="pokeItem">
          <Link className="btn-out" to={-1}>
            <i className="bx bx-log-out-circle"></i>
          </Link>
          <img className="ornament__pokedex" src={ornament} alt="Ornament" />
          <img className="logo__pokedex" src={logo} alt="Logo" />
          <div className="pokeItem__div">
            <div className="pokemon">
              <div
                style={{ background: colorCard?.color?.name }}
                className="pokemonOrnament"
              >
                <img
                  src={
                    pokeData?.sprites?.other?.home?.front_default ||
                    pokeData?.sprites?.front_default ||
                    pokeData?.sprites?.other["official-artwork"]
                      ?.front_default ||
                    pokeData?.sprites?.versions["generation-viii"]?.icons
                      ?.front_default
                  }
                  alt="Pokemon"
                  className="pokemonOrnament__img"
                />
              </div>
              <div className="pokemonInfo">
                <span className="pokemonInfo__span">#{pokeData?.id}</span>
                <h2 className="pokemonInfo__h2">{pokeData?.name}</h2>
                <ul className="pokemonInfo__ul">
                  <li>
                    <p>Peso</p>
                    <span>{pokeData?.weight}</span>
                  </li>
                  <li>
                    <p>Altura</p>
                    <span>{pokeData?.height}</span>
                  </li>
                </ul>
                <div className="typeAndSkills">
                  <section className="typeAndSkills__section pokemon__type">
                    <h2 className="typeAndSkills__h2">Tipo</h2>
                    <div className="pokemon__type__div">
                      {pokeData?.types.map((type) => (
                        <div key={type?.type?.name}>{type?.type?.name}</div>
                      ))}
                    </div>
                  </section>
                  <section className="typeAndSkills__section pokemon__skills">
                    <h2 className="typeAndSkills__h2">Habilidades</h2>
                    <div className="pokemon__skills__div">
                      {pokeData?.abilities.map((ability) => (
                        <div key={ability?.ability?.url}>
                          {ability?.ability?.name}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <div className="pokemonStats">
                  <h2 className="pokemonStats__h2">Stats</h2>
                  <ul className="container">
                    {pokeData?.stats.map((stat) => (
                      <div className="card" key={stat?.stat?.name}>
                        <div className="box">
                          <div className="percent">
                            <svg>
                              <circle cx="70" cy="70" r="70"></circle>
                              <circle
                                cx="70"
                                cy="70"
                                r="70"
                                style={{
                                  strokeDashoffset: [
                                    `calc(440 - (440 * ${Math.floor(
                                      (stat?.base_stat * 100) / 150
                                    )}) / 100)`,
                                  ],
                                }}
                              ></circle>
                            </svg>
                            <div className="number">
                              <h2>
                                {Math.floor((stat?.base_stat * 100) / 150)}
                                <span>%</span>
                              </h2>
                            </div>
                          </div>
                          <h2 className="text">
                            {stat?.stat?.name} <br /> {stat?.base_stat} / 150
                          </h2>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="pokemonMovements">
              <h2 className="pokemonMovements__h2">Movimientos</h2>
              <ul>
                {pokeData?.moves.length === 0 ? (
                  <h2>{pokeData?.name} no tiene movimientos para mostrar</h2>
                ) : (
                  pokeData?.moves?.map((move) => (
                    <li className="pokemonMovements__li" key={move?.move?.name}>
                      {move?.move?.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokeItem;
