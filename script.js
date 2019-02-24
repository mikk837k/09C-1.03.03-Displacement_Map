"use strict";

window.addEventListener("DOMContentLoaded", init);

let ctxImage = document.querySelector("#imageCanvas").getContext("2d");
let ctxMap = document.querySelector("#disMapCanvas").getContext("2d");
let ctxOutput = document.querySelector("#outputCanvas").getContext("2d");
let imageData;
let disMapData;
let outputData = ctxOutput.createImageData(500, 600);
let x;
let y;
const MAX_MOVEMENT = 10;

function init() {
  console.log("init kørt");

  loadImage();
}

function loadImage() {
  console.log("loadImage kørt");

  let img = new Image();
  let disMap = new Image();

  img.addEventListener("load", () => {
    ctxImage.drawImage(img, 0, 0);
    readImageData();
  });

  disMap.addEventListener("load", () => {
    ctxMap.drawImage(disMap, 0, 0);
    readDisMapData();
  });
  img.src = "corgiSharkcropped.jpg";
  disMap.src = "displacementMap.jpg";

  //   console.log(imageData);

  const outputCanvas = document.querySelector("#outputCanvas");
  outputCanvas.addEventListener("mousemove", mouseMoved);
}

function readImageData() {
  console.log("readImageData kørt");

  const w = ctxImage.canvas.width;
  const h = ctxImage.canvas.height;

  imageData = ctxImage.getImageData(x, y, w, h);

  console.log(imageData);
}

function readDisMapData() {
  console.log("readDisMapData kørt");

  const w = ctxMap.canvas.width;
  const h = ctxMap.canvas.height;

  disMapData = ctxMap.getImageData(x, y, w, h);

  console.log(disMapData);
}

function mouseMoved(evt) {
  console.log("mouseMoved kørt");

  x = evt.offsetX;
  y = evt.offsetY;

  ctxImage.putImageData(imageData, 0, 0);
  ctxMap.putImageData(disMapData, 0, 0);

  let mouseXratio = (1 / ctxImage.canvas.width) * x * 2 - 1;
  let mouseYratio = (1 / ctxImage.canvas.height) * y * 2 - 1;

  document.querySelector("#ratioX").textContent = `Xratio: ${mouseXratio}`;
  document.querySelector("#ratioY").textContent = `Yratio: ${mouseYratio}`;

  const displacementX = mouseXratio * MAX_MOVEMENT;
  const displacementY = mouseYratio * MAX_MOVEMENT;

  copyPixelsToOutput(x, y, displacementX, displacementY);
  drawImageDataToOutputCanvas();
}

function drawImageDataToOutputCanvas() {
  console.log("drawImageDataToOutputCanvas kørt");
  ctxOutput.putImageData(outputData, 0, 0);
}

function copyPixelsToOutput(offsetX, offsetY, displacementX, displacementY) {
  console.log("copyPixelsToZoomData");

  let w = ctxOutput.canvas.width;
  const imageWidth = ctxImage.canvas.width;

  for (let y = 0; y <= ctxOutput.canvas.height; y++) {
    for (let x = 0; x <= ctxOutput.canvas.width; x++) {
      let pixelIndex = 4 * (x + y * w);

      let greyvalue = disMapData.data[pixelIndex] / 255;

      let offsetX = Math.round(x + displacementX * greyvalue);
      let offsetY = Math.round(y + displacementY * greyvalue);

      let ImageIndex = 4 * (offsetX + offsetY * imageWidth);

      outputData.data[pixelIndex] = imageData.data[ImageIndex];
      outputData.data[pixelIndex + 1] = imageData.data[ImageIndex + 1];
      outputData.data[pixelIndex + 2] = imageData.data[ImageIndex + 2];
      outputData.data[pixelIndex + 3] = imageData.data[ImageIndex + 3];
    }
  }
}
