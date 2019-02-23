"use strict";

window.addEventListener("DOMContentLoaded", init);

let ctxImage = document.querySelector("#imageCanvas").getContext("2d");
let ctxMap = document.querySelector("#disMapCanvas").getContext("2d");
let imageData;
let disMapData;
let x;
let y;

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
  img.src = "cat.jpg";
  disMap.src = "map.jpg";

  const imageCanvas = document.querySelector("#imageCanvas");
  imageCanvas.addEventListener("mousemove", mouseMoved);
}

function readImageData() {
  console.log("readImageData kørt");

  const w = ctxImage.canvas.width;
  const h = ctxImage.canvas.height;

  imageData = ctxImage.getImageData(x, y, w, h);
}

function readDisMapData() {
  console.log("readDisMapData kørt");

  const w = ctxMap.canvas.width;
  const h = ctxMap.canvas.height;

  disMapData = ctxMap.getImageData(x, y, w, h);
}

function mouseMoved(event) {
  console.log("mouseMoved kørt");

  x = event.offsetX;
  y = event.offsetY;

  ctxImage.putImageData(imageData, 0, 0);
  ctxMap.putImageData(disMapData, 0, 0);
}
