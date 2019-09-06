import React from "react";
import colors from "../utils/colors";
import styled from "styled-components";

export interface PokemonCardProps {
  item: Array<Object>;
  onClick: Function;
}

const PokemonCard: React.SFC<PokemonCardProps> = ({ item, onClick }) => {
  const image = (item as any).img;
  const color = colors[(item as any).type[0].toLowerCase()];
  console.log("item", item);
  return (
    <CardContainer onClick={() => onClick((item as any).id)}>
      <HeaderContainer>
        <ImageContainer>
          <img src={image} />
        </ImageContainer>
        <PokemonNumberText>{`#${(item as any).num}`}</PokemonNumberText>
      </HeaderContainer>

      <PokemonDescriptionContainer color={color}>
        <PokemonNameText>{(item as any).name}</PokemonNameText>
        <StatWrapper>
          <PokemonStatLabel>Type: </PokemonStatLabel>
          <PokemonStat>{`${(item as any).type.map(item => {
            return ` ${item}`;
          })}`}</PokemonStat>
        </StatWrapper>
        <StatWrapper>
          <PokemonStatLabel>Height: </PokemonStatLabel>
          <PokemonStat>{(item as any).height}</PokemonStat>
        </StatWrapper>
        <StatWrapper>
          <PokemonStatLabel>Weight: </PokemonStatLabel>
          <PokemonStat>{(item as any).weight}</PokemonStat>
        </StatWrapper>
      </PokemonDescriptionContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  height: 260px;
  width: 200px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transition: ease-in-out 0.1s;
  :hover {
    cursor: pointer;
    transform: translateY(-5px);
  }
`;

const HeaderContainer = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
`;

const ImageContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  top: 5px;
`;

const PokemonNumberText = styled.p`
  font-size: 12px;
  color: grey;
  position: absolute;
  bottom: -8px;
  left: 8px;
`;

const StatWrapper = styled.div`
  margin: 5px;
  margin-left: 15px;
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

const PokemonDescriptionContainer = styled.div`
  background-color: ${props => props.color};
  flex: 2;
  border-radius: 10px;
  padding-top: 30px;
`;

const PokemonNameText = styled.p`
  font-size: 20px;
  color: white;
  text-align: center;
`;

export default PokemonCard;
