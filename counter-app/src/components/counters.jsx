import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const { id, onIncrement, onDelete, onDecrement } = this.props;

    return (
      <div>
        {this.props.counters.map((counter) => (
          <Counter
            key={id}
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
