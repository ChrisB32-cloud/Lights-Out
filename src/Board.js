import React, { Component } from 'react';
// import { rand } from './randComp';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartsOn: Math.floor(Math.random() * 2),
  };

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      board: this.createBoard(),
      hasWon: true,
    };
    // this.createBoard = this.createBoard.bind(this)
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];

    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.nrows; i++) {
      board[i] = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let chance = Math.floor(Math.random() * 2);
        // let chance = 0;

        board[i][j] = chance;
      }
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord;
    // let [y, x] = coord.split('-').map(Number);
    // let [y, x] = coord.split('-');
    // console.log(y, x);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    // console.log(this.state.board);
    let checkingVal;
    let flgHasWon = false;
    board.map((line) => {
      line.filter((row) => {
        if (row === 1 || row === true) {
          checkingVal = true;
          flgHasWon = true;
          // console.log('row', row, 'checkingVal', checkingVal);
          return;
        } else {
          checkingVal = false;
        }
      });
    });
    // console.log('checkingVal: ', checkingVal);
    // console.log('flgHasWon: ', flgHasWon);

    // TODO: flip this cell and the cells around it
    // win when every cell is turned off
    // TODO: determine is the game has been won
    // this.setState({ board, hasWon });
    this.setState({ board, hasWon: flgHasWon });
  }

  /** Render game board or winning message. */

  render() {
    // console.log(this.state.hasWon);
    // if the game is won, just show a winning msg & render nothing else
    // TODO
    // make table board
    // TODO

    // console.log(this.state.board);

    let myBoard = this.state.board.map((item, idx) => (
      <tr key={idx}>
        {item.map((items, id) => (
          <Cell
            isLit={items}
            key={[idx, id]}
            check={[idx, id]}
            flipCellsAroundMe={this.flipCellsAround}
          />
        ))}
      </tr>
    ));

    return (
      <div>
        <div className="center blue">
          <h1 className="tTitle blue">
            {this.state.hasWon === false ? 'You Won!!' : 'Lights Out'}
          </h1>
        </div>
        <table className="Board">
          <tbody> {myBoard}</tbody>
        </table>
      </div>
    );
    //   <Cell
    //   isLit={items}
    //   key={id}
    //   flipCellsAroundMe={this.flipCellsAround}
    // />
  }
}

export default Board;

// for (let i = 0; i < this.props.nrows; i++) {
//   // let preBoard = [];
//   // // for (let j = 0; j < this.props.ncols; i++) {
//   let chance = Math.floor(Math.random() * 2);
//   // if (chance === 0) {
//   //   chance = true;
//   //   board.push([chance]);
//   // }

//   // if (chance === 1) {
//   //   chance = false;
//   //   board.push([chance]);
//   // }
//   // }
//   board[i] = new Array(chance);
// }

// checking for true false values

// console.log(checkingVal);
// let finalResult;
// this.state.board.map(b => {
//   b.map(q => {
//     // console.log(q);
//     if (q === 1 || q === false) {
//       finalResult = true;
//       // break;
//       return finalResult;
//     }
//     finalResult = false;
//     // return finalResult;
//   });
//   return finalResult;
// });

// console.log(finalResult);

// let results = board.every(b => {
//   // console.log(b);
//   b.every(q => {
//     console.log(q);
//     return q === 1 || q === true;
//   });
// });
// console.log(results);
