async function startGen() {
	console.log('Genetic algorithm starts');
	const c = document.getElementById("genCanvas");
	const ctx = c.getContext("2d");

	function fitnessF(arr) {
		let mostLeft = Math.min(arr[0].x, arr[1].x, arr[2].x);
		let mostRight = Math.max(arr[0].x, arr[1].x, arr[2].x);
		let mostTop = Math.max(arr[0].y, arr[1].y, arr[2].y);
		let mostBottom = Math.min(arr[0].y, arr[1].y, arr[2].y);

		const height = mostTop - mostBottom + 10;
		const width = mostRight - mostLeft + 10;
		return 750 * 750 - height * width;
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

	function crossoverF(phenotypeA, phenotypeB) {
		let index = Math.floor(Math.random() * 3);
		let phenotypeX;
		let phenotypeY;

		if (index === 0) {
			phenotypeX = [phenotypeB[0], phenotypeA[1], phenotypeA[2]];
			phenotypeY = [phenotypeA[0], phenotypeB[1], phenotypeB[2]];
		} else if (index === 1) {
			phenotypeX = [phenotypeA[0], phenotypeB[1], phenotypeA[2]];
			phenotypeY = [phenotypeB[0], phenotypeA[1], phenotypeB[2]];
		} else {
			phenotypeX = [phenotypeA[0], phenotypeA[1], phenotypeB[2]];
			phenotypeY = [phenotypeB[0], phenotypeB[1], phenotypeA[2]];
		}
		return [ phenotypeX , phenotypeY ];
	}

	// Useful / necessary in situations where local minimas / maximas exist
	// Used to introduce diversity
	function competitionF() {}

	const initialState = [{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)},
		{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)},
		{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)}];

	var config = {
		mutationFunction: mutationF,
		crossoverFunction: crossoverF,
		fitnessFunction: fitnessF,
		population: [initialState],
		populationSize: 10
	};

	const geneticAlgorithm = geneticAlgorithmConstructor(config);

	console.log("Starting with: ", initialState);
	for (var i = 0; i < 10000; i++) await geneticAlgorithm.evolve(null, i, ctx);
	var best = geneticAlgorithm.best();
	delete best.score;
	console.log("Finished with: ", best);
	const emptySurface = fitnessF(best);
	console.log('best score ', 750 * 750 - emptySurface);

}
