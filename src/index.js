import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board.jsx";

function App() {
  return <Board size={3} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
