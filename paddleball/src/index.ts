import { rectangle, circle, bricks, rowColToArrayIndex } from "./actions";

// START
global.onload = function () {
  // Ball position and speed
  let ballX = 75; // X-AXIS
  let ballY = 75; // Y-AXIS
  let ballSpeedX = 5; // X-AXIS SPEED
  let ballSpeedY = 7; // Y-AXIS SPEED

  // BRICKS
  const BRICK_W = 80;
  const BRICK_H = 20;
  const BRICK_COLS = 10;
  const BRICK_ROWS = 14;
  const BRICK_GAP = 2;
  const brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
  let bricksLeft = 0;

  // Paddle
  const PADDLE_WIDTH = 100;
  const PADDLE_THICKNESS = 10;
  const PADDLE_DIST_FROM_EDGE = 60;
  let paddleX = 400;

  // Mouse positions
  let mouseX: number;
  let mouseY: number;

  // Game setup
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

  // BALL RESET
  const ballReset = () => {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  };

  // Reset bricks
  function brickReset() {
    bricksLeft = 0;
    let i: number;
    for (i = 0; i < 3 * BRICK_COLS; i++) {
      brickGrid[i] = false;
    }

    for (; i < BRICK_COLS * BRICK_ROWS; i++) {
      brickGrid[i] = true;
      bricksLeft++;
    }
  }

  brickReset();
  ballReset();

  // MOUSE EVENTS
  const updateMousePos = (e: MouseEvent): void => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    mouseX = e.clientX - rect.left - root.scrollLeft;
    mouseY = e.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH / 2;

    // // CHEATS
    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 4;
    // ballSpeedY = -4;
  };

  function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // BALL X-AXIS BORDERS
    if (ballX > canvas.width && ballSpeedX > 0.0) {
      ballSpeedX *= -1;
    } else if (ballX < 0 && ballSpeedX < 0.0) {
      ballSpeedX *= -1;
    }

    // BALL Y-AXIS BORDERS
    if (ballY > canvas.height) {
      ballReset();
      brickReset();
      ballSpeedY *= -1;
    } else if (ballY < 0 && ballSpeedY < 0.0) {
      ballSpeedY *= -1;
    }
  }

  function isBrickAtRowCol(col: number, row: number) {
    if (col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS) {
      const brickIndexUnderCoord = rowColToArrayIndex(col, BRICK_COLS, row);
      return brickGrid[brickIndexUnderCoord];
    } else {
      return false;
    }
  }

  function ballBrickHandling() {
    // GET MOUSE POSITION OVER BRICKS
    const ballBrickCol = Math.floor(ballX / BRICK_W);
    const ballBrickRow = Math.floor(ballY / BRICK_H);

    // BALL ON COLLISION
    const brickIndexUnderBall = rowColToArrayIndex(
      ballBrickCol,
      BRICK_COLS,
      ballBrickRow
    );

    if (
      ballBrickCol >= 0 &&
      ballBrickCol < BRICK_COLS &&
      ballBrickRow >= 0 &&
      ballBrickRow < BRICK_ROWS
    ) {
      if (isBrickAtRowCol(ballBrickCol, ballBrickRow)) {
        brickGrid[brickIndexUnderBall] = false;
        bricksLeft--;

        const prevBallX = ballX - ballSpeedX;
        const prevBallY = ballY - ballSpeedY;
        const prevBrickCol = Math.floor(prevBallX / BRICK_W);
        const prevBrickRow = Math.floor(prevBallY / BRICK_H);

        let bothTestFailed = true;

        if (prevBrickCol !== ballBrickCol) {
          const adjBrickSide = rowColToArrayIndex(
            prevBrickCol,
            BRICK_COLS,
            ballBrickRow
          );

          if (isBrickAtRowCol(prevBrickCol, ballBrickRow) === false) {
            ballSpeedX *= -1;
            bothTestFailed = false;
          }
        }

        if (prevBrickRow !== ballBrickRow) {
          const adjBrickTopBot = rowColToArrayIndex(
            ballBrickCol,
            BRICK_COLS,
            prevBrickRow
          );

          if (isBrickAtRowCol(ballBrickCol, prevBrickRow) === false) {
            ballSpeedY *= -1;
            bothTestFailed = false;
          }
        }

        if (bothTestFailed) {
          ballSpeedX *= -1;
          ballSpeedY *= -1;
        }
      }
    }
  }

  // PADDLE HANDLING
  function ballPaddleHandling() {
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

    if (bricksLeft === 0) {
      brickReset();
    }
  }

  // Movement logic
  function moveAll() {
    ballMove();
    ballBrickHandling();
    ballPaddleHandling();
  }

  // DRAW
  const draw = (): void => {
    rectangle(0, 0, canvas.width, canvas.height, "black");
    bricks(
      BRICK_GAP,
      BRICK_W,
      BRICK_H,
      "blue",
      brickGrid,
      BRICK_ROWS,
      BRICK_COLS
    );
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
