// Car position and speed
let carX = 75; // X-AXIS
let carY = 75; // Y-AXIS
let carSpeed = 0; // Car Speed
let carAngle = 0; // Car Angle
// Adjustable variables

// Car speed settings
enum Car {
  GROUNDSPEED_DECAY_MULT = 0.96,
  DRIVE_POWER = 0.4,
  REVERSE_POWER = 0.2,
  TURN_RATE = 0.07,
  BUMP_SPEED_DECREASE = -0.5,
  MIN_SPEED_TO_TURN = 0.6,
} // Non-adjustable variables

// CAR RESET
const carReset = (): void => {
  for (let eachRow = 0; eachRow < Track.ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < Track.COLS; eachCol++) {
      const arrayIndex = rowColToArrayIndex(eachCol, Track.COLS, eachRow);

      if (trackGrid[arrayIndex] === TrackGrid.PLAYER_START) {
        trackGrid[arrayIndex] = TrackGrid.ROAD;
        carAngle = -Math.PI / 2;
        carX = eachCol * Track.WIDTH + Track.WIDTH / 2;
        carY = eachRow * Track.HEIGHT + Track.HEIGHT / 2;
      }
    }
  }
};

// Car movements
const carMove = (): void => {
  carSpeed *= Car.GROUNDSPEED_DECAY_MULT;

  if (keyHeldGas) {
    carSpeed += Car.DRIVE_POWER;
  }
  if (keyHeldReverse) {
    carSpeed -= Car.REVERSE_POWER;
  }
  if (Math.abs(carSpeed) > Car.MIN_SPEED_TO_TURN) {
    if (keyHeldTurnLeft) {
      if (keyHeldGas && keyHeldTurnLeft) {
        carAngle -= Car.TURN_RATE * Car.DRIVE_POWER;
      } else carAngle -= Car.TURN_RATE;
    }
    if (keyHeldTurnRight) {
      if (keyHeldGas && keyHeldTurnRight) {
        carAngle += Car.TURN_RATE * Car.DRIVE_POWER;
      } else carAngle += Car.TURN_RATE;
    }
  }

  carX += Math.cos(carAngle) * carSpeed;
  carY += Math.sin(carAngle) * carSpeed;
};

// Car Picture
const carDraw = (): void => {
  drawBitmapCenteredWithRotation(carPic, carX, carY, carAngle);
};
