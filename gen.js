function fitnessF(arr) {
	let mostLeft = Math.min(arr[0].x, arr[1].x, arr[2].x);
	let mostRight = Math.max(arr[0].x, arr[1].x, arr[2].x);
	let mostTop = Math.max(arr[0].y, arr[1].y, arr[2].y);
	let mostBottom = Math.min(arr[0].y, arr[1].y, arr[2].y);

	const height = mostTop - mostBottom + 10;
	const widht = mostRight - mostLeft + 10;
	const res = 750*750 -height * widht;
	console.log('res is ', res);
	return res
}

function mutationF(previousState) {
	return [{
		x: Math.round(Math.max(Math.min(previousState[0].x + (Math.random() * 50 - 1), 749), 0)),
		y: Math.round(Math.max(Math.min(previousState[0].y + (Math.random() * 50 - 1), 749), 0))
	}, {
		x: Math.round(Math.max(Math.min(previousState[1].x + (Math.random() * 50 - 1), 749), 0)),
		y: Math.round(Math.max(Math.min(previousState[1].y + (Math.random() * 50 - 1), 749), 0))
	}, {
		x: Math.round(Math.max(Math.min(previousState[2].x + (Math.random() * 50 - 1), 749), 0)),
		y: Math.round(Math.max(Math.min(previousState[2].y + (Math.random() * 50 - 1), 749), 0))
	}]
}

// function crossoverF() {
//
// }

function competitionF() {

}

const initialState = [{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)},
	{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)},
	{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)}];

var config = {
	mutationFunction: mutationF,
	// crossoverFunction: crossoverF,
	fitnessFunction: fitnessF,
	// doesABeatBFunction: competitionF,
	population: [initialState],
	// populationSize: 100
};

console.log('in the right plaxce');

var GeneticAlgorithmConstructor = require('geneticalgorithm');
var geneticAlgorithm= GeneticAlgorithmConstructor( config );

console.log("Starting with:");
console.log( initialState )
for( var i = 0 ; i < 100 ; i++ ) geneticAlgorithm.evolve();
var best = geneticAlgorithm.best();
delete best.score;
console.log("Finished with:");
console.log(best);
console.log('best score ', fitnessF(best));

let preservePath = true;
async function start() {
	const c = document.getElementById("genCanvas");
	const ctx = c.getContext("2d");

	let currentState;
	function drawSquares() {
		if (!preservePath) ctx.clearRect(0,0,750, 750);
		ctx.beginPath();
		ctx.strokeStyle = "red";

		ctx.rect(currentState[0].x, currentState[0].y, 10, 10);
		ctx.fillStyle="red";
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "blue";

		ctx.rect(currentState[1].x, currentState[1].y, 10, 10);
		ctx.fillStyle="blue";
		ctx.fill();

		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "green";

		ctx.rect(currentState[2].x, currentState[2].y, 10, 10);
		ctx.fillStyle="green";
		ctx.fill();
		ctx.stroke();
	}



//
// 	const result = await annealing({
// 		initialState: initialState,
// 		tempMax: 10,
// 		tempMin: 0.001,
// 		newState: newState,
// 		getTemp: getTemp,
// 		getEnergy: getEnergy,
// 	});
// //
// 	console.log('result ', result);
// 	console.log('energy ', getEnergy(result));

}
