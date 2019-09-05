import React from "react";
import colors from "../utils/colors";

export interface PokemonCardProps {
  item: Array<Object>;
  onClick: Function;
}

const PokemonCard: React.SFC<PokemonCardProps> = ({ item, onClick }) => {
  const image = (item as any).img;
  const color = colors[(item as any).type[0].toLowerCase()];
  return (
    <div
      onClick={() => onClick((item as any).id)}
      style={{
        height: 300,
        width: 200,
        margin: 10,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          position: "relative"
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            position: "absolute",
            top: 15
          }}
        >
          <img src={image} />
        </div>
        <p
          style={{
            fontSize: 12,
            color: "grey",
            position: "absolute",
            bottom: -8,
            left: 8
          }}
        >{`#${(item as any).num}`}</p>
      </div>

      <div
        style={{
          backgroundColor: color,
          flex: 2,
          borderRadius: 10,
          paddingTop: 30
        }}
      >
        <p style={{ fontSize: 20, color: "white", textAlign: "center" }}>
          {(item as any).name}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
