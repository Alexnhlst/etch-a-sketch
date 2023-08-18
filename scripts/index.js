const currentColor = document.querySelector("#current-color");
const formGrid = document.querySelector("#form-grid");
const formSubmit = document.querySelector("#change-size");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
const clearButton = document.querySelector("#clear");
const pencilbutton = document.querySelector("#pencil");
const canvas = document.querySelector("#canvas");
let pencilColor = "#fff";

function generateGrid(size) {
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid");
    canvas.appendChild(gridCell);
  }
}

// Default canvas size
generateGrid(16);
console.log(canvas.childElementCount);

formGrid.addEventListener("submit", (e) => {
  e.preventDefault();

  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  generateGrid(formGrid[0].value);
  const gridCell = document.querySelectorAll(".grid");
  drawOrErase(gridCell, "#fff");
  eraserButton.addEventListener("click", (e) =>
    drawOrErase(gridCell, "#212121")
  );
  rainbowButton.addEventListener("click", (e) =>
    drawOrErase(gridCell, "rainbow")
  );
  clearButton.addEventListener("click", (e) => {
    clearCanvas(gridCell);
  });
  if (canvas.childElementCount !== 256) {
    currentColor.style.backgroundColor = "#FFF";
  }
  pencilbutton.addEventListener("click", (e) => {
    drawOrErase(gridCell, pencilColor);
  });
  pickr.on("save", (color) => {
    pencilColor = color.toRGBA().toString();
    currentColor.style.backgroundColor = pencilColor;
    drawOrErase(gridCell, pencilColor);
    pickr.hide();
  });
});

function drawOrErase(elements, color) {
  elements.forEach((element) => {
    element.addEventListener("mouseover", (e) => {
      element.style.backgroundColor = color;
    });
  });
  if (color === "rainbow") {
    elements.forEach((element) => {
      element.addEventListener("mouseover", (e) => {
        element.style.backgroundColor = generateRandomColors();
      });
    });
  }
}

function generateRandomColors() {
  return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
}

function clearCanvas(elements) {
  console.log(elements);
  elements.forEach((element) => {
    element.style.backgroundColor = "#212121";
  });
}

const gridCell = document.querySelectorAll(".grid");

drawOrErase(gridCell, pencilColor);

eraserButton.addEventListener("click", (e) => drawOrErase(gridCell, "#212121"));
rainbowButton.addEventListener("click", (e) =>
  drawOrErase(gridCell, "rainbow")
);
clearButton.addEventListener("click", (e) => {
  clearCanvas(gridCell);
});
pencilbutton.addEventListener("click", (e) => {
  drawOrErase(gridCell, pencilColor);
});

// Color picker using pickr
const pickr = Pickr.create({
  el: currentColor,
  theme: "nano",
  useAsButton: true,
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      clear: true,
      save: true,
    },
  },
}).on("save", (color) => {
  pencilColor = color.toRGBA().toString();
  currentColor.style.backgroundColor = pencilColor;
  drawOrErase(gridCell, pencilColor);
  pickr.hide();
});
