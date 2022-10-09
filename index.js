import externData from "./data.js";

// create and train the neural network
const net = new brain.NeuralNetwork();
net.train(externData);

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

// last result and dataset
let result = "";
let dataset = {};

colorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  testDataset();
  toggleForm();
});

acceptButton.addEventListener("click", (e) => {
  e.preventDefault();

  net.train([{ input: dataset, output: { [result]: 1 } }]);
  toggleForm();
});

rejectButton.addEventListener("click", (e) => {
  e.preventDefault();

  result = prompt("What color is it?");
  setBackgroud(dataset, result);
  net.train([{ input: dataset, output: { [result]: 1 } }]);

  toggleForm();
});

function testDataset() {
  dataset = {
    hue: hueInput.value / 360,
    saturation: saturationInput.value / 100,
    lightness: lightnessInput.value / 100,
  };

  result = brain.likely(dataset, net);
  setBackgroud(dataset, result);
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
