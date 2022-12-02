import React, { useRef } from "react";
import { BiPencil, BiTrash, BiColorFill } from "react-icons/bi";
import { TbEraser, TbHandStop } from "react-icons/tb";
import { TfiHandDrag } from "react-icons/tfi";
import "./ControlsPanel.css";

const colors = [
  "#202020",
  "grey",
  "#cbcbcb",
  "white",
  "#6f4e37",
  "#b5651d",
  "#ff87bb",
  "#df8100",
  "gold",
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
  movingBoxColor,
}) {
  const handleChangeColor = (color) => {
    console.log(color);
    setMoveBoxColor(color);
    if (!["edit", "fill"].includes(mode)) changeMode("edit");
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
    changeMode("edit");
  };

  const handleFill = () => {
    changeMode("fill");
  };

  return (
    <div className="controlsPanel">
      <div className="sectionColor">
        {colors.map((c) => (
          <div
            key={c}
            className={movingBoxColor === c ? "selected color" : "color"}
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
        <BiColorFill
          style={{ color: mode === "fill" ? "blue" : "black" }}
          onClick={handleFill}
        />
      </div>
    </div>
  );
}
