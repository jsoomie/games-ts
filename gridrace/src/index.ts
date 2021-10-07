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

// Create Rectangle
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

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// Create circle
const circle: Circle = (centerX, centerY, radius, fillColor): void => {
  context.fillStyle = fillColor;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  context.fill();
};

const rowColToArrayIndex = (col: number, trackCol: number, row: number) => {
  return col + trackCol * row;
};

// Create Tracks rows and cols
const tracks = (
  gap: number,
  width: number,
  height: number,
  fillColor: string,
  grid: number[],
  trackRows: number,
  trackCols: number
) => {
  for (let eachRow = 0; eachRow < trackRows; eachRow++) {
    for (let eachCol = 0; eachCol < grid.length; eachCol++) {
      const arrayIndex = rowColToArrayIndex(eachCol, trackCols, eachRow);

      if (grid[arrayIndex] === 1) {
        rectangle(
          width * eachCol,
          height * eachRow,
          width - gap,
          height - gap,
          fillColor
        );
      }
    }
  }
};

// START ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function () {
  // Ball position and speed
  let ballX = 75; // X-AXIS
  let ballY = 75; // Y-AXIS
  let ballSpeedX = 5; // X-AXIS SPEED
  let ballSpeedY = 7; // Y-AXIS SPEED

  // TRACKS
  const TRACK_W = 40;
  const TRACK_H = 40;
  const TRACK_COLS = 20;
  const TRACK_ROWS = 15;
  const TRACK_GAP = 2;
  // const trackGrid = new Array(TRACK_COLS * TRACK_ROWS);
  // prettier-ignore
  const trackGrid = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  //  1
                      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,  //  2
                      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,  //  3
                      1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,  //  4
                      1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,  //  5
                      1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,  //  6
                      1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,  //  7
                      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1,  //  8
                      1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1,  //  9
                      1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1,  //  10
                      1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1,  //  11
                      1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1,  //  12
                      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,  //  13
                      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,  //  14
                      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; //  15

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

  ballReset();

  // MOUSE EVENTS
  const updateMousePos = (e: MouseEvent): void => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    mouseX = e.clientX - rect.left - root.scrollLeft;
    mouseY = e.clientY - rect.top - root.scrollTop;
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
      ballSpeedY *= -1;
    } else if (ballY < 0 && ballSpeedY < 0.0) {
      ballSpeedY *= -1;
    }
  }

  function isTrackAtRowCol(col: number, row: number) {
    if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
      const trackIndexUnderCoord = rowColToArrayIndex(col, TRACK_COLS, row);
      return trackGrid[trackIndexUnderCoord] === 1;
    } else {
      return false;
    }
  }

  function ballTrackHandling() {
    // GET MOUSE POSITION OVER TRACKS
    const ballTrackCol = Math.floor(ballX / TRACK_W);
    const ballTrackRow = Math.floor(ballY / TRACK_H);

    // BALL ON COLLISION
    const trackIndexUnderBall = rowColToArrayIndex(
      ballTrackCol,
      TRACK_COLS,
      ballTrackRow
    );

    if (
      ballTrackCol >= 0 &&
      ballTrackCol < TRACK_COLS &&
      ballTrackRow >= 0 &&
      ballTrackRow < TRACK_ROWS
    ) {
      if (isTrackAtRowCol(ballTrackCol, ballTrackRow)) {
        const prevBallX = ballX - ballSpeedX;
        const prevBallY = ballY - ballSpeedY;
        const prevTrackCol = Math.floor(prevBallX / TRACK_W);
        const prevTrackRow = Math.floor(prevBallY / TRACK_H);

        let bothTestFailed = true;

        if (prevTrackCol !== ballTrackCol) {
          const adjTrackSide = rowColToArrayIndex(
            prevTrackCol,
            TRACK_COLS,
            ballTrackRow
          );

          if (isTrackAtRowCol(prevTrackCol, ballTrackRow) === false) {
            ballSpeedX *= -1;
            bothTestFailed = false;
          }
        }

        if (prevTrackRow !== ballTrackRow) {
          const adjTrackTopBot = rowColToArrayIndex(
            ballTrackCol,
            TRACK_COLS,
            prevTrackRow
          );

          if (isTrackAtRowCol(ballTrackCol, prevTrackRow) === false) {
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

  // Movement logic
  function moveAll() {
    ballMove();
    ballTrackHandling();
  }

  // DRAW
  const draw = (): void => {
    rectangle(0, 0, canvas.width, canvas.height, "black");
    tracks(
      TRACK_GAP,
      TRACK_W,
      TRACK_H,
      "blue",
      trackGrid,
      TRACK_ROWS,
      TRACK_COLS
    );
    circle(ballX, ballY, 10, "white");
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
