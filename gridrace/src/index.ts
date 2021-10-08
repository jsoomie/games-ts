const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

window.onload = (): void => {
  // UPDATE
  const update = (): void => {
    moveAll();
    draw();
  };

  // Movement logic
  const moveAll = (): void => {
    carMove();
    carTrackHandling();
  };

  loadTrackImages();
  setupInput();
  carImageLoad();
  carReset();

  // DRAW
  const draw = (): void => {
    drawTracks();
    carDraw();
  };

  // Frames per second
  const framesPerSecond = 30;
  setInterval(update, 1000 / framesPerSecond);
};
