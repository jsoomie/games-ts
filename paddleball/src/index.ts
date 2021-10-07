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

// START
global.onload = function () {
  // Ball position and speed
  let ballX = 75; // X-AXIS
  let ballY = 75; // Y-AXIS
  let ballSpeedX = 5; // X-AXIS SPEED
  let ballSpeedY = 7; // Y-AXIS SPEED

  // Paddle
  const PADDLE_WIDTH = 100;
  const PADDLE_THICKNESS = 10;
  const PADDLE_DIST_FROM_EDGE = 60;
  let paddleX = 400;

  // Game setup
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  // MOUSE EVENTS
  const updateMousePos = (e: MouseEvent): void => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    let mouseX = e.clientX - rect.left - root.scrollLeft;
    // let mouseY = e.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH / 2;
  };

  // BALL RESET
  const ballReset = () => {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  };

  // Movement logic
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
      ballReset();
      ballSpeedY *= -1;
    } else if (ballY < 0) {
      ballSpeedY *= -1;
    }

    // paddle ball physx logic
    const paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    const paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    const paddleLeftEdgeX = paddleX;
    const paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
    if (
      ballY > paddleTopEdgeY && // below the top of padd
      ballY < paddleBottomEdgeY && // above botom of paddle
      ballX > paddleLeftEdgeX && // right of the left side of paddle
      ballX < paddleRightEdgeX // left of the right side of paddle
    ) {
      ballSpeedY *= -1;
      const centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
      const ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
      ballSpeedX = ballDistFromPaddleCenterX * 0.35;
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
    circle(ballX, ballY, 10, "white");
    rectangle(
      paddleX,
      canvas.height - PADDLE_DIST_FROM_EDGE,
      PADDLE_WIDTH,
      PADDLE_THICKNESS,
      "white"
    );
  };

  // UPDATE
  const update = (): void => {
    moveAll();
    draw();
  };

  // Frames per second
  const framesPerSecond = 30;
  setInterval(update, 1000 / framesPerSecond);

  // CONTROLS
  canvas.addEventListener("mousemove", updateMousePos);
};
