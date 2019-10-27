// const geneticAlgorithmConstructor = require('./genAlgoConstructor');

async function startGen() {
	let preserveGenPath = true;

	const c = document.getElementById("genCanvas");
	const ctx = c.getContext("2d");

	function fitnessF(arr) {

		// j++;
		// if (j%23 === 0) {
		// 	// console.log('in iffy');
		// 	await sleep();
		// 	drawSquares(arr);
		// }
		let mostLeft = Math.min(arr[0].x, arr[1].x, arr[2].x);
		let mostRight = Math.max(arr[0].x, arr[1].x, arr[2].x);
		let mostTop = Math.max(arr[0].y, arr[1].y, arr[2].y);
		let mostBottom = Math.min(arr[0].y, arr[1].y, arr[2].y);

		const height = mostTop - mostBottom + 10;
		const widht = mostRight - mostLeft + 10;
		const res = 750 * 750 - height * widht;
		// console.log({height, widht})
		return res
	}

	function mutationF(previousState) {
		return [{
			x: Math.round(Math.max(Math.min(previousState[0].x + (Math.random() * 2 - 1), 749), 0)),
			y: Math.round(Math.max(Math.min(previousState[0].y + (Math.random() * 2 - 1), 749), 0))
		}, {
			x: Math.round(Math.max(Math.min(previousState[1].x + (Math.random() * 2 - 1), 749), 0)),
			y: Math.round(Math.max(Math.min(previousState[1].y + (Math.random() * 2 - 1), 749), 0))
		}, {
			x: Math.round(Math.max(Math.min(previousState[2].x + (Math.random() * 2 - 1), 749), 0)),
			y: Math.round(Math.max(Math.min(previousState[2].y + (Math.random() * 2 - 1), 749), 0))
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

	console.log('Genetic algorithm starts');

	// var GeneticAlgorithmConstructor = require('./genAlgoConstructor');

	var geneticAlgorithm = geneticAlgorithmConstructor(config);


	console.log("Starting with:");
	console.log(initialState)
	for (var i = 0; i < 10000; i++) await geneticAlgorithm.evolve(null, i, ctx);
	var best = geneticAlgorithm.best();
	delete best.score;
	console.log("Finished with: ", best);
	const emptySurface = fitnessF(best);
	console.log('best score ', 750 * 750 - emptySurface);

}
