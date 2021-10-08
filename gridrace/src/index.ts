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

  // Canvas
  const clearScreen = (): void => {
    rectangle(0, 0, canvas.width, canvas.height, "black");
  };

  // DRAW
  const draw = (): void => {
    // Clear Screen
    clearScreen();
    // Draw the car
    carDraw();
    // Create Track
    tracks(
      Track.GAP,
      Track.WIDTH,
      Track.HEIGHT,
      "blue",
      trackGrid,
      Track.ROWS,
      Track.COLS
    );
  };

  setupInput();
  carImageLoad();
  carReset();

  // Frames per second
  const framesPerSecond = 30;
  setInterval(update, 1000 / framesPerSecond);
};
