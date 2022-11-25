import React, { useRef } from "react";
import { BiTrash } from "react-icons/bi";
import { TbEraser, TbHandStop } from "react-icons/tb";
import { BiPencil } from "react-icons/bi";
import { TfiHandDrag } from "react-icons/tfi";
import "./ControlsPanel.css";

const colors = [
  "#202020",
  "grey",
  "lightgrey",
  "white",
  "#6f4e37",
  "#b5651d",
  "pink",
  "orange",
  "yellow",
  "red",
  "green",
  "lightgreen",
  "blue",
  "lightblue",
  "deepskyblue",
  "purple",
];

export default function ControlsPanel({
  mode,
  changeMode,
  setMoveBoxColor,
  resetBoxes,
}) {
  const handleChangeColor = (color) => {
    console.log(color);
    setMoveBoxColor(color);
  };

  const handleEdit = () => {
    changeMode("edit");
  };

  const handleErase = () => {
    changeMode("erase");
  };

  const handleMove = () => {
    changeMode("move");
  };

  const handleReset = () => {
    resetBoxes();
  };

  return (
    <div className="controlsPanel">
      <div className="sectionColor">
        {colors.map((c) => (
          <div
            key={c}
            className="color"
            style={{ backgroundColor: c }}
            onClick={() => handleChangeColor(c)}
          ></div>
        ))}
      </div>
      <div className="sectionTools">
        <BiPencil
          style={{ color: mode === "edit" ? "blue" : "black" }}
          onClick={handleEdit}
        />
        <TbEraser
          style={{ color: mode === "erase" ? "blue" : "black" }}
          onClick={handleErase}
        />
        <TbHandStop
          style={{ color: mode === "move" ? "blue" : "black" }}
          onClick={handleMove}
        />
        <BiTrash
          style={{ color: mode === "reset" ? "blue" : "black" }}
          onClick={handleReset}
        />
      </div>
    </div>
  );
}