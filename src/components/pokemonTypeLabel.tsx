import React from "react";
import colors from "../utils/colors";

export interface PokemonTypeLabelProps {
  label: String;
}

const PokemonTypeLabel: React.SFC<PokemonTypeLabelProps> = ({ label }) => {
  const color = colors[label as any];
  return (
    <div
      style={{
        backgroundColor: color,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 25,
        marginRight: 2,
        marginLeft: 2,
        marginTop: 10
      }}
    >
      <p style={{ fontSize: 16, color: "white", textAlign: "center" }}>
        {label}
      </p>
    </div>
  );
};

export default PokemonTypeLabel;
