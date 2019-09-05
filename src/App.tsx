import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PokemonCard from "./components/pokemonCard";
import PokemonTypeLabelProps from "./components/pokemonTypeLabel";
import pokemonTypes from "./utils/pokemonTypes";

export interface App {
  pokemons: any;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState(null);
  const [filteredPokemons, setFilteredPokemons] = useState(null);
  const [filteredType, setFilteredType] = useState(pokemonTypes);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        setPokemons(json.pokemon);
        setFilteredPokemons(json.pokemon);
      })
      .catch(e => {
        console.log("Fetching pokomons data error", e);
        // setPokemons(undefined);
      });
  }, []);

  useEffect(() => {
    filter(search);
  }, [filteredType]);

  const filter = searchQuery => {
    if (pokemons) {
      const filteredPokemons = pokemons.filter(pokemon => {
        if (searchQuery.length >= 2)
          return (
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            pokemon.type.some(type => filteredType.includes(type.toLowerCase()))
          );
        return pokemon.type.some(type =>
          filteredType.includes(type.toLowerCase())
        );
      });
      setFilteredPokemons(filteredPokemons);
    }
  };

  const handleTypeFilter = type => {
    if (pokemonTypes.every(item => filteredType.includes(item))) {
      setFilteredType([type]);
    } else if (filteredType.length === 1 && filteredType[0] === type) {
      setFilteredType(pokemonTypes);
    } else if (filteredType.includes(type)) {
      setFilteredType(filteredType.filter(item => item !== type));
    } else if (!filteredType.includes(type)) {
      setFilteredType(filteredType.concat(type));
    }
  };

  const handlePickPokemon = pokemonId => {
    setSelectedPokemon(pokemonId);
  };

  console.log("pokemons", pokemons);
  console.log("filteredType", filteredType);
  return (
    <div style={{ backgroundColor: "#282c34", height: "100%" }}>
      <div
        style={{
          height: 70,
          backgroundColor: "#1B1D23",
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        <div
          style={{
            borderColor: "lightgrey",
            borderWidth: 0.5,
            borderStyle: "solid",
            height: 40,
            borderRadius: 20,
            width: "100%",
            marginRight: 20,
            marginLeft: 20,
            display: "flex",
            alignItems: "center"
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: 18, color: "lightgrey", marginLeft: 12 }}
            icon={faSearch}
          />
          <input
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "white",
              fontSize: 20,
              marginLeft: 12,
              marginRight: 12,
              width: "100%",
              outline: "none",
              marginBottom: 2
            }}
            placeholder="Search for Pokemon..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              filter(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginRight: 20,
          marginLeft: 20
        }}
      >
        {pokemonTypes &&
          pokemonTypes.map((item, i) => (
            <PokemonTypeLabelProps
              filteredType={filteredType}
              label={item}
              key={i}
              onClick={type => handleTypeFilter(type)}
            />
          ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        {filteredPokemons &&
          filteredPokemons.map((item, i) => (
            <PokemonCard
              item={item}
              key={i}
              onClick={pokemonId => handlePickPokemon(pokemonId)}
            />
          ))}
        {filteredPokemons && filteredPokemons.length === 0 && (
          <p
            style={{
              color: "white",
              fontSize: 20
            }}
          >
            There is no pokemon that fulfill that cryteria
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
