function annealing({
                        initialState,
                        tempMax,
                        tempMin,
                        newState,
                        getTemp,
                        getEnergy,
                    } = {}) {

    console.log('initialState ', initialState);
    var currentTemp = tempMax;

    var lastState = initialState;
    var lastEnergy = getEnergy(lastState);

    var bestState = lastState;
    var bestEnergy = lastEnergy;
    console.log('bestEnerfy in the beginning ', bestEnergy);

    while (currentTemp > tempMin) {
        let currentState = newState(lastState);
        let currentEnergy = getEnergy(currentState);
        console.log({ currentState, currentEnergy});

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

    const height = mostTop - mostBottom + 10;
    const widht = mostRight - mostLeft +10 ;
    console.log('energy ',  height * widht);
    return height * widht;
}
//
// function newState(x) {
//     return x + (Math.random() - 0.5);
// }
// randomNUmberBetweenZeroAndNine
const initialState = [{ x:Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 1000)},
    { x:Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 1000)},
    { x:Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 1000)} ];

// const initialState = [{x:10, y:0}, {x: 0, y:10} ,{x:10, y:0}]

function newState(previousState) {
   return [{
       x: Math.round(Math.max(Math.min(previousState[0].x + (Math.random()*2 - 1), 999), 0)),
       y: Math.round(Math.max(Math.min(previousState[0].y + (Math.random()*2 - 1), 999), 0))
   }, {
       x: Math.round(Math.max(Math.min(previousState[1].x + (Math.random()*2 - 1), 999),0)),
       y: Math.round(Math.max(Math.min(previousState[1].y + (Math.random()*2 - 1), 999), 0))
   }, {
       x: Math.round(Math.max(Math.min(previousState[2].x + (Math.random()*2 - 1), 999), 0)),
       y: Math.round(Math.max(Math.min(previousState[2].y + (Math.random()*2 - 1), 999), 0))
   }]
}
//
// // linear temperature decreasing
function getTemp(prevTemperature) {
    return prevTemperature - 0.0001;
}
//
var result = annealing({
    initialState: initialState,
    tempMax: 10,
    tempMin: 0.0001,
    newState: newState,
    getTemp: getTemp,
    getEnergy: getEnergy,
});
//
console.log('result ', result );
console.log('energy ', getEnergy(result));
