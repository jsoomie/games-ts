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

// Car implements img tag
const carPic = document.createElement("img") as HTMLImageElement;
let carPicLoaded = false;

// START ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function () {
  // Onload to to see if pic has finished loading
  carPic.onload = function () {
    carPicLoaded = true;
  };
  carPic.src = "./player_car.png";

  // Car position and speed
  let carX = 75; // X-AXIS
  let carY = 75; // Y-AXIS
  let carSpeed = 0; // Car Speed
  let carAngle = 0; // Car Angle

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
                      1, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1,  //  10
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

  // Held down keys
  let keyHeldGas = false;
  let keyHeldReverse = false;
  let keyHeldTurnLeft = false;
  let keyHeldTurnRight = false;

  // LEFT: 37
  // UP: 38
  // RIGHT: 39
  // DOWN: 40

  enum Key {
    LEFT = "ArrowLeft",
    UP = "ArrowUp",
    RIGHT = "ArrowRight",
    DOWN = "ArrowDown",
  }

  // which key is pressed
  function keyPressed(e: KeyboardEvent) {
    // console.log(`Key Pressed: ${e.code} ${e.keyCode}`);

    // LEFT KEY
    if (e.key === Key.LEFT) {
      keyHeldTurnLeft = true;
    }

    // RIGHT KEY
    if (e.key === Key.RIGHT) {
      keyHeldTurnRight = true;
    }

    // UP KEY
    if (e.key === Key.UP) {
      keyHeldGas = true;
    }

    // DOWN KEY
    if (e.key === Key.DOWN) {
      keyHeldReverse = true;
    }
  }

  function keyReleased(e: KeyboardEvent) {
    // console.log(`Key Released: ${e.code} ${e.keyCode}`);

    // LEFT KEY
    if (e.key === Key.LEFT) {
      keyHeldTurnLeft = false;
    }

    // RIGHT KEY
    if (e.key === Key.RIGHT) {
      keyHeldTurnRight = false;
    }

    // UP KEY
    if (e.key === Key.UP) {
      keyHeldGas = false;
    }

    // DOWN KEY
    if (e.key === Key.DOWN) {
      keyHeldReverse = false;
    }
  }

  // Controls
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  // CAR RESET
  const carReset = () => {
    for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
      for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        const arrayIndex = rowColToArrayIndex(eachCol, TRACK_COLS, eachRow);

        if (trackGrid[arrayIndex] === 2) {
          trackGrid[arrayIndex] = 0;
          carAngle = -Math.PI / 2;
          carX = eachCol * TRACK_W + TRACK_W / 2;
          carY = eachRow * TRACK_H + TRACK_H / 2;
        }
      }
    }
  };

  carReset();

  // MOUSE EVENTS
  const updateMousePos = (e: MouseEvent): void => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    mouseX = e.clientX - rect.left - root.scrollLeft;
    mouseY = e.clientY - rect.top - root.scrollTop;
  };

  function carMove() {
    console.log(carSpeed);
    carSpeed *= 0.96;

    if (keyHeldGas) {
      carSpeed += 0.3;
    }
    if (keyHeldReverse) {
      carSpeed -= 0.2;
    }
    if (keyHeldTurnLeft) {
      if (keyHeldGas && keyHeldTurnLeft) carAngle -= 0.03;
      else carAngle -= 0.05;
    }
    if (keyHeldTurnRight) {
      if (keyHeldGas && keyHeldTurnRight) carAngle += 0.03;
      else carAngle += 0.05;
    }

    carX += Math.cos(carAngle) * carSpeed;
    carY += Math.sin(carAngle) * carSpeed;
  }

  // See where the tracks row at column and row
  function isTrackAtRowCol(col: number, row: number) {
    if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
      const trackIndexUnderCoord = rowColToArrayIndex(col, TRACK_COLS, row);
      return trackGrid[trackIndexUnderCoord] === 1;
    } else {
      return false;
    }
  }

  // Handles track
  function carTrackHandling() {
    // GET MOUSE POSITION OVER TRACKS
    const carTrackCol = Math.floor(carX / TRACK_W);
    const carTrackRow = Math.floor(carY / TRACK_H);

    // CAR ON COLLISION
    const trackIndexUnderCar = rowColToArrayIndex(
      carTrackCol,
      TRACK_COLS,
      carTrackRow
    );

    if (
      carTrackCol >= 0 &&
      carTrackCol < TRACK_COLS &&
      carTrackRow >= 0 &&
      carTrackRow < TRACK_ROWS
    ) {
      if (isTrackAtRowCol(carTrackCol, carTrackRow)) {
        carSpeed *= -0.5;
      }
    }
  }

  // Movement logic
  function moveAll() {
    carMove();
    carTrackHandling();
  }

  // Change bitmap to turn image
  function drawBitmapCenteredWithRotation(
    useBitmap: HTMLImageElement,
    atX: number,
    atY: number,
    withAngle: number
  ) {
    context.save();
    context.translate(atX, atY);
    context.rotate(withAngle);
    context.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
    context.restore();
  }

  // DRAW
  const draw = (): void => {
    // Canvas
    rectangle(0, 0, canvas.width, canvas.height, "black");

    // Car Picture
    if (carPicLoaded) {
      drawBitmapCenteredWithRotation(carPic, carX, carY, carAngle);
    }

    // Track
    tracks(
      TRACK_GAP,
      TRACK_W,
      TRACK_H,
      "blue",
      trackGrid,
      TRACK_ROWS,
      TRACK_COLS
    );
    // circle(carX, carY, 10, "white");
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
