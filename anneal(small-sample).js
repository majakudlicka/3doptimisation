function annealing({
                        initialState,
                        tempMax,
                        tempMin,
                        newState,
                        getTemp,
                        getEnergy,
                    } = {}) {

    var currentTemp = tempMax;

    var lastState = initialState;
    var lastEnergy = getEnergy(lastState);

    var bestState = lastState;
    var bestEnergy = lastEnergy;

    while (currentTemp > tempMin) {
        let currentState = newState(lastState);
        let currentEnergy = getEnergy(currentState);

        drawSquares();

        if (currentEnergy < lastEnergy) {
            lastState = currentState;
            lastEnergy = currentEnergy;
        } else {
            if (Math.random() <= Math.exp(-(currentEnergy - lastEnergy)/currentTemp)) {
                lastState = currentState;
                lastEnergy = currentEnergy;
            }
        }

        if (lastEnergy < bestEnergy) {
            bestState = lastState;
            bestEnergy = lastEnergy;
        }
        currentTemp = getTemp(currentTemp);
    }
    return bestState;
};

// the smaller the better (?)
function getEnergy(arr) {
    let mostLeft = Math.min(arr[0].x, arr[1].x, arr[2].x);
    // console.log('mostLeft');
    let mostRight = Math.max(arr[0].x, arr[1].x, arr[2].x);
    let mostTop = Math.max(arr[0].y, arr[1].y, arr[2].y);
    let mostBottom = Math.min(arr[0].y, arr[1].y, arr[2].y);

    const height = mostTop - mostBottom + 1;
    const widht = mostRight - mostLeft +1;
    return height * widht;
}
//
// function newState(x) {
//     return x + (Math.random() - 0.5);
// }
// randomNUmberBetweenZeroAndNine
const initialState = [{ x:Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)},
    { x:Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)},
    { x:Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)} ];

// const initialState = [{x:10, y:0}, {x: 0, y:10} ,{x:10, y:0}]

function newState(previousState) {
   return [{
       x: Math.round(Math.max(Math.min(previousState[0].x + (Math.random()*2 - 1), 99), 0)),
       y: Math.round(Math.max(Math.min(previousState[0].y + (Math.random()*2 - 1), 99), 0))
   }, {
       x: Math.round(Math.max(Math.min(previousState[1].x + (Math.random()*2 - 1), 99),0)),
       y: Math.round(Math.max(Math.min(previousState[1].y + (Math.random()*2 - 1), 99), 0))
   }, {
       x: Math.round(Math.max(Math.min(previousState[2].x + (Math.random()*2 - 1), 99), 0)),
       y: Math.round(Math.max(Math.min(previousState[2].y + (Math.random()*2 - 1), 99), 0))
   }]
}
//
// // linear temperature decreasing
function getTemp(prevTemperature) {
    return prevTemperature - 0.01;
}
//
var result = annealing({
    initialState: initialState,
    tempMax: 10,
    tempMin: 0.01,
    newState: newState,
    getTemp: getTemp,
    getEnergy: getEnergy,
});
//
console.log('result ', result );
console.log('energy ', getEnergy(result));
