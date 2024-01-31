import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ornament from "../assets/ornament_two.png";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Pagination from "./Pagination";
import axios from "axios";

const Pokedex = () => {
  const [pokeSearch, setPokeSearch] = useState("");
  const name = useSelector((state) => state.name);
  const item = useSelector((state) => state.item);
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  const getAllPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
      .then((res) => setPokemons(res?.data?.results));
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => setTypes(res?.data?.results));
    getAllPokemons();
  }, []);

  const search = () => {
    navigate(`/pokedex/${pokeSearch.toLowerCase()}`);
  };

  const filterPokemons = (e) => {
    if (e.target.value === "all-pokemons") {
      getAllPokemons();
    } else {
      axios.get(e.target.value).then((res) => setPokemons(res?.data?.pokemon));
    }
    setCurretPage(1);
  };

  //Pagination
  const [curretPage, setCurretPage] = useState(1);
  const [cardsPerPage] = useState(item);
  const indexOfLastCard = curretPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPosts = pokemons.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurretPage(pageNumber);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{
        x: window.innerWidth,
        transition: {
          duration: 0.3,
        },
      }}
      className="pokedex"
    >
      <Link className="btn-out" to={-1}>
        <i className="bx bx-log-out-circle"></i>
      </Link>
      <img className="ornament__pokedex" src={ornament} alt="Ornament" />
      <img className="logo__pokedex" src={logo} alt="Logo" />
      <div className="pokedexMenu">
        <h2 className="pokedex__h2">
          <span className="pokedex__h2__span">Bienvenido {name}</span>, aqui
          podras encontar tu pokemon preferido
        </h2>
        <div className="search">
          <form onSubmit={search} className="search__form">
            <input
              type="text"
              placeholder="Busca un pokemon"
              onChange={(e) => setPokeSearch(e.target.value)}
              value={pokeSearch}
            />
            <button className="btn">
              <span className="btn__span">Buscar</span>
              <i className="btn__i"></i>
            </button>
          </form>
          <select className="search__select" onChange={filterPokemons}>
            <option value="all-pokemons">Todos los pokemones</option>
            {types.map((type) => (
              <option key={type?.name} value={type?.url}>
                {type?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <section className="main">
        {currentPosts?.map((pokemon) => (
          <PokemonCard
            key={pokemon?.url === undefined ? pokemon?.pokemon?.url : pokemon?.url}
            link={pokemon?.url === undefined ? pokemon?.pokemon?.url : pokemon?.url}
          />
        ))}
      </section>
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={pokemons?.length}
        paginate={paginate}
        curretPage={curretPage}
      />
    </motion.div>
  );
};

export default Pokedex;
