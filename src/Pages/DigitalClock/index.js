import React, { useState } from "react";

function DigitalClock() {
  let timmer = new Date().toLocaleTimeString();
  const [time, setTime] = useState(timmer);

  setInterval(() => {
    let timmer = new Date().toLocaleTimeString();
    setTime(timmer);
  }, 1000);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5px",
        fontSize: "20px",
        backgroundImage:
          " linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)",
        color: "white",
      }}
    >
      <h4>{time}</h4>
    </div>
  );
}

export default DigitalClock;
