import React, { Component } from "react";

class Character extends Component {
  render() {
    // const { characters } = this.props;
const character = this.props.character;
console.log(5)
console.log((this.props.character))
return <p>{JSON.stringify(character)}</p>;
// return <p></p>;

  }
}

export default Character;
