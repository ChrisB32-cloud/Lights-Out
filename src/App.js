import React, { Component } from 'react';
import Board from './Board';
import './App.css';

/** Simple app that just shows the LightsOut game. */
// !!!!!!!!! Read before starting
// as of right now we have the click handler for collecting the coords
// maybe the click handler shouldn't do that, maybe an onChange would be better

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board
          ncols={5}
          nrows={5}
          chanceLightStartsOn={Math.floor(Math.random() * 2)}
        />
      </div>
    );
  }
}

export default App;
