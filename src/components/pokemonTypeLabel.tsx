import React from "react";
import colors from "../utils/colors";
import styled from "styled-components";

export interface PokemonTypeLabelProps {
  label: String;
  onClick: Function;
  filteredType: Array<String>;
}

const PokemonTypeLabel: React.SFC<PokemonTypeLabelProps> = ({
  label,
  onClick,
  filteredType
}) => {
  const color = colors[label as any];
  const active = filteredType.includes(label);
  return (
    <Label onClick={() => onClick(label)} active={active} color={color}>
      <Text>{label}</Text>
    </Label>
  );
};

const Label = styled.div`
  background-color: ${props => props.color};
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 25px;
  margin-right: 2px;
  margin-left: 2px;
  margin-top: 10px;
  opacity: ${props => (props.active ? 1 : 0.5)};
  transition: ease-in-out 0.1s;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Text = styled.p`
  font-size: 16px;
  color: white;
  text-align: center;
`;

export default PokemonTypeLabel;
