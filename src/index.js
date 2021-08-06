import React from "react"
import ReactDOM from "react-dom"
import "./index.css"

var squares2Highlight = []

// class Square extends React.Component {
//     render() {
//         return (
//             <button className='square' onClick={this.props.boxClick}>
//                 {this.props.value}
//             </button>
//         )
//     }
// }

function Square(props) {
    return (
        <button className={"square " + props.squareHighlight} onClick={props.boxClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    state = {
        squares: Array(9).fill(null),
        turnX: true,
    }

    playerTurn() {
        return this.state.turnX ? "X" : "O"
    }

    handleClick = (i) => {
        const squares = this.state.squares
        // squares[i] === null ? squares[i] = this.playerTurn() : return

        if (squares[i] === null && !calculateWinner(this.state.squares)) {
            squares[i] = this.playerTurn()
        } else return

        this.setState({ squares: squares, turnX: !this.state.turnX })
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} boxClick={() => this.handleClick(i)} squareHighlight={squares2Highlight.some((element) => element === i) ? "highlight" : ""} />
    }

    render() {
        const winner = calculateWinner(this.state.squares)
        console.log(squares2Highlight)
        const status = winner === null ? "Next player: " + this.playerTurn() : "Winner is: " + winner

        return (
            <div>
                <div className='status'>{status}</div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board />
                </div>
                <div className='game-info'>
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
                {/* Reset */}
            </div>
        )
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"))

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            highlightSquares([a, b, c])
            return squares[a]
        }
    }
    return null
}

function highlightSquares(row) {
    row.forEach((square, i) => {
        squares2Highlight.push(square)
    })
    return
}
