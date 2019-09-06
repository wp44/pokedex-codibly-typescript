import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../utils/colors";

export interface PokemonDetailsPopupProps {
  onClickOverlay: Function;
  selectedPokemon: Object;
  pokemonShortInfo: Object;
}

const PokemonDetailsPopup: React.SFC<PokemonDetailsPopupProps> = ({
  onClickOverlay,
  selectedPokemon,
  pokemonShortInfo
}) => {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        setPokemon(json);
        console.log("info o poku", json);
      })
      .catch(e => {
        console.log("Fetching pokomons data error", e);
        // setPokemons(undefined);
      });
  }, []);
  const color = colors[(pokemonShortInfo as any).type[0].toLowerCase()];
  console.log("selectedPokemon", selectedPokemon);
  return (
    pokemon && (
      <Overlay onClick={() => onClickOverlay()}>
        <Popup color={color}>
          <ImageWrapper>
            <BigImage src={(pokemonShortInfo as any).img} />
          </ImageWrapper>
          <PokemonNameText>{(pokemonShortInfo as any).name}</PokemonNameText>
          <InfoBox>
            <StatWrapper>
              <PokemonStatLabel>Type: </PokemonStatLabel>
              <PokemonStat>{`${(pokemonShortInfo as any).type.map(item => {
                return ` ${item}`;
              })}`}</PokemonStat>
            </StatWrapper>
            <StatWrapper>
              <PokemonStatLabel>Weaknesses: </PokemonStatLabel>
              <PokemonStat>{`${(pokemonShortInfo as any).weaknesses.map(
                item => {
                  return ` ${item}`;
                }
              )}`}</PokemonStat>
            </StatWrapper>
            {pokemon.stats.map((item, i) => (
              <StatWrapper key={i}>
                <PokemonStatLabel>
                  {item.stat.name.charAt(0).toUpperCase() +
                    item.stat.name.slice(1)}
                  :{" "}
                </PokemonStatLabel>
                <PokemonStat>{item.base_stat}</PokemonStat>
              </StatWrapper>
            ))}
            <StatWrapper>
              <PokemonStatLabel>Abilities: </PokemonStatLabel>
              <PokemonStat>{`${(pokemon as any).abilities.map(item => {
                return ` ${item.ability.name}`;
              })}`}</PokemonStat>
            </StatWrapper>
            <StatWrapper>
              <PokemonStatLabel>Moves: </PokemonStatLabel>
              <PokemonStat>{`${(pokemon as any).moves.map(item => {
                return ` ${item.move.name}`;
              })}`}</PokemonStat>
            </StatWrapper>
            <StatWrapper>
              <PokemonStatLabel>Height: </PokemonStatLabel>
              <PokemonStat>{(pokemonShortInfo as any).height}</PokemonStat>
            </StatWrapper>
            <StatWrapper>
              <PokemonStatLabel>Weight: </PokemonStatLabel>
              <PokemonStat>{(pokemonShortInfo as any).weight}</PokemonStat>
            </StatWrapper>
          </InfoBox>
        </Popup>
      </Overlay>
    )
  );
};
const ImageWrapper = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  top: -120px;
`;
const BigImage = styled.img`
  height: 180px;
  width: 180px;
`;

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const Popup = styled.div`
  max-width: 800px;
  margin: 20px;
  margin-top: 120px;
  max-height: calc(100vh - 120px);
  background-color: white;
  border-radius: 20px;
  position: relative;
  background-color: ${props => props.color};
  box-shadow: 10px 10px 27px 0px rgba(0, 0, 0, 0.54);
`;

const PokemonNameText = styled.p`
  font-size: 28px;
  color: white;
  text-align: center;
  margin-top: 60px;
`;

const StatWrapper = styled.div`
  margin: 5px;
`;

const PokemonStatLabel = styled.p`
  display: inline;
  font-size: 12px;
  color: white;
`;

const PokemonStat = styled.p`
  display: inline;
  font-weight: 700;
  font-size: 12px;
  color: white;
`;
const InfoBox = styled.div`
  margin: 0 15px 15px 15px;
  overflow: auto;
  height: calc(100vh - 280px);
`;

export default PokemonDetailsPopup;
