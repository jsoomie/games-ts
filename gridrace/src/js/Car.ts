// Car speed settings
enum Car {
  GROUNDSPEED_DECAY_MULT = 0.96,
  DRIVE_POWER = 0.4,
  REVERSE_POWER = 0.2,
  TURN_RATE = 0.07,
  BUMP_SPEED_DECREASE = -0.5,
  MIN_SPEED_TO_TURN = 0.6,
} // Non-adjustable variables

class Cars {
  public x: number;
  public y: number;
  public speed: number;
  public angle: number;

  constructor() {
    this.x = 75; // X-AXIS
    this.y = 75; // Y-AXIS
    this.speed = 0; // Car Speed
    this.angle = 0; // Car Angle
  }

  reset(): void {
    for (let eachRow = 0; eachRow < Track.ROWS; eachRow++) {
      for (let eachCol = 0; eachCol < Track.COLS; eachCol++) {
        const arrayIndex = rowColToArrayIndex(eachCol, Track.COLS, eachRow);

        if (trackGrid[arrayIndex] === TrackGrid.PLAYER_START) {
          trackGrid[arrayIndex] = TrackGrid.ROAD;
          this.angle = -Math.PI / 2;
          this.x = eachCol * Track.WIDTH + Track.WIDTH / 2;
          this.y = eachRow * Track.HEIGHT + Track.HEIGHT / 2;
        }
      }
    }
  }

  move(): void {
    this.speed *= Car.GROUNDSPEED_DECAY_MULT;

    if (keyHeldGas) {
      this.speed += Car.DRIVE_POWER;
    }
    if (keyHeldReverse) {
      this.speed -= Car.REVERSE_POWER;
    }
    if (Math.abs(this.speed) > Car.MIN_SPEED_TO_TURN) {
      if (keyHeldTurnLeft) {
        if (keyHeldGas && keyHeldTurnLeft) {
          this.angle -= Car.TURN_RATE * Car.DRIVE_POWER;
        } else this.angle -= Car.TURN_RATE;
      }
      if (keyHeldTurnRight) {
        if (keyHeldGas && keyHeldTurnRight) {
          this.angle += Car.TURN_RATE * Car.DRIVE_POWER;
        } else this.angle += Car.TURN_RATE;
      }
    }

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  draw(): void {
    drawBitmapCenteredWithRotation(carPic, this.x, this.y, this.angle);
  }
}

// // Car position and speed
// let carX = 75; // X-AXIS
// let carY = 75; // Y-AXIS
// let carSpeed = 0; // Car Speed
// let carAngle = 0; // Car Angle
// // Adjustable variables
