const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

window.onload = (): void => {
  rectangle(0, 0, canvas.width, canvas.height, "black");
  colorText("LOADING", canvas.width / 2, canvas.height / 2, "white");

  setTimeout(() => loadImages(), 1000);
};

const imageLoadDone = (): void => {
  setupInput();
  carReset();

  const update = (): void => {
    moveAll();
    draw();
  };

  const moveAll = (): void => {
    carMove();
    carTrackHandling();
  };

  const draw = (): void => {
    drawTracks();
    carDraw();
  };

  const framesPerSecond = 30;
  setInterval(update, 1000 / framesPerSecond);
};
