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
        <button className={props.squareHighlight !== null ? `square ${props.squareHighlight}` : "square"} onClick={props.boxClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    getValue = (i) => {
        return this.props.squares[i]
    }

    renderSquare(i) {
        return <Square value={this.getValue(i)} boxClick={() => this.props.boxClick(i)} squareHighlight={squares2Highlight.some((element) => element === i) ? "highlight" : null} />
    }

    renderGrid() {
        let rows = []
        //outer loop greates rows
        for (let row = 0; row < 3; row++) {
            let squares = []
            // inner loop for cols
            for (let col = 0; col < 3; col++) {
                squares.push(this.renderSquare(row * 3 + col))
            }
            rows.push(<div className='board-row'>{squares}</div>)
        }
        return rows
    }

    render() {
        return (
            <div>
                <div className='status'>{this.props.status}</div>
                {this.renderGrid()}
                {/* <div className='board-row'>
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
                </div> */}
            </div>
        )
    }
}

class Game extends React.Component {
    state = {
        history: [
            {
                squares: Array(9).fill(null),
            },
        ],
        turnX: true,
        stepNumber: 0,
    }

    playerTurn() {
        return this.state.turnX ? "X" : "O"
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()

        if (squares[i] === null && !calculateWinner(current.squares)) {
            squares[i] = this.playerTurn()
        } else return

        this.setState({ history: history.concat([{ squares: squares }]), turnX: !this.state.turnX, stepNumber: history.length })
    }

    jumpTo = (step) => {
        this.setState({ stepNumber: step, turnX: step % 2 === 0 })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)
        const status = winner === null ? (current.squares.some((i) => i === null) ? "Next player: " + this.playerTurn() : "Game Over") : "Winner is: " + winner

        const moveHistory = history.map((element, move) => {
            const description = move ? "Go to move #" + move : "Start Over" //+ " (col,row)"
            return (
                <li key={move} className={move === this.state.stepNumber ? "bold" : ""}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            )
        })

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board squares={current.squares} boxClick={(i) => this.handleClick(i)} status={status} />
                </div>
                <div className='game-info'>{this.state.stepNumber > 0 ? <ol>{moveHistory}</ol> : null}</div>
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
        } else {
            squares2Highlight = []
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
