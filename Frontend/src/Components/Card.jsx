import React from "react";

export const Card1 = ({
  id,
  model_name,
  power_bhp,
  year,
  list_price,
  max_speed,
}) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid black ",
        overflow: "hidden",
        padding: "0.3em",
        width: "60%",
        height: "90%",
      }}
    >
      <div>
        <h5>{model_name}</h5>

        <p>{"List Price: " + list_price}</p>
        <p>{"Power :" + power_bhp}</p>
        <p>{"Speed:" + max_speed}</p>
        <p>{"Year :" + year}</p>
      </div>
    </div>
  );
};
