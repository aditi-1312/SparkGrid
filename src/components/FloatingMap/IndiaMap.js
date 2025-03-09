import React, { useState } from "react";
import India from "@svg-maps/india";
import "react-svg-map/lib/index.css";
import ReactDatamaps from "react-india-states-map";

function IndiaMap({enabled = true, setStateName}) {
  const [stateCode, setStateCode] = useState("");

  function onLocationClick(event) {
    // Ensure event and event.target are valid before accessing their properties
    if (event && event.target) {
      const id = event.target.id;
      const name = event.target.getAttribute("name");
      console.log(name);
      setStateCode(id);
      setStateName(name);

      console.log("Id", id);
      console.log("Name", name);
    } else {
      console.error("Invalid event target");
    }
  }

  return (
    <div className="map-container"  style={{ pointerEvents: enabled ? "auto" : "none" }}>
      <ReactDatamaps map={India} onClick={onLocationClick} />
    </div>
  );
}

export default IndiaMap;