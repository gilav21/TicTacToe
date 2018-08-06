import React, { Component } from "react";
import "./BoxStyle.css";

export default class Box extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="box" onClick={this.props.onClickCommand}>
        {this.props.content}
      </div>
    );
  }
}
