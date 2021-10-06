type Circle = (
  centerX: number,
  centerY: number,
  radius: number,
  fillColor: string
) => void;

type Rectangle = (
  topLeftX: number,
  topLeftY: number,
  boxWidth: number,
  boxHeight: number,
  fillColor: string
) => void;

global.onload = function () {
  // Game stats
  let ballX = 75; // X-AXIS
  let ballY = 75; // Y-AXIS
  let ballSpeedX = 5; // X-AXIS SPEED
  let ballSpeedY = 7; // Y-AXIS SPEED

  // Game setup
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  function moveAll() {
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
  }

  // Create rectangles
  const rectangle: Rectangle = (
    topLeftX,
    topLeftY,
    boxWidth,
    boxHeight,
    fillColor
  ): void => {
    context.fillStyle = fillColor;
    context.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  };

  // Create circle
  const circle: Circle = (centerX, centerY, radius, fillColor): void => {
    context.fillStyle = fillColor;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    context.fill();
  };

  // DRAW
  const draw = (): void => {
    rectangle(0, 0, canvas.width, canvas.height, "black");
    circle(ballX, ballY, 10, "red");
  };

  // UPDATE
  const update = (): void => {
    moveAll();
    draw();
  };

  // Frames per second
  const framesPerSecond = 30;
  setInterval(update, 1000 / framesPerSecond);
};
