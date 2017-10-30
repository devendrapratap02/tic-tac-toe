import React, { Component } from "react";
import logo from "logo.png";
import "App.css";

class App extends Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.checkGameStatus = this.checkGameStatus.bind(this);
	}

	componentWillMount() {
		this.setState({
			cells: Array(9).fill(' '),
			p1: [],
			p2: []
		});
	}

	handleClick(index) {

		let { cells, p1, p2 } = this.state;
		if(cells[index] !== ' ') return;

		let count = this.state.p1.length + this.state.p2.length;
		if(count%2) {
			p1.push(index);
			cells[index] = 'X';
		} else {
			p2.push(index);
			cells[index] = 'O';
		}

		
		if(count < 5) {
			this.setState({
				cells, p1, p2
			});
			return;
		};

		this.checkGameStatus({cells, p1, p2});
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
