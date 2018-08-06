import React, { Component } from "react";
import Box from "./Box.jsx";
import "./BoardStyle.css";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [],
      turn: "X",
      finished: false
    };

    for (var i = 0; i < this.props.size; i++) {
      this.state.boxes.push(Array.apply(null, Array(this.props.size)));
    }
  }

  toggleTurn = () => {
    if (this.state.turn === "X") {
      this.setState({
        turn: "O"
      });
    } else {
      this.setState({
        turn: "X"
      });
    }
  };

  updateBox = (row, col) => {
    console.log("Clicked on " + row + "," + col);
    console.log("value is " + this.state.boxes[row][col]);
    if (this.state.boxes[row][col] == null) {
      let newBoxes = this.state.boxes.slice();
      newBoxes[row][col] = this.state.turn;
      this.setState({
        boxes: newBoxes
      });
      if (!this.checkVictory(row, col)) this.toggleTurn();
    }
  };

  checkVictory = (row, col) => {
    let currentState = this.state.boxes[row][col];
    let counter = 0,
      reversedCounter = 0;
    if (row === col || row + col === this.props.size - 1) {
      for (var i = 0; i < this.props.size; i++) {
        if (this.state.boxes[i][i] === currentState) counter++;
        if (this.state.boxes[i][this.props.size - 1 - i] === currentState)
          reversedCounter++;
      }
      if (counter === this.props.size || reversedCounter === this.props.size) {
        this.setState({
          finished: true
        });
        return true;
      }
    }
    counter = 0;
    reversedCounter = 0;
    for (var i = 0; i < this.props.size; i++) {
      if (this.state.boxes[row][i] === currentState) counter++;
      if (this.state.boxes[i][col] === currentState) reversedCounter++;
    }
    if (counter === this.props.size || reversedCounter === this.props.size) {
      this.setState({
        finished: true
      });
      return true;
    }

    return false;
  };

  printRow = (values, row) => {
    return values.map((cell, i) => (
      <Box
        key={i + row * this.props.size}
        content={cell}
        onClickCommand={this.updateBox.bind(null, row, i)}
      />
    ));
  };

  printBoard = () => {
    return this.state.boxes.map((value, i) => (
      <section className="xo-row" key={i}>
        {this.printRow(value, i)}
      </section>
    ));
  };

  resetGame = () => {
    let boxes = [];
    for (var i = 0; i < this.props.size; i++) {
      boxes.push(Array.apply(null, Array(this.props.size)));
    }

    this.setState({
      boxes,
      turn: "X",
      finished: false
    });
  };
  render() {
    let content;
    if (!this.state.finished) {
      content = (
        <div>
          <button onClick={this.resetGame}>Reset</button>
          <p>The turn is {this.state.turn}</p>
          {this.printBoard()}
        </div>
      );
    } else {
      content = (
        <div>
          <p>The Player who played as {this.state.turn} won !</p>
          <button onClick={this.resetGame}>Reset</button>
        </div>
      );
    }
    return content;
  }
}
