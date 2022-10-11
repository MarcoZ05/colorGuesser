import externData from "./data.js";

// init html elements
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");

const colorForm = document.getElementById("colorForm");
const hueInput = document.getElementById("hue");
const saturationInput = document.getElementById("saturation");
const lightnessInput = document.getElementById("lightness");

const trainForm = document.getElementById("trainForm");
const acceptButton = document.getElementById("accept");
const rejectButton = document.getElementById("reject");

const colorInputForm = document.getElementById("colorInput");
const colorInput = document.getElementById("color");

// init neural network
var net = new brain.NeuralNetwork();

// last result and dataset
let result = "";
let dataset = {};

// all training data
const trainingData = externData;

colorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  net.train(externData);

  testDataset();

  colorForm.classList.toggle("hidden");
  trainForm.classList.toggle("hidden");
});

acceptButton.addEventListener("click", (e) => {
  e.preventDefault();

  trainingData.push({ input: dataset, output: { [result]: 1 } });

  colorForm.classList.toggle("hidden");
  trainForm.classList.toggle("hidden");
});

rejectButton.addEventListener("click", (e) => {
  e.preventDefault();

  colorInputForm.classList.toggle("hidden");
  trainForm.classList.toggle("hidden");
});

colorInputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // if (!(Colors.containes(colorInput.value) && colorInput.value !== ""))
  //   return


  result = colorInput.value.trim();
  setBackgroud(dataset, result);

  trainingData.push({ input: dataset, output: { [result]: 1 } });

  colorInput.value = ""
  colorInputForm.classList.toggle("hidden");
  colorForm.classList.toggle("hidden");
});

function testDataset() {
  dataset = getDataset();

  result = brain.likely(dataset, net);
  setBackgroud(dataset, result);

  net = new brain.NeuralNetwork();
}

function setBackgroud() {
  block1.style.backgroundColor = `hsl(${dataset.hue * 360}, ${dataset.saturation * 100
    }%, ${dataset.lightness * 100}%)`;
  block2.style.backgroundColor = result;
}

function getDataset() {
  return {
    hue: hueInput.value / 360,
    saturation: saturationInput.value / 100,
    lightness: lightnessInput.value / 100,
  };
}
