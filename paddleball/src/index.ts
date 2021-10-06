global.onload = function () {
  // Game stats
  let ballX = 75;

  // Game setup
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Updates page @ 30 frames a second
  const updateAll = () => {
    ballX += 5;
    console.log(ballX);

    // Board
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Ball
    context.fillStyle = "white";
    context.beginPath();
    context.arc(ballX, 100, 10, 0, Math.PI * 2, true);
    context.fill();
  };

  const framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);
};
