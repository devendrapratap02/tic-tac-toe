import React, { Component } from "react";
import logo from "logo.png";
import "App.css";

class App extends Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.checkGameStatus = this.checkGameStatus.bind(this);

		this.magicSquare = [
			[8, 1, 6],
			[3, 5, 7],
			[4, 9, 2]
		];

		this.player1 = [
			[], [], []
		];

		this.player2 = [
			[], [], []
		];
	}

	componentWillMount() {
		this.setState({
			cells: Array(9).fill(' ')
		});
	}

	handleClick(index) {

		let { cells } = this.state;
		if(cells[index] !== ' ') return;

		let count = cells.reduce((count, cell) => { if(cell != ' ') return count+1; else return count; }, 0)
		if(count%2) {
			p1.push(index);
			cells[index] = 'X';
			player = p1;
		} else {
			p2.push(index);
			cells[index] = 'O';
			player = p2;
		}

		
		if(count < 5) {
			this.setState({
				cells, p1, p2
			});
			return;
		};

		this.checkGameStatus({cells, p1, p2, player: player.sort()});
	}

	checkGameStatus(newState) {
		this.setState(newState);
	}

	render() {
		const cells = this.state.cells.map((cell, index) => {
			return <div className={ "cell " + (cell === ' ' ? 'cursor-enable' : 'cursor-disable') } key={`cell_${index}`} onClick={() => { this.handleClick(index); }}><span>{cell}</span></div>
		});
		return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="Tic-Tac-Toe" />
				<h1 className="App-title">Welcome to Tic-Tac-Toe</h1>
			</header>
			<div className="App-intro">
				<div className="square-box">
					<div className="square-content">
						{cells}
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default App;
