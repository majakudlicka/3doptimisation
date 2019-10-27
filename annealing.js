let preservePath = true;
async function start() {
	const c = document.getElementById("annealingCanvas");
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


	const initialState = [{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)},
		{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)},
		{x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 750)}];


	async function annealing({
								 initialState,
								 tempMax,
								 tempMin,
								 newState,
								 getTemp,
								 getEnergy,
							 } = {}) {
		console.log('annealing begins');
		var currentTemp = tempMax;

		var lastState = initialState;
		var lastEnergy = getEnergy(lastState);

		var bestState = lastState;
		var bestEnergy = lastEnergy;
		let i = 0;

		while (currentTemp > tempMin) {

			function sleep(time) {
				return new Promise((resolve) => setTimeout(resolve, time))
			}

			currentState = newState(lastState);
			let currentEnergy = getEnergy(currentState);
			drawSquares();

			if (currentEnergy < lastEnergy) {
				lastState = currentState;
				lastEnergy = currentEnergy;
			} else {
				if (Math.random() <= Math.exp(-(currentEnergy - lastEnergy) / currentTemp)) {
					lastState = currentState;
					lastEnergy = currentEnergy;
				}
			}

			i++;
			if (i%20 === 0) {
				await sleep();
			}

			if (lastEnergy < bestEnergy) {
				bestState = lastState;
				bestEnergy = lastEnergy;
			}
			currentTemp = getTemp(currentTemp);

		}
		return bestState;
	}


	function getEnergy(arr) {
		let mostLeft = Math.min(arr[0].x, arr[1].x, arr[2].x);
		let mostRight = Math.max(arr[0].x, arr[1].x, arr[2].x);
		let mostTop = Math.max(arr[0].y, arr[1].y, arr[2].y);
		let mostBottom = Math.min(arr[0].y, arr[1].y, arr[2].y);

		const height = mostTop - mostBottom + 10;
		const widht = mostRight - mostLeft + 10;
		return height * widht;
	}


	function newState(previousState) {
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

 // linear temperature decreasing
	function getTemp(prevTemperature) {
		return prevTemperature - 0.001;
	}

	const result = await annealing({
		initialState: initialState,
		tempMax: 15,
		tempMin: 0.001,
		newState: newState,
		getTemp: getTemp,
		getEnergy: getEnergy,
	});

	console.log('result ', result);
	console.log('energy ', getEnergy(result));

}
