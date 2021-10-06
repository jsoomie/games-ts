global.onload = function () {
  // Game stats
  let ballX = 75; // X-AXIS
  let ballY = 75; // Y-AXIS
  let ballSpeedX = 5; // X-AXIS SPEED
  let ballSpeedY = 7; // Y-AXIS SPEED

  // Game setup
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Updates page @ 30 frames a second
  const updateAll = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // BALL X-AXIS BORDERS
    if (ballX > canvas.width) {
      ballSpeedX *= -1;
    } else if (ballX < 0) {
      ballSpeedX *= -1;
    }

    // BALL Y-AXIS BORDERS
    if (ballY > canvas.height) {
      ballSpeedY *= -1;
    } else if (ballY < 0) {
      ballSpeedY *= -1;
    }

    // Board
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Ball
    context.fillStyle = "white";
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
    context.fill();
  };

  const framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);
};
