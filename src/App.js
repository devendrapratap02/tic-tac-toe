import React, { Component } from "react";
import logo from "logo.png";
import "App.css";

class App extends Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.indexToCoordinates = this.indexToCoordinates.bind(this);
		this.handleReset = this.handleReset.bind(this);

		this.magicSquare = [
			[8, 1, 6],
			[3, 5, 7],
			[4, 9, 2]
		];

		this.player1 = Array(8).fill(0);
		this.player2 = Array(8).fill(0);

		this.winMatch = [
			[[0, 3, 6], [0, 4], [0, 5, 7]],
			[[1, 3], [1, 4, 6, 7], [1, 5]],
			[[2, 3, 7], [2, 4], [2, 5, 6]]
		]
	}

	componentWillMount() {
		this.setState({
			cells: Array(9).fill(' ')
		});
	}

	handleClick(index) {


		let { cells } = this.state;

		const count = cells.reduce((count, cell) => { return (cell !== ' ') ? count+1 : count }, 0);
		const symbol = (count%2) ? 'O' : 'X';
		cells[index] = symbol;
		let { tx, ty } = this.indexToCoordinates(index);
		let player = (count%2) ? this.player2 : this.player1;
		const sval = this.magicSquare[tx][ty];
		let winStatus = false;

		for(let pIndex of this.winMatch[tx][ty]) {
			player[pIndex] += sval;
			if(player[pIndex] === 15) {
				winStatus = true;
				break;
			}
		}

		this.setState({
			cells, symbol, winStatus
		});
	}

	indexToCoordinates(index) {
		return { tx: parseInt(index/3, 10), ty: index%3 }
	}

	handleReset() {
		this.player1 = Array(8).fill(0);
		this.player2 = Array(8).fill(0);

		this.setState({
			cells: Array(9).fill(' '),
			winStatus: false
		});
	}

	render() {
		const cells = this.state.cells.map((cell, index) => {
			return <div className={ "cell " + (cell === ' ' ? 'cursor-enable' : 'cursor-disable') } key={`cell_${index}`} onClick={() => { if(cell !== ' ') return; this.handleClick(index); }}><span>{cell}</span></div>
		});
		return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="Tic-Tac-Toe" />
				<h1 className="App-title">Welcome to Tic-Tac-Toe</h1>
			</header>
			<div className="App-intro">
				<div className={ this.state.winStatus ? "win-row" : "win-row hide" }>
					<p>Winner is Player - {this.state.symbol}</p>
				</div>
				<div className="square-box">
					<div className="square-content">
						{cells}
					</div>
				</div>
				<div className="btn-toolbar">
					<button type="reset" className="btn" onClick={this.handleReset}>Reset</button>
				</div>
			</div>
		</div>
		);
	}
}

export default App;
