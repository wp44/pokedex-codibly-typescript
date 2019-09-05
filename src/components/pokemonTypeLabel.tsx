import React from "react";
import colors from "../utils/colors";

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
    <div
      onClick={() => onClick(label)}
      style={{
        backgroundColor: color,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 25,
        marginRight: 2,
        marginLeft: 2,
        marginTop: 10,
        opacity: active ? 1 : 0.5
      }}
    >
      <p style={{ fontSize: 16, color: "white", textAlign: "center" }}>
        {label}
      </p>
    </div>
  );
};

export default PokemonTypeLabel;
