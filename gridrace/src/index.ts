const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const blueCar = new Cars(carPic, "Blue Drop");
const greenCar = new Cars(otherCarPic, "Green Jade");

window.onload = (): void => {
  rectangle(0, 0, canvas.width, canvas.height, "black");
  colorText("LOADING", canvas.width / 2, canvas.height / 2, "white");
  setTimeout(() => loadImages(), 1000);
};

function loadLevel(level: number[]) {
  trackGrid = level.slice();
  blueCar.reset();
  greenCar.reset();
}

const imageLoadDone = (): void => {
  setupInput();

  loadLevel(startLevel);

  const update = (): void => {
    moveAll();
    draw();
  };

  const moveAll = (): void => {
    blueCar.move();
    greenCar.move();
  };

  const draw = (): void => {
    drawTracks();
    blueCar.draw();
    greenCar.draw();
  };

  const framesPerSecond = 30;
  setInterval(update, 1000 / framesPerSecond);
};
