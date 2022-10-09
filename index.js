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
  toggleForm();
});

acceptButton.addEventListener("click", (e) => {
  e.preventDefault();

  trainingData.push({ input: dataset, output: { [result]: 1 } });

  toggleForm();
});

rejectButton.addEventListener("click", (e) => {
  e.preventDefault();

  result = prompt("What color is it?");
  setBackgroud(dataset, result);

  trainingData.push({ input: dataset, output: { [result]: 1 } });

  toggleForm();
});

function testDataset() {
  dataset = getDataset();

  result = brain.likely(dataset, net);
  setBackgroud(dataset, result);

  net = new brain.NeuralNetwork();
}

function toggleForm() {
  colorForm.classList.toggle("hidden");
  trainForm.classList.toggle("hidden");
}

function setBackgroud() {
  block1.style.backgroundColor = `hsl(${dataset.hue * 360}, ${
    dataset.saturation * 100
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
