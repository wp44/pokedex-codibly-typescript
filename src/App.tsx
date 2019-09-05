import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
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
    <Container>
      <SearchBar>
        <SearchBox>
          <FontAwesomeIcon
            style={{ fontSize: 18, color: "lightgrey", marginLeft: 12 }}
            icon={faSearch}
          />
          <SearchInput
            placeholder="Search for Pokemon..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              filter(e.target.value);
            }}
          />
        </SearchBox>
      </SearchBar>
      <TypesContainer>
        {pokemonTypes &&
          pokemonTypes.map((item, i) => (
            <PokemonTypeLabelProps
              filteredType={filteredType}
              label={item}
              key={i}
              onClick={type => handleTypeFilter(type)}
            />
          ))}
      </TypesContainer>
      <PokemonListContainer>
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
      </PokemonListContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #282c34;
  height: 100%;
`;

const SearchBar = styled.div`
  height: 70px;
  background-color: #1b1d23;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const SearchBox = styled.div`
  border: 0.5px solid lightgrey;
  height: 40px;
  border-radius: 20px;
  width: 100%;
  margin-right: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  color: white;
  font-size: 20px;
  margin-left: 12px;
  margin-right: 12px;
  width: 100%;
  outline: none;
  margin-bottom: 2px;
`;

const TypesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-right: 20px;
  margin-left: 20px;
`;

const PokemonListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default App;
